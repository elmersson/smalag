"use client";

import { Button } from "@/components/ui/button";
import { useChannelId } from "@/hooks/use-channel-id";
import { useSpaceId } from "@/hooks/use-space-id";
import Link from "next/link";

export default function ChannelChoices() {
  const spaceId = useSpaceId();
  const channelId = useChannelId();

  return (
    <div>
      <h1>Channel</h1>
      <Link href={`/create/board/${spaceId}/${channelId}`}>
        <Button type="submit">Create Board</Button>
      </Link>
    </div>
  );
}
