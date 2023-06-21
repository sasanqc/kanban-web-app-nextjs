import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import Tasks from "@/layout/Tasks";

import Board from "@/model/Board";
import Modal from "@/components/UI/Modal";
import CreateBoard from "@/components/CreateBoard";
import Delete from "@/components/Delete";
import EditBoard from "@/components/EditBoard";
import CreateTask from "@/components/CreateTask";
import Task from "@/model/Task";
import ViewTask from "@/components/ViewTask";
import {
  selectBoard,
  selectModal,
  selectTask,
  setActiveBoard,
  setActiveModal,
  setOpenedTask,
} from "@/store/uiSlice";

import ModalEnum from "@/model/ModalEnum";
import {
  createBoard,
  deleteBoard,
  editBoard,
  getBoards,
} from "@/services/apiBoards";

import { getData } from "@/utils/boards-fs";
interface HomeProps {
  prefetchedData: { boards: Board[] };
}
const Home: React.FC<HomeProps> = ({ prefetchedData }) => {
  const activeBoard = useSelector(selectBoard);
  const activeModal = useSelector(selectModal);
  const openedTask = useSelector(selectTask);

  const dispatch = useDispatch();

  const {
    isLoading,
    data: { boards },
    error,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    initialData: prefetchedData,
  });

  const handleCreateBoard = (board: Board) => {
    create(board);
  };

  const { mutate: create } = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] }).then(() => {
        dispatch(setActiveBoard(boards.length));
      });
      dispatch(setActiveModal(undefined));
    },
  });

  const handleSaveEditBoard = (board: Board) => {
    update({ id: activeBoard.toString(), board });
  };

  const queryClient = useQueryClient();

  const { isLoading: loading, mutate } = useMutation({
    mutationFn: (id: string) => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      dispatch(setActiveModal(undefined));
      dispatch(setActiveBoard(0));
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: ({ id, board }: { id: string; board: Board }) =>
      editBoard(id, board),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      dispatch(setActiveModal(undefined));
    },
  });

  const handleConfirmDeleteBoard = () => {
    mutate(activeBoard.toString());
  };

  const handleAddNewTask = (task: Task) => {
    const status = task.status;
    const updatedBoards = [...boards];
    const columnIndex = updatedBoards[activeBoard].columns.findIndex(
      (el) => el.name === status
    );

    if (columnIndex > -1) {
      updatedBoards[activeBoard].columns[columnIndex].tasks.push(task);
      //setBoards(updatedBoards);
    }
    //setNewTaskModalIsOpen(false);
  };

  const handleClickedTask = (colIndex: number, taskIndex: number) => {
    //setOpenedTask({ taskIndex, colIndex });
    dispatch(setOpenedTask({ taskIndex, colIndex }));
  };

  const handleChangeTask = (task: Task) => {
    if (openedTask) {
      const updatedBoards = [...boards];
      updatedBoards[activeBoard].columns[openedTask.colIndex].tasks[
        openedTask.taskIndex
      ] = task;
      //setBoards(updatedBoards);
    }
  };

  const handleChangeTaskStatus = (status: string) => {
    if (openedTask) {
      const updatedBoards = [...boards];
      //first of all get a copy of the task.
      const updatedTask =
        updatedBoards[activeBoard].columns[openedTask.colIndex].tasks[
          openedTask.taskIndex
        ];
      updatedTask.status = status;

      //delete task from current column
      updatedBoards[activeBoard].columns[openedTask.colIndex].tasks.splice(
        openedTask.taskIndex,
        1
      );

      //add the task to target column. first find it's index
      const targetColIndex = updatedBoards[activeBoard].columns.findIndex(
        (el) => el.name === status
      );

      if (targetColIndex > -1) {
        updatedBoards[activeBoard].columns[targetColIndex].tasks.push(
          updatedTask
        );
      }

      //update indexes(task and column) of current opened task;
      setOpenedTask({
        taskIndex:
          updatedBoards[activeBoard].columns[targetColIndex].tasks.length - 1,
        colIndex: targetColIndex,
      });

      //finally update global state of boards
      //setBoards(updatedBoards);
    }
  };
  const handleDeleteTask = () => {
    const updatedBoards = [...boards];
    if (openedTask) {
      updatedBoards[activeBoard]?.columns[openedTask.colIndex]?.tasks?.splice(
        openedTask.taskIndex,
        1
      );

      //setBoards(updatedBoards);
    }
    setOpenedTask(undefined);
    //setDeleteTaskModalIsOpen(false);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.add(localStorage.getItem("theme") || "light");
    return () => {};
  }, []);

  return (
    <main className="text-black dark:text-white bg-white dark:bg-black2 w-screen h-screen flex">
      <div className="flex flex-col overflow-hidden flex-1">
        <Header />
        <div className="flex-1 flex overflow-auto w-full">
          <Sidebar
            boards={boards.map((item: Board) => {
              return { name: item.name };
            })}
          />
          <Tasks
            board={boards[activeBoard]}
            onCreateColumn={() =>
              dispatch(setActiveModal(ModalEnum.EDIT_BOARD))
            }
            onClickedTask={handleClickedTask}
          />
        </div>

        {activeModal === ModalEnum.CREATE_BOARD && (
          <Modal onClickBackdrop={() => dispatch(setActiveModal(undefined))}>
            <CreateBoard onCreateBoard={handleCreateBoard} />
          </Modal>
        )}

        {activeModal === ModalEnum.EDIT_BOARD && (
          <Modal onClickBackdrop={() => dispatch(setActiveModal(undefined))}>
            <EditBoard
              board={boards?.[activeBoard]}
              onEditBoard={handleSaveEditBoard}
            />
          </Modal>
        )}

        {activeModal === ModalEnum.DELETE_BOARD && (
          <Modal onClickBackdrop={() => dispatch(setActiveModal(undefined))}>
            <Delete
              title="Delete this board?"
              description={`Are you sure you want to delete the ‘${boards[activeBoard].name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
              onCancel={() => dispatch(setActiveModal(undefined))}
              onConfirm={handleConfirmDeleteBoard}
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
              columns={boards[activeBoard].columns.map((col) => {
                return { label: col.name, value: col.name };
              })}
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
              columns={boards[activeBoard].columns.map((col) => {
                return { label: col.name, value: col.name };
              })}
              onChangeTask={handleChangeTask}
              handleChangeTaskStatus={handleChangeTaskStatus}
              onDeleteTask={() =>
                dispatch(setActiveModal(ModalEnum.DELETE_TASK))
              }
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
      </div>
    </main>
  );
};

export default Home;
export async function getStaticProps() {
  const prefetchedData = getData();
  return { props: { prefetchedData } };
}
