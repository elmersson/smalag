"use client";

import { Plus } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSpaceId } from "@/hooks/use-space-id";
import { useUserChannels } from "@/queries/channels";
import { useCurrentUser } from "@/hooks/use-current-user";
export function NavMain() {
  const router = useRouter();
  const spaceId = useSpaceId();
  const { id: userId } = useCurrentUser();

  const { data: channels } = useUserChannels(userId ?? "", spaceId ?? "");

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between hover:opacity-100">
        <SidebarGroupLabel>Channels</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            router.push(`/create/channel/${spaceId}`);
          }}
        >
          <Plus className="text-sidebar-foreground/70" />
        </Button>
      </div>
      <SidebarMenu>
        {channels?.map((item) => (
          <Collapsible key={item.id} asChild defaultOpen={false}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                onClick={() => {
                  router.push(`/space/${spaceId}/channel/${item.id}`);
                }}
              >
                {/* <a href={item.url}> */}
                {/* <item.icon /> */}
                <span>{item.name}</span>
                {/* </a> */}
              </SidebarMenuButton>
              {/* {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null} */}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
