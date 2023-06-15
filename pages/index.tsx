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
interface HomeProps {
  data: { boards: Board[] };
}
const Home: React.FC<HomeProps> = ({ data }) => {
  const [activeBoard, setActiveBoard] = useState(0);
  const [newBoardModalIsOpen, setNewBoardModalIsOpen] = useState(false);
  const handleAddNewBoard = () => {
    setNewBoardModalIsOpen(true);
  };
  const handleChangeActiveBoard = (active: number) => {
    setActiveBoard(active);
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
            boards={data.boards.map((item: Board) => {
              return { name: item.name };
            })}
            onAddNewBoard={handleAddNewBoard}
            onChangedaActiveBoard={handleChangeActiveBoard}
            activeBoard={activeBoard}
          />
          <Tasks board={data.boards[activeBoard]} />
        </div>
        {newBoardModalIsOpen && (
          <Modal onClickBackdrop={() => setNewBoardModalIsOpen(false)}>
            <CreateBoard />
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
