"use client";

import { Board } from "@/components/global/board/board";
import { useBoardId } from "@/hooks/use-board-id";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function BoardPage() {
  const boardId = useBoardId();
  const userId = useCurrentUser();
  return (
    <div>
      <Board boardId={boardId} userId={userId?.id} />
    </div>
  );
}
