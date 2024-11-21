import { z } from "zod";

export const NewPasswordSchema = z.object({
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

export type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;
