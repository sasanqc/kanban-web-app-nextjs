import { useEffect } from "react";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import Tasks from "@/layout/Tasks";
import Board from "@/model/Board";
import { getData } from "@/utils/boards-fs";
import { useBoard } from "@/hooks/useBoard";

import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectModal,
  selectTask,
  setActiveModal,
  setOpenedTask,
} from "@/store/uiSlice";
import CreateBoard from "@/components/CreateBoard";
import CreateTask from "@/components/CreateTask";
import Delete from "@/components/Delete";
import EditBoard from "@/components/EditBoard";
import Modal from "@/components/UI/Modal";
import ViewTask from "@/components/ViewTask";
import { useCreateBoard } from "@/hooks/useCreateBoard";
import { useDeleteBoard } from "@/hooks/useDeleteBoard";
import { useUpdateBoard } from "@/hooks/useUpdateBoard";

import ModalEnum from "@/model/ModalEnum";
import Task from "@/model/Task";
interface HomeProps {
  prefetchedData: { boards: Board[] };
}
const Home: React.FC<HomeProps> = ({ prefetchedData = { boards: [] } }) => {
  const boards = useBoard(prefetchedData);
  const activeBoard = useSelector(selectBoard);

  const activeModal = useSelector(selectModal);
  const openedTask = useSelector(selectTask);

  //remote states

  const { isDeleting, deleteBoard } = useDeleteBoard();
  const { isCreating, createBoard } = useCreateBoard();
  const { isUpdating, updateBoard } = useUpdateBoard();

  const dispatch = useDispatch();

  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.add(localStorage.getItem("theme") || "light");
    return () => {};
  }, []);
  console.log("render home page");

  const handleAddNewTask = (task: Task) => {
    const status = task.status;
    const columnIndex = boards[activeBoard].columns.findIndex(
      (el: { name: string; tasks: Task[] }) => el.name === status
    );

    if (columnIndex > -1) {
      const board = { ...boards[activeBoard] };
      board.columns[columnIndex].tasks.push(task);
      updateBoard({ id: activeBoard.toString(), board });
    }
  };

  const handleDeleteTask = () => {
    const board = { ...boards[activeBoard] };
    if (openedTask) {
      board?.columns[openedTask.colIndex]?.tasks?.splice(
        openedTask.taskIndex,
        1
      );
      updateBoard({ id: activeBoard.toString(), board });
      dispatch(setOpenedTask(undefined));
    }
  };

  const handleChangeTask = (task: Task) => {
    const board = { ...boards[activeBoard] };
    if (openedTask) {
      board.columns[openedTask.colIndex].tasks[openedTask.taskIndex] = task;
      updateBoard({ id: activeBoard.toString(), board });
    }
  };

  const handleChangeTaskStatus = (status: string) => {
    const board = { ...boards[activeBoard] };
    if (openedTask) {
      //first of all get a copy of the task.
      const updatedTask =
        board.columns[openedTask.colIndex].tasks[openedTask.taskIndex];
      updatedTask.status = status;

      //delete task from current column
      board.columns[openedTask.colIndex].tasks.splice(openedTask.taskIndex, 1);

      //add the task to target column. first find it's index
      const targetColIndex = board.columns.findIndex(
        (el: { name: string; tasks: Task[] }) => el.name === status
      );

      if (targetColIndex > -1) {
        board.columns[targetColIndex].tasks.push(updatedTask);
      }
      const openedTaskOld = { ...openedTask };

      dispatch(
        setOpenedTask({
          taskIndex:
            boards[activeBoard].columns[targetColIndex].tasks.length - 1,
          colIndex: targetColIndex,
        })
      );
      //finally update global state of boards
      updateBoard(
        { id: activeBoard.toString(), board },
        {
          onError: () => {
            dispatch(setOpenedTask(openedTaskOld));
          },
        }
      );
    }
  };

  return (
    <main className="text-black dark:text-white bg-white dark:bg-black2 w-screen h-screen flex">
      <div className="flex flex-col overflow-hidden flex-1">
        <Header />
        <div className="flex-1 flex overflow-auto w-full">
          <Sidebar />
          <Tasks board={boards[activeBoard]} />
        </div>
      </div>
      {activeModal === ModalEnum.CREATE_BOARD && (
        <Modal onClickBackdrop={() => dispatch(setActiveModal(undefined))}>
          <CreateBoard onCreateBoard={(board: Board) => createBoard(board)} />
        </Modal>
      )}

      {activeModal === ModalEnum.EDIT_BOARD && (
        <Modal onClickBackdrop={() => dispatch(setActiveModal(undefined))}>
          <EditBoard
            board={boards?.[activeBoard]}
            onEditBoard={(board: Board) =>
              updateBoard({ id: activeBoard.toString(), board })
            }
          />
        </Modal>
      )}

      {activeModal === ModalEnum.DELETE_BOARD && (
        <Modal onClickBackdrop={() => dispatch(setActiveModal(undefined))}>
          <Delete
            title="Delete this board?"
            description={`Are you sure you want to delete the ‘${boards[activeBoard].name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
            onCancel={() => dispatch(setActiveModal(undefined))}
            onConfirm={() => deleteBoard(activeBoard.toString())}
          />
        </Modal>
      )}

      {activeModal === ModalEnum.CREATE_TASK && (
        <Modal
          onClickBackdrop={() => {
            dispatch(setActiveModal(undefined));
          }}
        >
          <CreateTask
            columns={boards[activeBoard].columns.map(
              (col: { name: string; tasks: Task[] }) => {
                return { label: col.name, value: col.name };
              }
            )}
            onCreateTask={handleAddNewTask}
          />
        </Modal>
      )}

      {openedTask && !(activeModal === ModalEnum.DELETE_TASK) && (
        <Modal
          onClickBackdrop={() => {
            dispatch(setActiveModal(undefined));
            dispatch(setOpenedTask(undefined));
          }}
        >
          <ViewTask
            task={
              boards[activeBoard].columns[openedTask.colIndex].tasks[
                openedTask.taskIndex
              ]
            }
            columns={boards[activeBoard].columns.map(
              (col: { name: string; tasks: Task[] }) => {
                return { label: col.name, value: col.name };
              }
            )}
            onChangeTask={handleChangeTask}
            handleChangeTaskStatus={handleChangeTaskStatus}
            onDeleteTask={() => dispatch(setActiveModal(ModalEnum.DELETE_TASK))}
          />
        </Modal>
      )}

      {openedTask && activeModal === ModalEnum.DELETE_TASK && (
        <Modal onClickBackdrop={() => dispatch(setOpenedTask(undefined))}>
          <Delete
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${
              boards[activeBoard].columns[openedTask.colIndex].tasks[
                openedTask.taskIndex
              ].title
            }’ task and its subtasks? This action cannot be reversed.`}
            onCancel={() => {
              dispatch(setActiveModal(undefined));
              dispatch(setOpenedTask(undefined));
            }}
            onConfirm={handleDeleteTask}
          />
        </Modal>
      )}
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const prefetchedData = getData();
  return { props: { prefetchedData } };
}
