"use client";

import {
  Droppable,
  DragDropContext,
  type OnDragEndResponder,
} from "@hello-pangea/dnd";
import Ticket from "./ticket";
import { Button } from "@/components/ui/button";
import { createTicket } from "@/actions/ticket";
import type { BoardTicket } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const mockBoardColumns = [
  {
    id: "col_todo_123",
    position: 0,
    label: "TODO",
    boardId: "brd_123",
  },
  {
    id: "col_inprogress_456",
    position: 1,
    label: "IN_PROGRESS",
    boardId: "brd_123",
  },
  {
    id: "col_done_789",
    position: 2,
    label: "DONE",
    boardId: "brd_123",
  },
];

export const mockBoardTickets: BoardTicket[] = [
  {
    id: "tic_1",
    title: "Fix login bug",
    description: "Users are unable to log in with correct credentials",
    boardColumnId: "col_todo_123",
    status: "TODO",
    boardId: "brd_123",
    storyPoints: 3,
    position: 0,
    assignedTo: "usr_1",
    reportedBy: "usr_2",
  },
  {
    id: "tic_2",
    title: "Add search functionality",
    description: "Implement search across all tasks on the main dashboard",
    boardColumnId: "col_inprogress_456",
    status: "IN_PROGRESS",
    boardId: "brd_123",
    storyPoints: 5,
    position: 1,
    assignedTo: "usr_2",
    reportedBy: "usr_3",
  },
  {
    id: "tic_3",
    title: "Improve UI design",
    description: "Revamp the landing page to align with the new style guide",
    boardColumnId: "col_done_789",
    status: "DONE",
    boardId: "brd_123",
    storyPoints: 2,
    position: 2,
    assignedTo: "usr_4",
    reportedBy: "usr_2",
  },
];

interface BoardProps {
  boardId?: string;
  userId?: string;
  spaceId?: string;
  channelId?: string;
}

export const Board = ({ boardId, userId, spaceId, channelId }: BoardProps) => {
  if (!userId || !boardId || !spaceId || !channelId) return null;

  const onDragEnd: OnDragEndResponder = (result) => {
    console.log(result);
  };

  const handleCreateTicket = async () => {
    const newTask = await createTicket(boardId, {
      title: "New Task",
      description: "This is a brand new task",
      reportedBy: userId,
      assignedTo: userId,
    });
    console.log("New Task Created:", newTask);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col sm:flex-row gap-3">
        {mockBoardColumns.map((col) => (
          <Droppable
            key={col.id}
            droppableId={col.id}
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="grow basis-full bg-neutral-800 p-2 max-w-md rounded-md"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex justify-between items-center p-2">
                  <div className=" font-semibold text-sm">{col.label}</div>
                  <Button
                    onClick={() => handleCreateTicket()}
                    className="p-2 text-white rounded flex items-center"
                    variant="ghost"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
                {mockBoardTickets.map((ticket) => (
                  <Ticket key={ticket.id} {...ticket} />
                ))}
              </div>
            )}
          </Droppable>
        ))}
        <Link
          href={`/space/${spaceId}/channel/${channelId}/board/${boardId}/create-ticket`}
        >
          <Button
            // onClick={handleCreateTicket}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Create Task
          </Button>
        </Link>
      </div>
    </DragDropContext>
  );
};
