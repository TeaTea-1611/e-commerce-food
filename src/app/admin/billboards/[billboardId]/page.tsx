"use client";

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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBillboard } from "@/features/billboards/api/use-billboard";
import { useDeleteBillboard } from "@/features/billboards/api/use-delete-billboard";
import { UpdateBillboardForm } from "@/features/billboards/components/update-billboard-form";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { data: billboard, isLoading: billboardLoading } = useBillboard(
    typeof params.billboardId === "string" ? params.billboardId : "",
  );

  const { mutate: deleteBillboard, isPending: deleteBillboardLoading } =
    useDeleteBillboard(
      typeof params.billboardId === "string" ? params.billboardId : "",
    );

  if (billboardLoading) {
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

  if (!billboard?.id) {
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
                  deleteBillboard();
                }}
                disabled={deleteBillboardLoading}
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <UpdateBillboardForm billboardId={billboard.id} initialData={billboard} />
    </>
  );
}
