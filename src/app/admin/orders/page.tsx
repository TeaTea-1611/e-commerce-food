"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/features/orders/api/use-orders";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    return (
      <>
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

  if (!data) {
    return <div>Không có đơn hàng nào</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Đơn hàng</h2>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
