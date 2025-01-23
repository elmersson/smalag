"use client";

import { useChannelId } from "@/hooks/use-channel-id";
import { useChannelBoards } from "@/queries/boards";
import { useSpaceId } from "@/hooks/use-space-id";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChannelPage() {
  const channelId = useChannelId();
  const spaceId = useSpaceId();
  const router = useRouter();

  const { data: boards } = useChannelBoards(channelId!);

  if (boards && boards.length > 0) {
    router.push(`/space/${spaceId}/channel/${channelId}/board/${boards[0].id}`);
  }

  return (
    <div>
      <Link href={`/create/board/${spaceId}/${channelId}`}>
        <Button type="submit">Create Board</Button>
      </Link>
    </div>
  );
}
