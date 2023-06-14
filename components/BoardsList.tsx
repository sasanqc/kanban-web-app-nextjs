import React from "react";
import BoardIcon from "@/icons/icon-board.svg";
const BoardsList = () => {
  return (
    <div>
      <h4 className="text-gray3 pl-8 mb-5 mt-4">all boards (3)</h4>
      <ul>
        <li className=" flex pl-8 py-4 gap-x-4 mr-6 items-center text-white bg-primary2 rounded-r-full ">
          <span>
            <BoardIcon />
          </span>
          <h3>Platform Launch</h3>
        </li>
        <li className=" flex pl-8 py-4 gap-x-4 mr-6 items-center text-gray3  rounded-r-full ">
          <span>
            <BoardIcon />
          </span>
          <h3>Marketing Plan</h3>
        </li>
        <li className=" flex pl-8 py-4 gap-x-4 mr-6 items-center text-gray3  rounded-r-full ">
          <span>
            <BoardIcon />
          </span>
          <h3>Roadmap</h3>
        </li>
        <li className=" flex pl-8 py-4 gap-x-4 mr-6 items-center text-primary2  rounded-r-full ">
          <span>
            <BoardIcon />
          </span>
          <h3>+ Create New Board</h3>
        </li>
      </ul>
    </div>
  );
};

export default BoardsList;
