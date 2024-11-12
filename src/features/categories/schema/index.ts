import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().optional().default(""),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
