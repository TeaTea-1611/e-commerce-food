"use client";

import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./components/cart-item";
import { Summary } from "./components/summary";

export default function Page() {
  const cart = useCart();
  return (
    <>
      <div className="px-4 py-6 space-y-2">
        <h1 className="text-2xl font-semibold">Giỏ hàng</h1>
        <Separator />
        <div className="lg:grid lg:grid-cols-3 gap-2 lg:items-start">
          <div className="lg:col-span-2">
            <ul className="space-y-2">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </>
  );
}
