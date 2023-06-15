import Subtask from "./Subtask";

interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}
export default Task;
