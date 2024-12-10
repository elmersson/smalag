"use server";

import { db } from "@/lib/db";
import { BoardType } from "@prisma/client";

export const createBoard = async (
  channelId: string,
  boardData: { name: string; description?: string },
) => {
  const type = BoardType.KANBAN;

  const board = await db.board.create({
    data: {
      type,
      title: boardData.name,
      description: boardData.description,
      channels: {
        connect: {
          id: channelId,
        },
      },
    },
    include: {
      channels: true,
    },
  });

  return { success: `Board ${board.title} created!`, board };
};
