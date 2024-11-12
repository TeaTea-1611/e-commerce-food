"use client";

import { useFoodItems } from "@/features/food-items/api/use-food-items";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useCategories } from "@/features/categories/api/use-categories";

export default function DemoPage() {
  const { data, isLoading } = useCategories();

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
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Loại sản phẩm</h2>
        <Link
          href={"/admin/categories/create"}
          className={cn(buttonVariants())}
        >
          Thêm loại sản phẩm mới
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
