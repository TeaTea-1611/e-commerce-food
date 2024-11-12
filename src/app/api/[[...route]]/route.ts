import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import foodItems from "@/features/food-items/server/route";
import categories from "@/features/categories/server/route";
import billboards from "@/features/billboards/server/route";
import checkout from "@/features/checkout/server/route";
import settings from "@/features/settings/server/route";
import orders from "@/features/orders/server/route";
import dashboard from "@/features/dashboard/server/route";

const app = new Hono().basePath("/api");

export const route = app
  .route("/auth", auth)
  .route("/food-items", foodItems)
  .route("/categories", categories)
  .route("/billboards", billboards)
  .route("/checkout", checkout)
  .route("/settings", settings)
  .route("/dashboard", dashboard)
  .route("/orders", orders);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof route;
