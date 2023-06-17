import { useState, useRef } from "react";
import TextInput from "./UI/TextInput";
import CrossIcon from "@/icons/icon-cross.svg";
import Button from "./UI/Button";
import Board from "@/model/Board";
interface ImperativeInput {
  error: (message: string) => void;
}
interface CreateBoardProps {
  board?: Board;
  onCreateBoard: (board: Board) => void;
}
const CreateBoard: React.FC<CreateBoardProps> = ({ board, onCreateBoard }) => {
  const [columns, setColumns] = useState(
    board?.columns ? board.columns.map((el) => el.name) : ["", ""]
  );
  const [name, setName] = useState(board?.name || "");
  const inputRef = useRef<ImperativeInput>(null);

  const handleDeleteColumn = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  const onChangedName = (e: React.FormEvent<HTMLInputElement>) => {
    setName((e.target as HTMLInputElement).value);
  };

  const handleChangedColumn = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = (e.target as HTMLInputElement).value;
    setColumns(updatedColumns);
  };

  const onCreateNewBoard = () => {
    if (name?.trim().length === 0) {
      inputRef.current?.error("Can't be empty");
      return;
    }
    onCreateBoard({
      name,
      columns: columns
        .filter((el) => el.length > 0)
        .map((el) => {
          return { name: el, tasks: [] };
        }),
    });
  };
  return (
    <div className="modal-content space-y-6 ">
      <h2 className="text-black4 dark:text-white">{`${
        board ? "Edit Board" : "Add New Board"
      }`}</h2>
      <TextInput
        label={"Name"}
        placeholder={"e.g. Web Design"}
        name={"name"}
        value={name}
        onChange={onChangedName}
        ref={inputRef}
      />
      <div className="mt-2 space-y-2 ">
        <label htmlFor="title" className="block  text-gray3 text-sm font-bold">
          Columns
        </label>

        <ul className="space-y-2 ">
          {columns.map((col, index) => (
            <li className="flex items-center " key={index}>
              <TextInput
                placeholder={"e.g. TODO"}
                name={"name"}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChangedColumn(e, index)
                }
                value={columns[index]}
              />
              <div className="ml-4 cursor-pointer">
                <CrossIcon
                  onClick={(e: MouseEvent) => handleDeleteColumn(e, index)}
                />
              </div>
            </li>
          ))}
        </ul>

        <Button
          type={"small secondary"}
          classes="w-full"
          label="+ Add New Column"
          onClick={() => setColumns((prev) => [...prev, ""])}
        />
      </div>
      <Button
        label={`${board ? "Save Changes" : "Create New Board"}`}
        onClick={onCreateNewBoard}
        classes={"w-full"}
        type={"primary small"}
      />
    </div>
  );
};

export default CreateBoard;
