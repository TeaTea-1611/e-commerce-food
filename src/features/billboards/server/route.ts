import { zValidator } from "@hono/zod-validator";
import { billboardSchema } from "../schema";
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";

const app = new Hono()
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", billboardSchema),
    async (c) => {
      const user = c.get("user");
      if (user.role !== "ADMIN") {
        return c.json(
          { success: false, message: "Không có quyền truy cập." },
          403,
        );
      }
      const data = c.req.valid("json");
      const billboard = await prisma.billboard.create({
        data,
      });

      return c.json({ success: true, billboard });
    },
  )
  .get("/", async (c) => {
    const categories = await prisma.billboard.findMany();
    return c.json(categories);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const billboard = await prisma.billboard.findUnique({
      where: { id },
    });

    return c.json(billboard);
  })
  .put(
    "/:id",
    sessionMiddleware,
    zValidator("json", billboardSchema),
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

      const billboard = await prisma.billboard.update({
        where: { id },
        data,
      });

      return c.json({ success: true, billboard });
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
    await prisma.billboard.delete({ where: { id } });

    return c.json({ success: true, message: "Xóa thành công." });
  });

export default app;
