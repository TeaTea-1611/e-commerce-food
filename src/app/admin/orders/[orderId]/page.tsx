"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder } from "@/features/orders/api/use-order";
import { UpdateStatusOrderForm } from "@/features/orders/components/update-status-order-form";
import { PaymentStatus } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";

const PAYMENT_STATUS = {
  [PaymentStatus.PENDING_PAYMENT]: "Đang chờ",
  [PaymentStatus.PAID]: "Đã thanh toán",
  [PaymentStatus.FAILED]: "Thất bại",
};

export default function Page() {
  const params = useParams();
  const { data, isLoading } = useOrder(
    typeof params.orderId === "string" ? params.orderId : "",
  );

  if (isLoading) {
    return (
      <>
        <h2 className="text-lg font-medium">Chi tiết đơn hàng</h2>
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </>
    );
  }

  if (!data?.id) {
    return <div>Đơn hàng không tồn tại</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chi tiết đơn hàng</h2>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span>Thanh toán:</span>
          <Badge>{PAYMENT_STATUS[data.paymentStatus]}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span>Thời gian đặt:</span>
          <Badge>{format(new Date(data.createdAt), "dd/MM/yyyy")}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span>Tổng tiền:</span>
          <span>{data.totalAmount.toLocaleString("vi-vn")} vnd</span>
        </div>
        <div>Sản phẩm</div>
        <div className="grid grid-cols-5 gap-2">
          {data.orderItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-2">
                <div className="relative h-32 rounded-md bg-muted">
                  <img
                    src={item.foodItem.imageUrl}
                    alt={item.foodItem.name}
                    className="object-cover size-full"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col text-left p-2">
                <div className="flex w-full">
                  <Link
                    href={`/food-items/${item.foodItem.id}`}
                    className="text-left font-semibold text-sm"
                  >
                    {item.foodItem.name}
                  </Link>
                </div>
                <div className="flex w-full">
                  <span className="font-medium text-sm text-primary">
                    {item.foodItem.price}đ
                  </span>
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <div className="font-normal flex items-center justify-between text-xs leading-none text-muted-foreground">
                    <p>Số lượng đặt {item.quantity}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Cập nhật trạng thái đơn hàng</h3>
        <UpdateStatusOrderForm orderId={data.id} initialData={data} />
      </div>
    </>
  );
}
