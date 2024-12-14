import { useParams } from "next/navigation";

export const useBoardId = (): string | undefined => {
  const params = useParams();

  const boardId =
    typeof params?.boardId === "string" ? params.boardId : undefined;

  return boardId;
};
