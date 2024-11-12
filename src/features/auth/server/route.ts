import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import argon2 from "argon2";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { SESSION_COOKIE, SESSION_EXPIRY } from "../constants";
import { sessionMiddleware } from "../middlewares/session-middleware";
import { loginSchema, registerSchema } from "../schema";

const app = new Hono()
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password, phone, address } = c.req.valid("json");

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ success: false, message: "Email đã được sử dụng." });
    }

    const hashPassword = await argon2.hash(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        phone,
        address,
      },
    });

    return c.json({
      success: true,
      message: "Đăng ký thành công",
    });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      return c.json({
        success: false,
        message: "Email hoặc mật khẩu không khớp.",
        user: null,
      });
    }

    const expires = Math.floor(Date.now() / 1000) + SESSION_EXPIRY;

    const token = await sign(
      { sub: user.id, exp: expires },
      process.env.SESSION_SECRET!,
    );

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expires,
      },
    });

    setCookie(c, SESSION_COOKIE, token, {
      maxAge: SESSION_EXPIRY,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    const { password: _, ...userWithoutPassword } = user;

    return c.json({
      success: true,
      message: "Đăng nhập thành công.",
      user: userWithoutPassword,
    });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const session = c.get("session");
    deleteCookie(c, SESSION_COOKIE);
    await prisma.session.delete({ where: { id: session.id } });

    return c.json({ success: true });
  })
  .get("/me", sessionMiddleware, async (c) => {
    const user = c.get("user");
    return c.json(user);
  });

export default app;
