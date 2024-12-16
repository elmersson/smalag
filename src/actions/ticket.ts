"use server";

import { db } from "@/lib/db";
import { TicketStatus } from "@prisma/client";

export const createTicket = async (
  boardId: string,
  taskData: {
    title: string;
    description?: string;
    reportedBy: string;
    assignedTo: string;
  },
) => {
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
      title: taskData.title,
      description: taskData.description,
      boardId: boardId,
      boardColumnId: todoColumn.id,
      status: TicketStatus.TODO,
      position: newPosition,
      reportedBy: taskData.reportedBy, // Must be a valid userId
      assignedTo: taskData.assignedTo, // Must be a valid userId
    },
  });

  return ticket;
};
