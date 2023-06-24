import { useEffect, useState } from "react";
import Select from "./UI/Select";
import Checkbox from "./UI/Checkbox";
import Task from "@/model/Task";
import Dropdown from "./UI/Dropdown";
import { useDispatch } from "react-redux";
import { setActiveModal } from "@/store/uiSlice";
import ModalEnum from "@/model/ModalEnum";

interface ViewTaskProps {
  task: Task;
  columns: { label: string; value: string }[];
  onChangeTask: (task: Task) => void;
  handleChangeTaskStatus: (status: string) => void;
  onDeleteTask: () => void;
}

const ViewTask: React.FC<ViewTaskProps> = ({
  task,
  columns,
  onChangeTask,
  handleChangeTaskStatus,
  onDeleteTask,
}) => {
  const dispatch = useDispatch();

  const [editedTask, setEditedTask] = useState(task);

  const onChangeSubtask = (index: number, isComleted: boolean) => {
    const updatedTask = { ...editedTask };
    updatedTask.subtasks[index].isCompleted = isComleted;
    setEditedTask(updatedTask);
    onChangeTask(updatedTask);
  };

  const onChangTaskStatus = (value: string) => {
    const updatedTask = { ...editedTask };
    updatedTask.status = value;
    setEditedTask(updatedTask);
    handleChangeTaskStatus(value);
  };
  const onClickEditTask = () => {
    dispatch(setActiveModal(ModalEnum.EDIT_TASK));
  };
  useEffect(() => {
    setEditedTask(task);
    return () => {};
  }, [task]);

  return (
    <div className="modal-content">
      <div className="flex mb-6 items-center gap-x-6 justify-between ">
        <h2 className="text-black4 dark:text-white">{editedTask.title}</h2>
        <Dropdown
          items={[
            {
              label: "Edit Task",
              onClick: onClickEditTask,
              className: "text-gray3",
            },
            {
              label: "Delete Task",
              onClick: onDeleteTask,
              className: "text-destructive2",
            },
          ]}
        />
      </div>
      <p className="text-base text-gray3 mb-6 ">{editedTask.description}</p>

      <div className="">
        <p className="text-sm font-bold text-gray3 mb-4">{`Subtasks (${
          editedTask.subtasks.filter((el) => el.isCompleted).length
        } of ${editedTask.subtasks.length})`}</p>
        <ul className="space-y-2  mb-6">
          {editedTask.subtasks.map((el, index) => (
            <li key={index}>
              <Checkbox
                label={el.title}
                checked={el.isCompleted}
                onChange={(value) => onChangeSubtask(index, value)}
              />
            </li>
          ))}
        </ul>
        <Select
          label={"Current Status"}
          items={columns}
          onChanged={onChangTaskStatus}
          initialItem={
            columns.findIndex((el) => el.value === editedTask.status) > -1
              ? columns.findIndex((el) => el.value === editedTask.status)
              : 0
          }
        />
      </div>
    </div>
  );
};

export default ViewTask;
