import { useEffect } from "react";
import Button from "@/components/UI/Button";
import Checkbox from "@/components/UI/Checkbox";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import Tasks from "@/layout/Tasks";
import data from "@/data/data.json";
import { useState } from "react";
import Board from "@/model/Board";
import Modal from "@/components/UI/Modal";
import CreateBoard from "@/components/CreateBoard";
import Delete from "@/components/Delete";
import EditBoard from "@/components/EditBoard";
import CreateTask from "@/components/CreateTask";
import Task from "@/model/Task";
import ViewTask from "@/components/ViewTask";
interface HomeProps {
  data: { boards: Board[] };
}
const Home: React.FC<HomeProps> = ({ data }) => {
  const [activeBoard, setActiveBoard] = useState(0);
  const [newBoardModalIsOpen, setNewBoardModalIsOpen] = useState(false);
  const [editBoardModalIsOpen, setEditBoardModalIsOpen] = useState(false);
  const [deleteBoardModalIsOpen, setDeleteBoardModalIsOpen] = useState(false);
  const [deleteTaskModalIsOpen, setDeleteTaskModalIsOpen] = useState(false);
  const [newTaskModalIsOpen, setNewTaskModalIsOpen] = useState(false);
  const [openedTask, setOpenedTask] = useState<{
    taskIndex: number;
    colIndex: number;
  }>();
  const [boards, setBoards] = useState(data.boards);

  const handleAddNewBoard = () => {
    setNewBoardModalIsOpen(true);
  };

  const handleCreateBoard = (board: Board) => {
    setBoards([...boards, board]);
    setActiveBoard(boards.length);
    setNewBoardModalIsOpen(false);
  };

  const handleChangeActiveBoard = (active: number) => {
    setActiveBoard(active);
  };

  const handleSaveEditBoard = (board: Board) => {
    const updatedBoards = [...boards];
    const boardIndex = updatedBoards.findIndex((el) => el.name === board.name);
    if (boardIndex > -1) {
      updatedBoards[boardIndex] = board;
    }
    setBoards(updatedBoards);
    setEditBoardModalIsOpen(false);
  };

  const handleConfirmDeleteBoard = () => {
    setDeleteBoardModalIsOpen(false);
    const updatedBoards = [...boards];
    updatedBoards.splice(activeBoard, 1);
    setBoards(updatedBoards);
    setActiveBoard(0);
  };

  const handleAddNewTask = (task: Task) => {
    const status = task.status;
    const updatedBoards = [...boards];
    const columnIndex = updatedBoards[activeBoard].columns.findIndex(
      (el) => el.name === status
    );

    if (columnIndex > -1) {
      updatedBoards[activeBoard].columns[columnIndex].tasks.push(task);
      setBoards(updatedBoards);
    }
    setNewTaskModalIsOpen(false);
  };

  const handleClickedTask = (colIndex: number, taskIndex: number) => {
    setOpenedTask({ taskIndex, colIndex });
  };

  const handleChangeTask = (task: Task) => {
    if (openedTask) {
      const updatedBoards = [...boards];
      updatedBoards[activeBoard].columns[openedTask.colIndex].tasks[
        openedTask.taskIndex
      ] = task;
      setBoards(updatedBoards);
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

      //add the task to target column. firts find it's index
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
      setBoards(updatedBoards);
    }
  };
  const handleDeleteTask = () => {
    const updatedBoards = [...boards];
    if (openedTask) {
      updatedBoards[activeBoard]?.columns[openedTask.colIndex]?.tasks?.splice(
        openedTask.taskIndex,
        1
      );

      setBoards(updatedBoards);
    }
    setOpenedTask(undefined);
    setDeleteTaskModalIsOpen(false);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.add(localStorage.getItem("theme") || "light");
    return () => {};
  }, []);

  return (
    <main className="text-black dark:text-white bg-white dark:bg-black2 w-screen h-screen flex">
      <div className="flex flex-col overflow-hidden flex-1">
        <Header
          handleDeleteBoard={() => setDeleteBoardModalIsOpen(true)}
          handleEditBoard={() => setEditBoardModalIsOpen(true)}
          handleAddNewTask={() => setNewTaskModalIsOpen(true)}
        />
        <div className="flex-1 flex overflow-auto w-full">
          <Sidebar
            boards={boards.map((item: Board) => {
              return { name: item.name };
            })}
            onAddNewBoard={handleAddNewBoard}
            onChangedaActiveBoard={handleChangeActiveBoard}
            activeBoard={activeBoard}
          />
          <Tasks
            board={boards[activeBoard]}
            onCreateColumn={() => setEditBoardModalIsOpen(true)}
            onClickedTask={handleClickedTask}
          />
        </div>

        {newBoardModalIsOpen && (
          <Modal onClickBackdrop={() => setNewBoardModalIsOpen(false)}>
            <CreateBoard onCreateBoard={handleCreateBoard} />
          </Modal>
        )}

        {editBoardModalIsOpen && (
          <Modal onClickBackdrop={() => setEditBoardModalIsOpen(false)}>
            <EditBoard
              board={boards?.[activeBoard]}
              onEditBoard={handleSaveEditBoard}
            />
          </Modal>
        )}

        {deleteBoardModalIsOpen && (
          <Modal onClickBackdrop={() => setDeleteBoardModalIsOpen(false)}>
            <Delete
              title="Delete this board?"
              description={`Are you sure you want to delete the ‘${boards[activeBoard].name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
              onCancel={() => setDeleteBoardModalIsOpen(false)}
              onConfirm={handleConfirmDeleteBoard}
            />
          </Modal>
        )}

        {newTaskModalIsOpen && (
          <Modal onClickBackdrop={() => setNewTaskModalIsOpen(false)}>
            <CreateTask
              columns={boards[activeBoard].columns.map((col) => {
                return { label: col.name, value: col.name };
              })}
              onCreateTask={handleAddNewTask}
            />
          </Modal>
        )}
        {openedTask && !deleteTaskModalIsOpen && (
          <Modal onClickBackdrop={() => setOpenedTask(undefined)}>
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
              onDeleteTask={() => setDeleteTaskModalIsOpen(true)}
            />
          </Modal>
        )}
        {openedTask && deleteTaskModalIsOpen && (
          <Modal onClickBackdrop={() => setOpenedTask(undefined)}>
            <Delete
              title="Delete this task?"
              description={`Are you sure you want to delete the ‘${
                boards[activeBoard].columns[openedTask.colIndex].tasks[
                  openedTask.taskIndex
                ].title
              }’ task and its subtasks? This action cannot be reversed.`}
              onCancel={() => {
                setDeleteTaskModalIsOpen(false);
                setOpenedTask(undefined);
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
  return { props: { data } };
}
