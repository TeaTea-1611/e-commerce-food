"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useFoodItem } from "@/features/food-items/api/use-food-item";
import { useRelatedFoodItems } from "@/features/food-items/api/use-related-food-items";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const { data, isLoading } = useFoodItem(
    typeof params.foodItemId === "string" ? params.foodItemId : "",
  );
  const [buyQuantity, setBuyQuantity] = useState(1);
  const cart = useCart();

  const { data: relatedData } = useRelatedFoodItems(data?.categoryId || "");

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="size-96">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="size-full rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-3">
          <h2 className="text-lg font-semibold">{data.name}</h2>
          <p className="text-sm">{data.description}</p>
          <span className="font-semibold text-lg text-primary">
            {data.price}đ
          </span>
          <div className="flex flex-col w-full space-y-2">
            <div className="font-normal flex items-center justify-between text-sm leading-none text-muted-foreground">
              <p>Đã bán {data.sold}</p>
              <p>Còn {data.quantity} sản phẩm</p>
            </div>
            <Progress
              className="h-3"
              value={(data.sold / (data.sold + data.quantity)) * 100}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="">Số lượng: </Label>
            <Input
              type="number"
              min={1}
              max={data.quantity}
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(parseInt(e.target.value))}
              className="flex-1"
            />
          </div>
          <Button
            onClick={() => {
              cart.addItem({
                ...data,
                buyQuantity,
              });
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <div>
        <h3 className="font-semibold">Sản phẩm liên quan</h3>
        <div className="flex items-center w-full overflow-y-auto space-x-2">
          {relatedData?.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-2">
                <div className="relative size-36 rounded-md bg-muted">
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
      </div>
    </>
  );
}
