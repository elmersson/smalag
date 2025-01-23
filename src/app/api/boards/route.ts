import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");

  if (!channelId) {
    return NextResponse.json(
      { error: "Channel ID not provided" },
      { status: 400 },
    );
  }

  try {
    const boards = await db.board.findMany({
      where: {
        channels: {
          some: {
            id: channelId,
          },
        },
      },
      include: {
        channels: true,
      },
    });

    return NextResponse.json(boards);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch boards for the channel" },
      { status: 500 },
    );
  }
}
