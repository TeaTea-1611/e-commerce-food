import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { orderSchema } from "../schema";

const app = new Hono()
  .get("/list-check", sessionMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json(null);
    }
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        orderItems: {
          include: {
            foodItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return c.json(orders);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            address: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            foodItem: true,
          },
        },
      },
    });

    return c.json(order);
  })
  .put(
    "/:id",
    sessionMiddleware,
    zValidator("json", orderSchema),

    async (c) => {
      const user = c.get("user");
      if (user.role !== "ADMIN") {
        return c.json(
          { success: false, message: "Không có quyền truy cập." },
          403,
        );
      }

      const id = c.req.param("id");
      const { status, deliveryStatus } = c.req.valid("json");

      const order = await prisma.order.update({
        where: { id },
        data: {
          status,
          deliveryStatus,
          deliveredAt: deliveryStatus === "DELIVERED" ? new Date() : null,
        },
      });

      return c.json({ success: true, order });
    },
  )
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    if (user.role !== "ADMIN") {
      return c.json(null);
    }
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            address: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json(orders);
  });

export default app;
