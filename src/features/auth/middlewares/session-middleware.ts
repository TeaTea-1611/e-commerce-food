import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { SESSION_COOKIE } from "../constants";
import prisma from "@/lib/prisma";
import { Session, User } from "@prisma/client";

type JWTPayload = {
  sub: string;
  exp?: number;
};

type Env = {
  Variables: {
    user: Omit<User, "password">;
    session: Session;
  };
};

class AuthError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  try {
    const token = getCookie(c, SESSION_COOKIE);
    if (!token) throw new AuthError("Missing authentication token");

    const decodedPayload = (await verify(
      token,
      process.env.SESSION_SECRET!,
    )) as JWTPayload;

    if (!decodedPayload.sub) {
      throw new AuthError("Invalid token payload");
    }

    const session = await prisma.session.findUnique({
      where: {
        userId_token: {
          userId: decodedPayload.sub,
          token,
        },
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      throw new AuthError("Invalid session or user");
    }

    const { password, ...userWithoutPassword } = session.user;

    c.set("user", userWithoutPassword);
    c.set("session", session);

    await next();
  } catch (error) {
    if (error instanceof AuthError) {
      return c.json({ error: error.message }, 401);
    }

    return c.json({ error: "Authentication failed" }, 401);
  }
});
