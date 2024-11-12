import { z } from "zod";

// Định nghĩa các enum cho trạng thái giao hàng và thanh toán
const DeliveryStatusEnum = z.enum([
  "PENDING_DELIVERY",
  "IN_TRANSIT",
  "DELIVERED",
]);
const PaymentStatusEnum = z.enum(["PENDING_PAYMENT", "PAID", "FAILED"]);
const OrderStatusEnum = z.enum(["PENDING", "COMPLETED", "CANCELLED"]);

export const orderSchema = z.object({
  status: OrderStatusEnum,
  deliveryStatus: DeliveryStatusEnum,
});

export type OrderSchemaType = z.infer<typeof orderSchema>;
