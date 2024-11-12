import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Invalid!",
    ),
  address: z.string().min(1),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
