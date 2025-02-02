"use client";

import { useChannelId } from "@/hooks/use-channel-id";
import { useChannelBoards } from "@/queries/boards";
import { useSpaceId } from "@/hooks/use-space-id";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/global/glass-card";
import BackdropGradient from "@/components/global/backdrop-gradient";

export default function ChannelPage() {
  const channelId = useChannelId();
  const spaceId = useSpaceId();
  const router = useRouter();

  const { data: boards } = useChannelBoards(channelId || "");

  if (boards && boards.length > 0) {
    router.push(`/space/${spaceId}/channel/${channelId}/board/${boards[0].id}`);
  }

  return (
    <div className="container h-screen flex justify-center">
      <div className="flex flex-col w-full items-center py-2">
        <Link href="/">
          <h2 className="text-4xl font-bold text-themeTextWhite">
            [channel name...]
          </h2>
        </Link>
        <BackdropGradient
          className="w-4/12 h-2/6 opacity-40"
          container="flex flex-col items-center"
        >
          <Link href={`/create/board/${spaceId}/${channelId}`}>
            <GlassCard className="p-7 mt-16 hover:bg-themeGray/80 hover:cursor-pointer hover:border-themeTextWhite/50 transition-all duration-300">
              <div className="flex flex-col items-center justify-center">
                <p className="text-themeTextWhite font-bold">Create Board</p>
              </div>
            </GlassCard>
          </Link>
        </BackdropGradient>
      </div>
    </div>
  );
}
