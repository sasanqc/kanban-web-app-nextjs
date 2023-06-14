import TextInput from "./UI/TextInput";
import CrossIcon from "@/icons/icon-cross.svg";
import Button from "./UI/Button";
import Select from "./UI/Select";
const CreateBoard = () => {
  return (
    <div className="modal-content space-y-6 ">
      <h2 className="text-black4 ">Add New Board</h2>

      <TextInput label={"Name"} placeholder={"e.g. Web Design"} name={"name"} />
      <div className="mt-2 space-y-3 ">
        <label htmlFor="title" className="block  text-gray3 text-sm font-bold">
          Columns
        </label>
        <div className="flex items-center">
          <Select
            items={[
              { label: "Todo", value: "todo" },
              { label: "Doing", value: "doing" },
              { label: "Done", value: "done" },
            ]}
            onChanged={() => {}}
          />
          <div className="ml-4 cursor-pointer">
            <CrossIcon />
          </div>
        </div>
        <div className="flex items-center ">
          <Select
            items={[
              { label: "Todo", value: "todo" },
              { label: "Doing", value: "doing" },
              { label: "Done", value: "done" },
            ]}
            onChanged={() => {}}
          />
          <div className="ml-4 cursor-pointer">
            <CrossIcon />
          </div>
        </div>
        <Button
          type={"small secondary"}
          classes="w-full"
          label="+ Add New Column"
          onClick={() => {}}
        />
      </div>
      <Button
        label="Create New Board"
        onClick={() => {}}
        classes={"w-full"}
        type={"primary small"}
      />
    </div>
  );
};

export default CreateBoard;
