import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { FoodItem } from "@prisma/client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  item: FoodItem & {
    buyQuantity: number;
  };
}

export const CartItem = ({ item }: Props) => {
  const cart = useCart();

  return (
    <li className="flex py-6 border-b">
      <div className="relative size-28 rounded-md overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="object-cover size-full rounded-md"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between">
        <Button
          variant={"outline"}
          className="absolute top-0 right-0 rounded-full size-6 p-2"
          onClick={() => {
            cart.removeItem(item.id);
          }}
        >
          <X className="size-4" />
        </Button>
        <div className="pr-8 grid grid-cols-2">
          <div className="flex justify-between">
            <Link
              href={`/food-items/${item.id}`}
              className="text-lg font-medium"
            >
              {item.name}
            </Link>
          </div>
          <div className="flex text-sm">
            <Badge>{item.size}</Badge>
            <Badge className="ml-2">{item.origin}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm text-primary">
              {item.price}đ
            </span>
            <span className="font-medium text-sm text-primary">
              Tổng: {item.price * item.buyQuantity}đ (x{item.buyQuantity})
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
