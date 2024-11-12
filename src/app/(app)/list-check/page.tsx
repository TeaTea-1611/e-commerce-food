"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useListCheck } from "@/features/orders/api/use-list-check";
import { PaymentStatus } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

const STATUS: {
  [key: string]: string;
} = {
  PENDING: "Đang chờ",
  COMPLETED: "Đã hoàn thành",
  CANCELLED: "Đã hủy",
};

const DELIVERY_STATUS: {
  [key: string]: string;
} = {
  PENDING_DELIVERY: "Đang chờ",
  IN_TRANSIT: "Đang chuyển tiếp",
  DELIVERED: "Đã giao hàng",
};

const PAYMENT_STATUS = {
  [PaymentStatus.PENDING_PAYMENT]: "Đang chờ",
  [PaymentStatus.PAID]: "Đã thanh toán",
  [PaymentStatus.FAILED]: "Thất bại",
};

export default function Page() {
  const { data } = useListCheck();

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Lịch sử đặt hàng</h2>
      {data.map((item) => (
        <div key={item.id} className="p-2 w-full rounded-lg border space-y-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span>ID đơn hàng:</span>
              <Badge>{item.id}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>Trạng thái đơn hàng:</span>
              <Badge>{STATUS[item.status]}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>Trạng thái giao dịch:</span>
              <Badge>{PAYMENT_STATUS[item.paymentStatus]}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>Trạng thái giao hàng:</span>
              <Badge>{DELIVERY_STATUS[item.deliveryStatus]}</Badge>
            </div>
            <span className="">
              Ngày đặt: {format(new Date(item.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {item.orderItems.map((orderItem) => (
              <Card key={orderItem.id}>
                <CardContent className="p-2">
                  <div className="relative h-32 rounded-md bg-muted">
                    <img
                      src={orderItem.foodItem.imageUrl}
                      alt={orderItem.foodItem.name}
                      className="object-cover size-full"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col text-left p-2">
                  <div className="flex w-full">
                    <Link
                      href={`/food-items/${orderItem.foodItem.id}`}
                      className="text-left font-semibold text-sm"
                    >
                      {orderItem.foodItem.name}
                    </Link>
                  </div>
                  <div className="flex w-full">
                    <span className="font-medium text-sm text-primary">
                      {orderItem.foodItem.price}đ
                    </span>
                  </div>
                  <div className="flex flex-col w-full space-y-2">
                    <div className="font-normal flex items-center justify-between text-xs leading-none text-muted-foreground">
                      <p>Số lượng đặt {orderItem.quantity}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div>{/* <Button variant={"destructive"}>Hủy đơn</Button> */}</div>
        </div>
      ))}
    </div>
  );
}
