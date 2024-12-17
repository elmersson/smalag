"use client";

import { Draggable } from "@hello-pangea/dnd";
import type { BoardTicket } from "@prisma/client";
import Image from "next/image";

const PRIORITY_STYLES: Record<string, { textColor: string }> = {
  LOW: { textColor: "text-green-700" },
  MEDIUM: { textColor: "text-yellow-700" },
  HIGH: { textColor: "text-red-700" },
};

interface EnhancedTicketProps extends BoardTicket {
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  assignedUserName?: string;
  assignedUserAvatarUrl?: string;
}

const Ticket = ({
  id,
  title,
  description,
  storyPoints,
  priority = "HIGH",
  dueDate = "15 September",
  assignedUserAvatarUrl,
  assignedUserName,
}: EnhancedTicketProps) => {
  const { textColor } = PRIORITY_STYLES[priority] || PRIORITY_STYLES.MEDIUM;

  return (
    <Draggable draggableId={id} index={0}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="m-1 p-4 rounded-lg bg-card shadow-sm border border-sidebar-accent flex flex-col space-y-2 cursor-pointer hover:shadow-md transition-shadow duration-150"
        >
          <div className={`text-xs font-semibold ${textColor}`}>{priority}</div>

          <h3 className=" font-semibold text-base truncate">{title}</h3>

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {description}
            </p>
          )}

          <div className="flex justify-between items-center text-sm pt-2">
            <div className="flex flex-col space-y-1">
              {dueDate && <span className="text-xs">Due: {dueDate}</span>}
              {storyPoints !== undefined && (
                <span className="text-xs text-muted-foreground">
                  SP: {storyPoints}
                </span>
              )}
            </div>

            {assignedUserAvatarUrl ? (
              <div className="flex items-center space-x-2">
                <Image
                  src={assignedUserAvatarUrl}
                  alt={assignedUserName || "Assigned User"}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                {assignedUserName && (
                  <span className="text-xs text-gray-700">
                    {assignedUserName}
                  </span>
                )}
              </div>
            ) : (
              assignedUserName && (
                <div className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full text-xs font-medium text-gray-700">
                  {assignedUserName[0].toUpperCase()}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
