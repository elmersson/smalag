import { useParams } from "next/navigation";

export const useSpaceId = (): string | undefined => {
  const params = useParams();

  const spaceId =
    typeof params?.spaceId === "string" ? params.spaceId : undefined;

  return spaceId;
};
