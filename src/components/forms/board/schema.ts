import { z } from "zod";

export const CreateBoardSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

export type CreateBoardFormValues = z.infer<typeof CreateBoardSchema>;
