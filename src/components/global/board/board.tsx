"use client";

import {
  Droppable,
  DragDropContext,
  type OnDragEndResponder,
} from "@hello-pangea/dnd";
import Ticket from "./ticket";

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

export const mockBoardTickets = [
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

export const Board = () => {
  const onDragEnd: OnDragEndResponder = (result) => {
    console.log(result);
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
                className="grow basis-full bg-neutral-800 p-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="text-subtlest font-semibold text-sm mb-5">
                  {col.label}
                </div>
                {mockBoardTickets.map((ticket) => (
                  <Ticket key={ticket.id} {...ticket} />
                ))}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
