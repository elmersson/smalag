"use client";

import { useUserSpaces } from "@/queries/spaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isLoading, data: spaces } = useUserSpaces(session?.user?.id || "");

  const spaceId = useMemo(() => spaces?.[0]?.id, [spaces]);

  useEffect(() => {
    if (isLoading) return;

    if (spaceId) {
      router.push(`space/${spaceId}`);
    } else if (!open) {
      router.push("/create/space");
    }
  }, [spaceId, isLoading, router]);

  return (
    <div>
      <h1>Space</h1>
    </div>
  );
}
