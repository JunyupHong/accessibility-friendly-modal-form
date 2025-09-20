import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const defaultFormSchema = z.object({
  name: z.string().nonempty("Name is Required"),
  email: z
    .string()
    .nonempty("Email is Required")
    .regex(emailRegex, "Input Valid Email"),
  memo: z.string().optional(),
});

export type DefaultFormData = z.infer<typeof defaultFormSchema>;
