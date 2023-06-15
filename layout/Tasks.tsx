import TaskColumn from "@/components/TaskColumn";
import Button from "@/components/UI/Button";
import Board from "@/model/Board";
interface TasksProps {
  board: Board;
}
const Tasks: React.FC<TasksProps> = ({ board }) => {
  return (
    <div className="flex-1 h-full  p-6 flex gap-6 overflow-auto flex-nowrap bg-white2 dark:bg-black3 border-t border-t-gray1 dark:border-t-black1">
      {board.columns.map((col, index) => (
        <TaskColumn col={col} key={index} />
      ))}
      <div className="bg-gray1 dark:bg-black2 text-center mt-10 flex rounded-md">
        <h1 className="text-gray3 w-[280px] my-auto">+ New Column</h1>
      </div>
      {/* <div className="text-center relative my-auto w-full">
        <h2 className="text-2xl text-gray3 mb-8 font-bold">
          This board is empty. Create a new column to get started.
        </h2>
        <Button label="+ Add New Column" type="primary large" />
      </div> */}
    </div>
  );
};

export default Tasks;
