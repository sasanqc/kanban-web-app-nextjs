import Task from "@/model/Task";

interface TaskColumnProps {
  col: { name: string; tasks: Task[] };
  onClickedTask: (index: number) => void;
}
const TaskColumn: React.FC<TaskColumnProps> = ({ col, onClickedTask }) => {
  const doneSubtasksNumber = (task: Task) => {
    return task.subtasks.filter((el) => el.isCompleted).length;
  };

  return (
    <div className="w-[280px] shrink-0 h-full">
      <div className="flex mb-6">
        <div className="w-4 h-4 bg-primary2 rounded-full inline-block mr-3"></div>
        <h4 className="text-gray3">
          {col.name} ({col.tasks.length})
        </h4>
      </div>
      <ul className="space-y-5 pb-6 ">
        {col.tasks.map((task, index) => (
          <li key={index}>
            <section
              className="py-6 px-4 bg-white dark:bg-black2 rounded-lg shadow-task cursor-pointer"
              onClick={(e) => onClickedTask(index)}
            >
              <h3 className="mb-2">{task.title}</h3>
              <p className="text-sm text-gray3  font-bold ">
                {`${doneSubtasksNumber(task)} of ${
                  task.subtasks.length
                } subtasks`}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskColumn;
