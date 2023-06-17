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

interface HomeProps {
  data: { boards: Board[] };
}
const Home: React.FC<HomeProps> = ({ data }) => {
  const [activeBoard, setActiveBoard] = useState(0);
  const [newBoardModalIsOpen, setNewBoardModalIsOpen] = useState(false);
  const [editBoardModalIsOpen, setEditBoardModalIsOpen] = useState(false);
  const [deleteBoardModalIsOpen, setDeleteBoardModalIsOpen] = useState(false);
  const [newTaskModalIsOpen, setNewTaskModalIsOpen] = useState(false);
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
  const handleAddNewTask = () => {};
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
              description="
            Are you sure you want to delete ...."
              onCancel={() => setDeleteBoardModalIsOpen(false)}
              onConfirm={handleConfirmDeleteBoard}
            />
          </Modal>
        )}

        {newTaskModalIsOpen && (
          <Modal onClickBackdrop={() => setNewTaskModalIsOpen(false)}>
            <CreateTask />
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
