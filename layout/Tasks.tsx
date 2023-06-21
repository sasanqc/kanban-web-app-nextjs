import TaskColumn from "@/components/TaskColumn";
import Button from "@/components/UI/Button";
import Board from "@/model/Board";

interface TasksProps {
  board: Board;
  onCreateColumn: () => void;
  onClickedTask: (colIndex: number, taskIndex: number) => void;
}

const Tasks: React.FC<TasksProps> = ({
  board,
  onCreateColumn,
  onClickedTask,
}) => {
  return (
    <div className="flex-1 h-full  p-6 flex gap-6 overflow-auto flex-nowrap bg-white2 dark:bg-black3 border-t border-t-gray1 dark:border-t-black1">
      {board?.columns?.map((col, index) => (
        <TaskColumn
          col={col}
          key={index}
          onClickedTask={(taskIndex: number) => onClickedTask(index, taskIndex)}
        />
      ))}
      {board?.columns?.length > 0 && (
        <div className="bg-gray1 dark:bg-black2 text-center mt-10 flex rounded-md">
          <h1
            onClick={onCreateColumn}
            className="text-gray3 w-[280px] my-auto cursor-pointer hover:text-gray1 transition-colors"
          >
            + New Column
          </h1>
        </div>
      )}
      {board?.columns?.length === 0 ||
        (!board.columns && (
          <div className="text-center relative my-auto w-full">
            <h2 className="text-2xl text-gray3 mb-8 font-bold">
              This board is empty. Create a new column to get started.
            </h2>
            <Button
              label="+ Add New Column"
              type="primary large"
              onClick={onCreateColumn}
            />
          </div>
        ))}
    </div>
  );
};

export default Tasks;
