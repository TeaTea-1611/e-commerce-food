"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useCreateFoodItem } from "../api/use-create-food-item";
import {
  cookingMethodOptions,
  originOptions,
  sizeOptions,
  targetUserOptions,
  tasteOptions,
  usageTypeOptions,
} from "../constants";
import { foodItemSchema, type FoodItemSchemaType } from "../schema";

interface Props {
  categories: Category[];
}

export function CreateFoodItemForm({ categories }: Props) {
  const form = useForm<FoodItemSchemaType>({
    resolver: zodResolver(foodItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 1,
      imageUrl: "",
      categoryId: "",
      cookingMethod: cookingMethodOptions[0],
      taste: [],
      size: sizeOptions[0],
      origin: originOptions[0],
      usageType: usageTypeOptions[0],
      targetUsers: [],
    },
  });

  const { mutate: updateFoodItem, isPending } = useCreateFoodItem();

  const onSubmit = async (values: FoodItemSchemaType) => {
    updateFoodItem({ json: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên món</FormLabel>
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
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
        <FormField
          control={form.control}
          name="cookingMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phương pháp nấu</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương pháp nấu" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cookingMethodOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
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
          name="taste"
          render={() => (
            <FormItem>
              <FormLabel>Vị</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {tasteOptions.map((option) => (
                  <FormField
                    key={option}
                    control={form.control}
                    name="taste"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              const values = new Set(field.value);
                              checked
                                ? values.add(option)
                                : values.delete(option);
                              field.onChange(Array.from(values));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cỡ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xuất xứ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn xuất xứ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {originOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
          name="usageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại sử dụng</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại sử dụng" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {usageTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
          name="targetUsers"
          render={() => (
            <FormItem>
              <FormLabel>Đối tượng sử dụng</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {targetUserOptions.map((option) => (
                  <FormField
                    key={option}
                    control={form.control}
                    name="targetUsers"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              const values = new Set(field.value);
                              checked
                                ? values.add(option)
                                : values.delete(option);
                              field.onChange(Array.from(values));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
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
