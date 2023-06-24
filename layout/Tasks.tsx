import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskColumn from "@/components/TaskColumn";
import Button from "@/components/UI/Button";
import { useBoard } from "@/hooks/useBoard";
import ModalEnum from "@/model/ModalEnum";
import Task from "@/model/Task";
import { selectBoard, setActiveModal, setOpenedTask } from "@/store/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Tasks: React.FC<{
  onDragEnd: (result: DropResult) => void;
}> = ({ onDragEnd }) => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectBoard);
  const board = useBoard({ boards: [] })?.[activeBoard];
  const onClickedTask = (colIndex: number, taskIndex: number) => {
    dispatch(setActiveModal(ModalEnum.VIEW_TASK));
    dispatch(setOpenedTask({ taskIndex, colIndex }));
  };

  return (
    <div className="flex-1 h-full  p-6 flex gap-6 overflow-auto flex-nowrap bg-white2 dark:bg-black3 border-t border-t-gray1 dark:border-t-black1">
      <DragDropContext onDragEnd={onDragEnd}>
        {board?.columns?.map(
          (col: { name: string; tasks: Task[] }, index: number) => (
            <TaskColumn
              col={col}
              id={index.toString()}
              key={index}
              onClickedTask={(taskIndex: number) =>
                onClickedTask(index, taskIndex)
              }
            />
          )
        )}
      </DragDropContext>

      {board?.columns?.length > 0 && (
        <div className="bg-gray1 dark:bg-black2 text-center mt-10 flex rounded-md">
          <h1
            onClick={() => dispatch(setActiveModal(ModalEnum.EDIT_BOARD))}
            className="text-gray3 w-[280px] my-auto cursor-pointer hover:text-gray2 transition-colors"
          >
            + New Column
          </h1>
        </div>
      )}
      {board?.columns?.length === 0 && (
        <div className="text-center relative my-auto w-full">
          <h2 className="text-2xl text-gray3 mb-8 font-bold">
            This board is empty. Create a new column to get started.
          </h2>
          <Button
            label="+ Add New Column"
            type="primary large"
            onClick={() => dispatch(setActiveModal(ModalEnum.EDIT_BOARD))}
          />
        </div>
      )}
    </div>
  );
};

export default Tasks;
