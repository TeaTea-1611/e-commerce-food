"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/categories/api/use-categories";
import { CreateFoodItemForm } from "@/features/food-items/components/create-food-item-form";
import { toast } from "sonner";

export default function Page() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <>
        <h2 className="text-lg font-medium">Thêm sản phẩm mới</h2>
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

  if (!categories) {
    return null;
  }

  return (
    <>
      <h2 className="text-lg font-medium">Thêm sản phẩm mới</h2>
      <CreateFoodItemForm categories={categories} />
    </>
  );
}
