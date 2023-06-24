import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BoardIcon from "@/icons/icon-board.svg";
import BoardListProps from "@/model/BoardListProps";

import { selectBoard, setActiveBoard, setActiveModal } from "@/store/uiSlice";
import ModalEnum from "@/model/ModalEnum";
const BoardsList: React.FC<BoardListProps> = ({ boards }) => {
  const activeBoard = useSelector(selectBoard);
  const dispatch = useDispatch();
  return (
    <div>
      <h4 className="text-gray3 pl-8 mb-5 mt-4">
        all boards ({boards.length})
      </h4>
      <ul>
        {boards.map((board, i) => (
          <li
            key={i}
            className={`flex pl-8 py-4 gap-x-4 mr-6 items-center   rounded-r-full cursor-pointer animate-opacity ${
              activeBoard === i
                ? "bg-primary2 text-white animate-opacityAnimate"
                : "text-gray3"
            }`}
            onClick={() => {
              dispatch(setActiveBoard(i));
              dispatch(setActiveModal(undefined));
            }}
          >
            <span>
              <BoardIcon />
            </span>
            <h3>{board.name}</h3>
          </li>
        ))}

        <li
          className=" flex pl-8 py-4 gap-x-4 mr-6 items-center text-primary2  rounded-r-full cursor-pointer"
          onClick={() => dispatch(setActiveModal(ModalEnum.CREATE_BOARD))}
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
