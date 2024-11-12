"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderSchema, OrderSchemaType } from "../schema";
import { useUpdateOrder } from "../api/use-update-order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Props {
  initialData: OrderSchemaType;
  orderId: string;
}

export function UpdateStatusOrderForm({ initialData, orderId }: Props) {
  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData,
  });

  const { mutate: updateCategory, isPending } = useUpdateOrder(orderId);

  const onSubmit = async (values: OrderSchemaType) => {
    updateCategory({
      param: { id: orderId },
      json: values,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["PENDING", "COMPLETED", "CANCELLED"].map((option) => (
                    <SelectItem key={option} value={option}>
                      {STATUS[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái giao hàng</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["PENDING_DELIVERY", "IN_TRANSIT", "DELIVERED"].map(
                    (option) => (
                      <SelectItem key={option} value={option}>
                        {DELIVERY_STATUS[option]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Đang xử lý..." : "Lưu"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
