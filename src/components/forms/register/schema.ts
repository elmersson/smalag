import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "first name must be atleast 3 characters" }),
  email: z.string().email("You must give a valid email"),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers",
    ),
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
