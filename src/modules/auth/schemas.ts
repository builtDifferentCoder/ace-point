import { z } from "zod";
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters long." }),
  email: z.email({ message: "Enter a valid email please" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters." }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.email({ message: "Enter a valid email please" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters." }),
});

export type LoginType = z.infer<typeof LoginSchema>;
