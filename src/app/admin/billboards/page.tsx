"use client";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBillboards } from "@/features/billboards/api/use-billboards";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { data, isLoading } = useBillboards();

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
        <h2 className="text-lg font-semibold">Biển QC</h2>
        <Link
          href={"/admin/billboards/create"}
          className={cn(buttonVariants())}
        >
          Thêm biển QC mới
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
