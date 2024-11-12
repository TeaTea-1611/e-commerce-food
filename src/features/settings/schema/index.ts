import { z } from "zod";

export const profileSettingsSchema = z.object({
  name: z.string().min(1),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Invalid!",
    ),
  address: z.string().min(1),
});

export type ProfileSettingsSchema = z.infer<typeof profileSettingsSchema>;
