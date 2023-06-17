import React from "react";
import CreateBoard from "./CreateBoard";
import Board from "@/model/Board";
interface EditBoardProps {
  board: Board;
  onEditBoard: (board: Board) => void;
}
const EditBoard: React.FC<EditBoardProps> = ({ board, onEditBoard }) => {
  return <CreateBoard board={board} onCreateBoard={onEditBoard} />;
};

export default EditBoard;
