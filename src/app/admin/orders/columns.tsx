"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order, OrderStatus, PaymentStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const STATUS: {
  [key: string]: string;
} = {
  PENDING: "Đang chờ",
  COMPLETED: "Đã hoàn thành",
  CANCELLED: "Đã hủy",
};

const DELIVERY_STATUS: {
  [key: string]: string;
} = {
  PENDING_DELIVERY: "Đang chờ",
  IN_TRANSIT: "Đang chuyển tiếp",
  DELIVERED: "Đã giao hàng",
};

const PAYMENT_STATUS = {
  [PaymentStatus.PENDING_PAYMENT]: "Đang chờ",
  [PaymentStatus.PAID]: "Đã thanh toán",
  [PaymentStatus.FAILED]: "Thất bại",
};

export const columns: ColumnDef<{
  id: string;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  user: {
    id: string;
    phone: string;
    address: string;
  };
}>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.phone",
    header: "SĐT",
  },
  {
    accessorKey: "user.address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "totalAmount",
    header: "Tổng tiền",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      return STATUS[row.original.status];
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Thanh toán",
    cell: ({ row }) => {
      return PAYMENT_STATUS[row.original.paymentStatus];
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
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
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/orders/${order.id}`}>Chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
