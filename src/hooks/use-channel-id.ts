import { useParams } from "next/navigation";

export const useChannelId = (): string | undefined => {
  const params = useParams();

  const channelId =
    typeof params?.channelId === "string" ? params.channelId : undefined;

  return channelId;
};
