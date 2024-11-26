"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import type { Space } from "@prisma/client";

export function NavSpaces({ userId }: { userId?: string }) {
  const { isMobile } = useSidebar();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(spaces, selectedSpace, loading);

  // Fetch user spaces
  useEffect(() => {
    async function fetchSpaces() {
      try {
        setLoading(true);
        const response = await fetch(`/api/spaces?userId=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
        } else {
          setSpaces(data.spaces);
          setSelectedSpace(data.spaces[0] || null);
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchSpaces();
  }, [userId]);

  const createSpace = async () => {
    const newSpaceName = "First Space";
    if (!newSpaceName) return;

    try {
      const response = await fetch("/api/spaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSpaceName,
          description: "",
          userId,
        }),
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        setSpaces((prevSpaces) => [...prevSpaces, data.space]);
        setSelectedSpace(data.space);
      }
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {/* {spaces[0].name} */}
                  Test
                </span>
                <span className="truncate text-xs">
                  {/* {spaces[0].description ?? "test"} */}
                  Test
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {/* {spaces[0].name ?? "test"} */}
                    test
                  </span>
                  <span className="truncate text-xs">
                    {/* {spaces[0].description ?? "test"} */}
                    test
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={createSpace}>
              <Plus />
              Create Space
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
