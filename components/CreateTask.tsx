import { useState, useRef } from "react";
import Button from "./UI/Button";
import CrossIcon from "@/icons/icon-cross.svg";
import Select from "./UI/Select";
import TextInput from "./UI/TextInput";
import Task from "@/model/Task";

interface CreateTaskProps {
  task?: Task;
  columns: { label: string; value: string }[];
  onCreateTask: (task: Task) => void;
}
interface ImperativeInput {
  error: (message: string) => void;
}
const CreateTask: React.FC<CreateTaskProps> = ({
  task,
  columns,
  onCreateTask,
}) => {
  const initialSubTasks = [
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ];
  const [subtasks, setSubtasks] = useState(task?.subtasks || initialSubTasks);
  const [title, setTitle] = useState(task?.title || "");

  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(
    columns.find((el) => el.value === task?.status)?.value || columns[0].value
  );
  const inputRef = useRef<ImperativeInput>(null);
  const columnsRef = useRef<Array<ImperativeInput | null>>([]);
  const onChangedTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };
  const handleChangedSubtask = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedColumns = [...subtasks];
    updatedColumns[index].title = (e.target as HTMLInputElement).value;
    setSubtasks(updatedColumns);
  };

  const handleDeleteSubtask = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    const updatedColumns = [...subtasks];
    updatedColumns.splice(index, 1);
    setSubtasks(updatedColumns);
  };

  const handleSubmitTask = () => {
    if (title?.trim().length === 0) {
      inputRef.current?.error("Can't be empty");
      return;
    }
    //validate subtasks title
    for (let i = 0; i < subtasks.length; i++) {
      const element = subtasks[i];
      if (element.title.length === 0) {
        columnsRef.current[i]?.error("Can't be empty");
        return;
      }
    }
    onCreateTask({
      title,
      description,
      status,
      subtasks,
    });
  };

  return (
    <div className="modal-content">
      <h2 className="text-black4 mb-6 dark:text-white">
        {task ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="space-y-6">
        <TextInput
          label={"Title"}
          placeholder={"e.g. Take coffee break"}
          onChange={onChangedTitle}
          value={title}
          ref={inputRef}
        />
        <div className="">
          <label
            htmlFor="description"
            className="block text-gray3 text-sm font-bold"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              name="description"
              className="min-h-[120px] resize-none w-full dark:bg-black2  border text-base border-gray2 focus:border-primary2 py-2 px-4 rounded-md outline-none  placeholder:text-black placeholder:opacity-25 dark:placeholder:text-white focus:ring-0"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              required
              value={description}
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                setDescription((e.target as HTMLTextAreaElement).value)
              }
            />
          </div>
        </div>
        <div className="mt-2 space-y-6">
          <div className="space-y-2">
            <label className="block  text-gray3 text-sm font-bold">
              Subtasks
            </label>
            <ul className="space-y-2 ">
              {subtasks.map((el, index) => (
                <li className="flex items-center " key={index}>
                  <TextInput
                    placeholder={"e.g. TODO"}
                    name={"name"}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      handleChangedSubtask(e, index)
                    }
                    ref={(el) => (columnsRef.current[index] = el)}
                    value={subtasks[index].title}
                  />
                  <div className="ml-4 cursor-pointer">
                    <CrossIcon
                      onClick={(e: MouseEvent) => handleDeleteSubtask(e, index)}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Button
              type={"small secondary"}
              classes="w-full"
              label="+ Add New Subtask"
              onClick={() =>
                setSubtasks((prev) => [
                  ...prev,
                  { title: "", isCompleted: false },
                ])
              }
            />
          </div>

          <Select
            label={"Status"}
            items={columns}
            onChanged={(value) => setStatus(value)}
            initialItem={columns.findIndex((el) => el.value === status)}
          />

          <Button
            label={task ? "Edit Task" : "Create Task"}
            onClick={handleSubmitTask}
            classes={"w-full"}
            type={"primary small"}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
