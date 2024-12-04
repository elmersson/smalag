import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID not provided" },
      { status: 400 },
    );
  }

  const userSpaces = await db.userSpace.findMany({
    where: {
      userId: userId,
    },
    include: {
      space: true,
    },
  });

  const spaces = userSpaces.map((userSpace) => userSpace.space);

  return NextResponse.json(spaces);
}
