"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

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

import type { ExtendedUser } from "../../../../next-auth";

import { useRouter } from "next/navigation";
import { useUserSpaces } from "@/queries/spaces";

export function NavSpaces({ user }: { user: Pick<ExtendedUser, "id"> }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const { data: spaces = [], isLoading, error } = useUserSpaces(user?.id || "");

  if (isLoading) {
    return <div>Loading spaces...</div>;
  }

  if (error) {
    console.error("Error fetching spaces:", error);
    return <div>Failed to load spaces</div>;
  }

  const handleCreateSpace = async () => {
    router.push("/spaces");
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
                <AvatarImage
                  src={user.id || undefined}
                  alt={user.id || "User"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">name</span>
                <span className="truncate text-xs">id</span>
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
              {spaces.map((space) => (
                <div
                  key={space.id}
                  className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.id || undefined}
                      alt={user.id || "User"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{space.name}</span>
                    <span className="truncate text-xs">
                      {space.description}
                    </span>
                  </div>
                </div>
              ))}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleCreateSpace}>
              <LogOut />
              Create Space
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
