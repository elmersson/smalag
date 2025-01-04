import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  boardColumnId: z.string().uuid("Invalid board column ID"),
  assignedTo: z.string().uuid("Invalid user ID").optional(),
  storyPoints: z.number().int().nonnegative().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).default("TODO"),
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;
