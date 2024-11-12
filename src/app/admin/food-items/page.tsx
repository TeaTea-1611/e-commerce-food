"use client";

import { useFoodItems } from "@/features/food-items/api/use-food-items";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function DemoPage() {
  const { data, isLoading } = useFoodItems();

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
    return <div>Không có sản phẩm nào</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sản phẩm</h2>
        <Link
          href={"/admin/food-items/create"}
          className={cn(buttonVariants())}
        >
          Thêm sản phẩm mới
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
