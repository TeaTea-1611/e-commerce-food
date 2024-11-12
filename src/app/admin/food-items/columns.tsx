"use client";

import { Button } from "@/components/ui/button";
import { FoodItem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useDeleteFoodItem } from "@/features/food-items/api/use-delete-food-item";
import Link from "next/link";

export const columns: ColumnDef<FoodItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "origin",
    header: "Xuất sứ",
  },
  {
    accessorKey: "size",
    header: "Kích cỡ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const foodItem = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(foodItem.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/food-items/${foodItem.id}`}>Chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
