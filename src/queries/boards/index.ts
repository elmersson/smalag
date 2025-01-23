import { Board } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchChannelBoards = async (channelId: string): Promise<Board[]> => {
  if (!channelId) {
    throw new Error("Channel ID is required");
  }

  const response = await axios.get("/api/boards", {
    params: { channelId },
  });

  return response.data;
};

export const useChannelBoards = (channelId: string) => {
  return useQuery({
    queryKey: ["channelBoards", channelId],
    queryFn: () => fetchChannelBoards(channelId),
    enabled: !!channelId,
  });
};
