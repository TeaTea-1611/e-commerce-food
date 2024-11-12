import { z } from "zod";

export const foodItemSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().optional().default(""),
  price: z.number().positive("Giá phải lớn hơn 0"),
  quantity: z.number(),
  imageUrl: z.string().url("URL không hợp lệ").optional().default(""),
  categoryId: z.string().min(1, "Vui lòng chọn"),
  cookingMethod: z.string(),
  taste: z.array(z.string()).min(1, "Phải chọn ít nhất một loại vị"),
  size: z.string(),
  origin: z.string(),
  usageType: z.string(),
  targetUsers: z.array(z.string()).min(1, "Phải chọn ít nhất một đối tượng"),
});

// Export type
export type FoodItemSchemaType = z.infer<typeof foodItemSchema>;
