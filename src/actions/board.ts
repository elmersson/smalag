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

export const getBoardsByChannel = async (channelId: string) => {
  try {
    const boards = await db.board.findMany({
      where: {
        channels: {
          some: {
            id: channelId,
          },
        },
      },
      include: {
        channels: true,
      },
    });

    return { success: true, boards };
  } catch (error) {
    return { success: false, error };
  }
};
