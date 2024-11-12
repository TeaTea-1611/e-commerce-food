"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFeaturedFoodItems } from "@/features/food-items/api/use-featured-food-items";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const { data: foodItems, isLoading } = useFeaturedFoodItems();

  return (
    <>
      <h2 className="text-lg font-semibold">Sản phẩm nổi bật</h2>
      <div className="grid grid-cols-5 gap-3 w-full">
        {foodItems?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-2">
              <div className="relative h-40 rounded-md bg-muted">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover size-full"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col text-left p-2">
              <div className="flex w-full">
                <Link
                  href={`/food-items/${item.id}`}
                  className="text-left font-semibold text-sm"
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex w-full">
                <span className="font-medium text-sm text-primary">
                  {item.price}đ
                </span>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <div className="font-normal flex items-center justify-between text-xs leading-none text-muted-foreground">
                  <p>Đã bán {item.sold}</p>
                  <p>Còn {item.quantity}</p>
                </div>
                <Progress
                  className="h-2"
                  value={(item.sold / (item.sold + item.quantity)) * 100}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link
          href={"/food-items"}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Xem tất cả
        </Link>
      </div>
    </>
  );
}
