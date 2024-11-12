import { zValidator } from "@hono/zod-validator";
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";
import { profileSettingsSchema } from "../schema";

const app = new Hono().post(
  "/profile",
  sessionMiddleware,
  zValidator("json", profileSettingsSchema),
  async (c) => {
    const user = c.get("user");

    const data = c.req.valid("json");
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });

    return c.json({
      success: true,
      message: "Cập nhật thành công.",
      user: updatedUser,
    });
  },
);

export default app;
