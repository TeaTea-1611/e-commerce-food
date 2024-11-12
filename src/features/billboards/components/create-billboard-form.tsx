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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateBillboard } from "../api/use-create-billboard";
import { billboardSchema, BillboardSchemaType } from "../schema";

export function CreateBillboardForm() {
  const form = useForm<BillboardSchemaType>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const { mutate: updateBillboard, isPending } = useCreateBillboard();

  const onSubmit = async (values: BillboardSchemaType) => {
    updateBillboard({ json: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Hình ảnh</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
