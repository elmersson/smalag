"use client";

import { Draggable } from "@hello-pangea/dnd";

interface TicketProps {
  id: string;
  title: string;
}

const Ticket = ({ id, title }: TicketProps) => {
  return (
    <Draggable draggableId={id} index={0}>
      {(provided) => (
        <div
          className="m-1 h-[200px] bg-black p-3 rounded cursor-pointer relative"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{title}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
