import { sessionMiddleware } from "@/features/auth/middlewares/session-middleware";
import prisma from "@/lib/prisma";
import { Hono } from "hono";

const app = new Hono().get("/", sessionMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "ADMIN") {
    return c.json(null);
  }
  const paidOrders = await prisma.order.findMany({
    where: { paymentStatus: "PAID" },
    include: {
      orderItems: {
        include: {
          foodItem: true,
        },
      },
    },
  });

  const salesCount = await prisma.order.count({
    where: { paymentStatus: "PAID" },
  });

  const foodItemCount = await prisma.foodItem.count();

  const totalRevenue = paidOrders.reduce((pre, order) => {
    const orderTotal = order.orderItems.reduce((orderPre, item) => {
      return orderPre + item.foodItem.price * item.quantity;
    }, 0);
    return pre + orderTotal;
  }, 0);

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();

    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.foodItem.price * item.quantity;
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphRevenue: { name: string; total: number }[] = [
    { name: "Tháng 1", total: 0 },
    { name: "Tháng 2", total: 0 },
    { name: "Tháng 3", total: 0 },
    { name: "Tháng 4", total: 0 },
    { name: "Tháng 5", total: 0 },
    { name: "Tháng 6", total: 0 },
    { name: "Tháng 7", total: 0 },
    { name: "Tháng 8", total: 0 },
    { name: "Tháng 9", total: 0 },
    { name: "Tháng 10", total: 0 },
    { name: "Tháng 11", total: 0 },
    { name: "Tháng 12", total: 0 },
  ];

  for (const [month, revenue] of Object.entries(monthlyRevenue)) {
    graphRevenue[parseInt(month)].total = revenue;
  }

  return c.json({
    totalRevenue,
    salesCount,
    foodItemCount,
    graphRevenue,
  });
});

export default app;
