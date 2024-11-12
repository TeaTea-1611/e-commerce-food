import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../schema";
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";

const app = new Hono()
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", categorySchema),
    async (c) => {
      const user = c.get("user");
      if (user.role !== "ADMIN") {
        return c.json(
          { success: false, message: "Không có quyền truy cập." },
          403,
        );
      }

      const data = c.req.valid("json");
      const category = await prisma.category.create({
        data,
      });

      return c.json({ success: true, category });
    },
  )
  .get("/", async (c) => {
    const categories = await prisma.category.findMany();
    return c.json(categories);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return c.json(category);
  })
  .put(
    "/:id",
    sessionMiddleware,
    zValidator("json", categorySchema),
    async (c) => {
      const user = c.get("user");
      if (user.role !== "ADMIN") {
        return c.json(
          { success: false, message: "Không có quyền truy cập." },
          403,
        );
      }

      const id = c.req.param("id");
      const data = c.req.valid("json");

      const category = await prisma.category.update({
        where: { id },
        data,
      });

      return c.json({ success: true, category });
    },
  )
  .delete("/:id", sessionMiddleware, async (c) => {
    const user = c.get("user");
    if (user.role !== "ADMIN") {
      return c.json(
        { success: false, message: "Không có quyền truy cập." },
        403,
      );
    }

    const id = c.req.param("id");
    await prisma.category.delete({ where: { id } });

    return c.json({ success: true, message: "Xóa danh mục thành công." });
  });

export default app;
