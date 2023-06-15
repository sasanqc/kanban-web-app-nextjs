import { useState } from "react";
import TextInput from "./UI/TextInput";
import CrossIcon from "@/icons/icon-cross.svg";
import Button from "./UI/Button";

const CreateBoard = () => {
  const [columns, setColumns] = useState(["", ""]);
  const [name, setName] = useState("");

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

  const onCreateNewBoard = () => {};
  return (
    <div className="modal-content space-y-6 ">
      <h2 className="text-black4 dark:text-white">Add New Board</h2>
      <TextInput
        label={"Name"}
        placeholder={"e.g. Web Design"}
        name={"name"}
        value={name}
        onChange={onChangedName}
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
        label="Create New Board"
        onClick={onCreateNewBoard}
        classes={"w-full"}
        type={"primary small"}
      />
    </div>
  );
};

export default CreateBoard;
