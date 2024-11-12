import { FoodItem } from "@prisma/client";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: (FoodItem & {
    buyQuantity: number;
  })[];
  addItem: (
    data: FoodItem & {
      buyQuantity: number;
    },
  ) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItem = get().items;
        const existingItem = currentItem.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItem.map((item) =>
              item.id === data.id
                ? { ...item, buyQuantity: data.buyQuantity }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItem, data] });
        }

        toast.success("Đã thêm vào giỏ hàng");
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
