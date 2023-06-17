import { useEffect, useRef, useState } from "react";
import Button from "../components/UI/Button";
import VerticalElipsisIcon from "@/icons/icon-vertical-ellipsis.svg";
import LogoDarkIcon from "@/icons/logo-dark.svg";
import LogoLightIcon from "@/icons/logo-light.svg";
import LogoMobileIcon from "@/icons/logo-mobile.svg";
import ChevronDownIcon from "@/icons/icon-chevron-down.svg";
import AddIcon from "@/icons/icon-add-task-mobile.svg";

interface HeaderProps {
  handleEditBoard: () => void;
  handleDeleteBoard: () => void;
  handleAddNewTask: () => void;
}

const Header: React.FC<HeaderProps> = ({
  handleEditBoard,
  handleDeleteBoard,
  handleAddNewTask,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuIsOpoen, setMenuIsOpen] = useState(false);

  const onEditBoard = () => {
    setMenuIsOpen(false);
    handleEditBoard();
  };

  const onDeleteBoard = () => {
    setMenuIsOpen(false);
    handleDeleteBoard();
  };

  const handleClickedOnBackdrop = (e: MouseEvent) => {
    if (menuRef?.current && !menuRef?.current?.contains(e.target as Node)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", handleClickedOnBackdrop);
    });
    return () => {
      window.removeEventListener("click", handleClickedOnBackdrop);
    };
  }, []);

  return (
    <div className="flex  items-center justify-between  ">
      {/* Desktop Header */}
      <div className="sm:flex  items-center justify-between  w-full hidden">
        <div className="px-8 py-8  border-r border-r-gray1 dark:border-r-black1 w-[260px] md:w-[300px] ">
          <LogoDarkIcon className="dark:hidden" />
          <LogoLightIcon className="dark:block hidden" />
        </div>
        <div className="px-7  flex flex-1 items-center justify-between  ">
          <h1 className="text-2xl md:text-3xl">Platform Launch</h1>
          <div className="flex items-center gap-6">
            <Button
              label="+ Add New Task"
              type="primary large"
              onClick={handleAddNewTask}
            />
            <div className="relative" ref={menuRef}>
              <VerticalElipsisIcon
                className="cursor-pointer"
                onClick={() => setMenuIsOpen(true)}
              />
              {menuIsOpoen && (
                <ul className="absolute text-base font-semibold bg-white right-0 mt-8 w-48 p-4 rounded-md space-y-4">
                  <li
                    className="text-gray3 cursor-pointer"
                    onClick={onEditBoard}
                  >
                    Edit Board
                  </li>
                  <li
                    className="text-destructive2 cursor-pointer"
                    onClick={onDeleteBoard}
                  >
                    Delete Board
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div className="sm:hidden  items-center justify-between  w-full flex px-4 py-5">
        <div className="flex">
          <LogoMobileIcon className="mr-4" />
          <div className="flex items-center gap-x-2">
            <h2 className="">Platform Launch</h2>
            <ChevronDownIcon />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button className="bg-primary2 py-4 px-6 rounded-full">
            <AddIcon />
          </button>
          <VerticalElipsisIcon className="mr-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
