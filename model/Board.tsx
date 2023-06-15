import Task from "./Task";

interface Board {
  name: string;
  columns: { name: string; tasks: Task[] }[];
}
export default Board;
