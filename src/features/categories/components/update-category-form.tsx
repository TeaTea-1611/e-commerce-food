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
import { useUpdateCategory } from "../api/use-update-category";
import { categorySchema, type CategorySchemaType } from "../schema";

interface Props {
  initialData: CategorySchemaType;
  categoryId: string;
}

export function UpdateCategoryForm({ initialData, categoryId }: Props) {
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData,
  });

  const { mutate: updateCategory, isPending } = useUpdateCategory(categoryId);

  const onSubmit = async (values: CategorySchemaType) => {
    updateCategory({
      param: { id: categoryId },
      json: values,
    });
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
