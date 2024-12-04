import { Space } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserSpaces = async (userId: string): Promise<Space[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axios.get("/api/spaces", {
    params: { userId },
  });

  return response.data;
};

export const useUserSpaces = (userId: string) => {
  return useQuery({
    queryKey: ["userSpaces", userId],
    queryFn: () => fetchUserSpaces(userId),
    enabled: !!userId,
  });
};
