"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/categories/api/use-categories";
import { useFoodItem } from "@/features/food-items/api/use-food-item";
import { UpdateFoodItemForm } from "@/features/food-items/components/update-food-item-form";
import { useParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteFoodItem } from "@/features/food-items/api/use-delete-food-item";

export default function Page() {
  const params = useParams();
  const { data: foodItem, isLoading: foodItemLoading } = useFoodItem(
    typeof params.foodItemId === "string" ? params.foodItemId : "",
  );

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { mutate: deleteFoodItem, isPending: deleteFoodItemLoading } =
    useDeleteFoodItem(
      typeof params.foodItemId === "string" ? params.foodItemId : "",
    );

  if (categoriesLoading || foodItemLoading) {
    return (
      <>
        <h2 className="text-lg font-medium">Chi tiết sản phẩm</h2>
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

  if (!categories?.length || !foodItem?.id) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chi tiết sản phẩm</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Xóa sản phẩm</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bạn có hoàn toàn chắc chắn không?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn
                xóa dữ liệu khỏi máy chủ.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteFoodItem();
                }}
                disabled={deleteFoodItemLoading}
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <UpdateFoodItemForm
        foodItemId={foodItem.id}
        initialData={foodItem}
        categories={categories}
      />
    </>
  );
}
