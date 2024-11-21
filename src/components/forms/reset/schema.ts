import { z } from "zod";

export const ResetSchema = z.object({
  email: z.string().email("You must give a valid email"),
});

export type ResetFormValues = z.infer<typeof ResetSchema>;
