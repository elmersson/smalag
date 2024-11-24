import { z } from "zod";
export const VerificationSchema = z.object({
  token: z.string({ message: "Token is required" }),
});

export type VerificationFormValues = z.infer<typeof VerificationSchema>;
