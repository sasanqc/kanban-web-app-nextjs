import Task from "@/model/Task";
import React from "react";
import CreateTask from "./CreateTask";

interface EditTaskProps {
  task: Task;
  columns: { label: string; value: string }[];
  onEditTask: (task: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask, columns }) => {
  return <CreateTask task={task} onCreateTask={onEditTask} columns={columns} />;
};

export default EditTask;
