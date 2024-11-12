"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/categories/api/use-categories";
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
import { useCategory } from "@/features/categories/api/use-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { UpdateCategoryForm } from "@/features/categories/components/update-category-form";

export default function Page() {
  const params = useParams();
  const { data: category, isLoading: categoryLoading } = useCategory(
    typeof params.categoryId === "string" ? params.categoryId : "",
  );

  const { mutate: deleteCategory, isPending: deleteCategoryLoading } =
    useDeleteCategory(
      typeof params.categoryId === "string" ? params.categoryId : "",
    );

  if (categoryLoading) {
    return (
      <>
        <h2 className="text-lg font-medium">Chi tiết</h2>
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

  if (!category?.id) {
    return (
      <div className="flex items-center justify-center">
        <span>Không có dữ liệu</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chi tiết</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Xóa</Button>
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
                  deleteCategory();
                }}
                disabled={deleteCategoryLoading}
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <UpdateCategoryForm categoryId={category.id} initialData={category} />
    </>
  );
}
