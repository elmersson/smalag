import { z } from "zod";

export const CreateChannelSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

export type CreateChannelFormValues = z.infer<typeof CreateChannelSchema>;
