import { z } from "zod";

export const billboardSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  imageUrl: z.string().url("URL không hợp lệ").optional().default(""),
});

export type BillboardSchemaType = z.infer<typeof billboardSchema>;
