import { Channel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserChannels = async (
  userId: string,
  spaceId: string,
): Promise<Channel[]> => {
  if (!userId || !spaceId) {
    throw new Error("User ID and Space ID are required");
  }

  const response = await axios.get("/api/channels", {
    params: { userId, spaceId },
  });

  return response.data;
};

export const useUserChannels = (userId: string, spaceId: string) => {
  return useQuery({
    queryKey: ["userChannels", userId, spaceId],
    queryFn: () => fetchUserChannels(userId, spaceId),
    enabled: !!userId && !!spaceId,
  });
};
