import { useEffect, useRef, useState } from "react";
import Button from "../components/UI/Button";
import VerticalElipsisIcon from "@/icons/icon-vertical-ellipsis.svg";
import LogoDarkIcon from "@/icons/logo-dark.svg";
import LogoLightIcon from "@/icons/logo-light.svg";
import LogoMobileIcon from "@/icons/logo-mobile.svg";
import ChevronDownIcon from "@/icons/icon-chevron-down.svg";
import AddIcon from "@/icons/icon-add-task-mobile.svg";
import Dropdown from "@/components/UI/Dropdown";

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
            <Dropdown
              items={[
                {
                  label: "Edit Board",
                  onClick: handleEditBoard,
                  className: "text-gray3",
                },
                {
                  label: "Delete Board",
                  onClick: handleDeleteBoard,
                  className: "text-destructive2",
                },
              ]}
            />
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
