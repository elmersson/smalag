import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const spaceId = searchParams.get("spaceId");

  if (!userId || !spaceId) {
    return NextResponse.json(
      { error: "User ID or Space ID not provided" },
      { status: 400 },
    );
  }

  try {
    const userChannels = await db.userChannel.findMany({
      where: {
        userId: userId,
        channel: {
          spaceId: spaceId,
        },
      },
      include: {
        channel: true,
      },
    });

    const channels = userChannels.map((userChannel) => userChannel.channel);

    return NextResponse.json(channels);
  } catch (error) {
    console.error("Error fetching user channels:", error);
    return NextResponse.json(
      { error: "Failed to fetch channels for the user in the specified space" },
      { status: 500 },
    );
  }
}
