import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const experienceOptions = ["0~3년", "4~7년", "8년 이상"] as const;


export const defaultFormSchema = z.object({
  name: z.string().nonempty("Name is Required"),
  email: z
    .string()
    .nonempty("Email is Required")
    .regex(emailRegex, "Input Valid Email"),
  github: z.string().optional(),
  experience: z.enum(experienceOptions).optional().refine(val => !!val, {
    message: "경력 연차를 선택해주세요.",
  }),
});

export type DefaultFormData = z.infer<typeof defaultFormSchema>;
