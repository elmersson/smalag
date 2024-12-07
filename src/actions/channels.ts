"use server";

import { db } from "@/lib/db";

export const createChannel = async (
  userId: string,
  spaceId: string,
  channelData: { name: string; description?: string },
) => {
  const channel = await db.channel.create({
    data: {
      name: channelData.name,
      description: channelData.description,
      spaceId: spaceId,
      userChannels: {
        create: {
          userId: userId,
          role: "ADMIN",
        },
      },
    },
  });

  return { success: `Channel ${channel.name} created!`, channel };
};
