import React from "react";
import BoardIcon from "@/icons/icon-board.svg";
import BoardListProps from "@/model/BoardListProps";
const BoardsList: React.FC<BoardListProps> = ({
  boards,
  activeBoard = 0,
  onChangedaActiveBoard,
  onAddNewBoard,
}) => {
  return (
    <div>
      <h4 className="text-gray3 pl-8 mb-5 mt-4">
        all boards ({boards.length})
      </h4>
      <ul>
        {boards.map((board, i) => (
          <li
            key={i}
            className={`flex pl-8 py-4 gap-x-4 mr-6 items-center   rounded-r-full cursor-pointer  ${
              activeBoard === i ? "bg-primary2 text-white" : "text-gray3"
            }`}
            onClick={() => onChangedaActiveBoard(i)}
          >
            <span>
              <BoardIcon />
            </span>
            <h3>{board.name}</h3>
          </li>
        ))}

        <li
          className=" flex pl-8 py-4 gap-x-4 mr-6 items-center text-primary2  rounded-r-full cursor-pointer"
          onClick={onAddNewBoard}
        >
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
