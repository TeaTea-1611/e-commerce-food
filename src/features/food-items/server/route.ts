import { zValidator } from "@hono/zod-validator";
import { foodItemSchema } from "../schema";
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";

const app = new Hono()
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", foodItemSchema),
    async (c) => {
      const user = c.get("user");
      if (user.role !== "ADMIN") {
        return c.json(
          {
            success: false,
            message: "Không có quyền truy cập.",
            foodItem: null,
          },
          403,
        );
      }

      const data = c.req.valid("json");
      const foodItem = await prisma.foodItem.create({
        data,
      });

      return c.json({
        success: true,
        message: "Đã thêm món mới.",
        foodItem,
      });
    },
  )
  .get("/pagination", async (c) => {
    const { name, categoryId, page, take } = c.req.query();

    const total = await prisma.foodItem.count({
      where: {
        ...(name ? { name: { contains: `${name}` } } : {}),
        ...(categoryId ? { categoryId } : {}),
      },
    });

    const foodItems = await prisma.foodItem.findMany({
      where: {
        ...(name ? { name: { contains: `${name}` } } : {}),
        ...(categoryId ? { categoryId } : {}),
      },
      include: { category: true },
      orderBy: {
        sold: "desc",
      },
      take: parseInt(take),
      skip: parseInt(page) * parseInt(take),
    });

    return c.json({
      total,
      foodItems,
    });
  })
  .get("/featured", async (c) => {
    const foodItems = await prisma.foodItem.findMany({
      include: { category: true },
      orderBy: {
        sold: "desc",
      },
      take: 10,
    });
    return c.json(foodItems);
  })
  .get("/related/:categoryId", async (c) => {
    const categoryId = c.req.param("categoryId");

    const foodItems = await prisma.foodItem.findMany({
      where: { categoryId },
      include: { category: true },
      orderBy: { sold: "desc" },
      take: 5,
    });
    return c.json(foodItems);
  })
  .get("/", async (c) => {
    const foodItems = await prisma.foodItem.findMany({
      include: { category: true },
    });
    return c.json(foodItems);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const foodItem = await prisma.foodItem.findUnique({
      where: { id },
      include: { category: true },
    });
    return c.json(foodItem);
  })
  .put(
    "/:id",
    sessionMiddleware,
    zValidator("json", foodItemSchema),
    async (c) => {
      const user = c.get("user");
      if (user.role !== "ADMIN") {
        return c.json(
          {
            success: false,
            message: "Không có quyền truy cập.",
            foodItem: null,
          },
          403,
        );
      }

      const id = c.req.param("id");
      const data = c.req.valid("json");

      const foodItem = await prisma.foodItem.update({
        where: { id },
        data,
      });

      return c.json({
        success: true,
        message: "Cập nhật thành công.",
        foodItem,
      });
    },
  )
  .delete("/:id", sessionMiddleware, async (c) => {
    const user = c.get("user");
    if (user.role !== "ADMIN") {
      return c.json(
        {
          success: false,
          message: "Không có quyền truy cập.",
        },
        403,
      );
    }

    const id = c.req.param("id");
    await prisma.foodItem.delete({ where: { id } });

    return c.json({ success: true, message: "Xóa thành công." });
  });

export default app;
