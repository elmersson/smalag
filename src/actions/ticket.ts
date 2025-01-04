"use server";

import type { CreateTicketFormValues } from "@/components/forms/create-ticket/schema";
import { db } from "@/lib/db";
import { TicketStatus } from "@prisma/client";

export const createTicket = async (
  boardId: string,
  taskData: CreateTicketFormValues,
  userId: string,
) => {
  try {
    let todoColumn = await db.boardColumn.findFirst({
      where: {
        boardId: boardId,
        label: TicketStatus.TODO,
      },
    });

    if (!todoColumn) {
      todoColumn = await db.boardColumn.create({
        data: {
          boardId: boardId,
          label: TicketStatus.TODO,
          position: 0,
        },
      });
    }

    const currentMaxPosition = await db.boardTicket.aggregate({
      where: { boardColumnId: todoColumn.id },
      _max: { position: true },
    });

    const newPosition =
      currentMaxPosition._max.position !== null
        ? currentMaxPosition._max.position + 1
        : 0;

    // 3. Create the new ticket
    const ticket = await db.boardTicket.create({
      data: {
        ...taskData,
        boardColumnId: todoColumn.id,
        position: newPosition,
        boardId: boardId,
        reportedBy: userId,
        assignedTo: taskData.assignedTo || "",
      },
    });

    return { success: `Ticket ${ticket.title} created!`, ticket };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { error: `Failed to create ticket: ${errorMessage}` };
  }
};
