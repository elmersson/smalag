import { useBoardId } from "@/hooks/use-board-id";

export default function Board() {
  const boardId = useBoardId();

  return (
    <div>
      <h1>Board : {boardId}</h1>
    </div>
  );
}
