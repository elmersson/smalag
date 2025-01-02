"use client";

import { Board } from "@/components/global/board/board";
import { useBoardId } from "@/hooks/use-board-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSpaceId } from "@/hooks/use-space-id";

export default function BoardPage() {
  const boardId = useBoardId();
  const channelId = useChannelId();
  const spaceId = useSpaceId();
  const userId = useCurrentUser();
  return (
    <div>
      <Board
        boardId={boardId}
        userId={userId?.id}
        spaceId={spaceId}
        channelId={channelId}
      />
    </div>
  );
}
