"use server";

import { db } from "@/lib/db";

export const createSpace = async (
  userId: string,
  spaceData: { name: string; description?: string },
) => {
  const space = await db.space.create({
    data: {
      name: spaceData.name,
      description: spaceData.description,
      userSpaces: {
        create: {
          userId: userId,
          role: "ADMIN",
        },
      },
    },
  });

  return { success: `Space ${space.name} created!`, space };
};
