"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/features/auth/api/use-auth";
import { useCheckout } from "@/features/checkout/api/use-checkout";
import { useCart } from "@/hooks/use-cart";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const router = useRouter();
  const { mutate } = useCheckout();
  const { data: me } = useAuth();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (searchParams.get("status") === "1" && mounted) {
      toast("Thanh toán thành công.");
      cart.removeAll();
      queryClient.invalidateQueries({
        queryKey: ["foodItems"],
      });
    }
    setMounted(true);
  }, [mounted, searchParams.get("status")]);

  return (
    <div className="bg-card rounded-lg space-y-4 lg:col-span-1 border p-4">
      <h2 className="text-lg font-medium">Tổng tiền</h2>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-primary">
          Tổng tiền cần thanh toán
        </span>
        <span className="font-medium text-sm text-primary">
          {cart.items.reduce((pre, cur) => {
            return pre + cur.buyQuantity * cur.price;
          }, 0)}
          đ
        </span>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          if (me?.id) {
            if (!me.address || !me.phone) {
              toast("Vui lòng cập nhật thông tin cá nhân");
              return;
            }
            mutate({
              json: {
                items: cart.items.map((item) => ({
                  id: item.id,
                  quantity: item.buyQuantity,
                })),
              },
            });
          } else {
            router.push("/login");
          }
        }}
      >
        Thanh toán với Zalopay
      </Button>
    </div>
  );
};
