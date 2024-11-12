import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";
import prisma from "@/lib/prisma";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Hono } from "hono";
import moment from "moment";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";

// APP INFO
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

// Schema for order validation
const checkoutSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
});

const app = new Hono()
  .post("/zalopay/callback", async (c) => {
    let result: any = {};
    try {
      const body = await c.req.json();
      let dataStr = body.data;
      let reqMac = body.mac;

      const mac = CryptoJS.HmacSHA256(
        dataStr as string,
        config.key2,
      ).toString();

      if (reqMac !== mac) {
        result.return_code = -1;
        result.return_message = "mac not equal";
      } else {
        let dataJson = JSON.parse(dataStr as string);
        const appTransId = dataJson["app_trans_id"];

        await prisma.$transaction(async (prisma) => {
          const order = await prisma.order.update({
            where: { appTransId },
            data: { paymentStatus: "PAID", paidAt: new Date() },
          });

          const orderItems = await prisma.orderItem.findMany({
            where: { orderId: order.id },
            include: { foodItem: true },
          });

          for (const item of orderItems) {
            await prisma.foodItem.update({
              where: { id: item.foodItemId },
              data: {
                sold: { increment: item.quantity },
                quantity: { decrement: item.quantity },
              },
            });
          }
        });

        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex: any) {
      result.return_code = 0;
      result.return_message = ex.message;
    }

    return c.json({ result });
  })
  .post(
    "/zalopay",
    sessionMiddleware,
    zValidator("json", checkoutSchema),
    async (c) => {
      const user = c.get("user");
      const { items } = c.req.valid("json");

      try {
        const transID = Math.floor(Math.random() * 1000000);
        const embed_data = {
          redirecturl: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
        };

        const orderTrans = await prisma.$transaction(async (prisma) => {
          const orderItems = await Promise.all(
            items.map(async (item) => {
              const foodItem = await prisma.foodItem.findUnique({
                where: { id: item.id },
              });

              if (!foodItem) {
                throw new Error(`FoodItem with ID ${item.id} not found`);
              }

              if (item.quantity > foodItem.quantity) {
                throw new Error(
                  `Số lượng yêu cầu cho ${foodItem.name} vượt quá lượng hàng sẵn có.`,
                );
              }

              return {
                foodItemId: foodItem.id,
                quantity: item.quantity,
                price: foodItem.price,
              };
            }),
          );

          const totalAmount = orderItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0,
          );

          const appTransId = `${moment().format("YYMMDD")}_${transID}`;
          const newOrder = await prisma.order.create({
            data: {
              userId: user.id,
              appTransId,
              totalAmount,
            },
          });

          await prisma.orderItem.createMany({
            data: orderItems.map((item) => ({
              orderId: newOrder.id,
              foodItemId: item.foodItemId,
              quantity: item.quantity,
            })),
          });

          return newOrder;
        });

        const data =
          config.app_id +
          "|" +
          orderTrans.appTransId +
          "|" +
          user.id +
          "|" +
          orderTrans.totalAmount +
          "|" +
          orderTrans.createdAt.getTime() +
          "|" +
          JSON.stringify(embed_data) +
          "|" +
          JSON.stringify(items);
        const mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const zalopayResponse = await axios.post(config.endpoint, null, {
          params: {
            app_id: config.app_id,
            app_trans_id: orderTrans.appTransId,
            app_user: user.id,
            app_time: orderTrans.createdAt.getTime(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: orderTrans.totalAmount,
            description: `Payment for order #${orderTrans.appTransId}`,
            bank_code: "",
            mac,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/zalopay/callback`,
          },
        });

        return c.json(zalopayResponse.data);
      } catch (error: any) {
        return c.json({ error: error.message }, 500);
      }
    },
  );

export default app;
