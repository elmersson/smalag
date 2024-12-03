import { z } from "zod";

export const CreateSpaceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

export type CreateSpaceFormValues = z.infer<typeof CreateSpaceSchema>;
