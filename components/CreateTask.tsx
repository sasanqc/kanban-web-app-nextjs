import Button from "./UI/Button";
import CrossIcon from "@/icons/icon-cross.svg";
import Select from "./UI/Select";
import TextInput from "./UI/TextInput";
const CreateTask = () => {
  return (
    <div className="modal-content">
      <h2 className="text-black4 mb-6">Add New Task</h2>
      <div className="space-y-6">
        <TextInput
          label={"Title"}
          placeholder={"e.g. Take coffee break"}
          name={"title"}
        />
        <div className="">
          <label
            htmlFor="description"
            className="block  text-gray3 text-sm font-bold"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              name="description"
              className="min-h-[120px] resize-none w-full border text-base border-gray2 focus:border-primary2 py-2 px-4 rounded-md outline-none  placeholder:text-black placeholder:opacity-25 focus:ring-0"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              required
            />
          </div>
        </div>
        <div className="space-y-6">
          <label
            htmlFor="title"
            className="block  text-gray3 text-sm font-bold"
          >
            Subtasks
          </label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="text"
                name="subtask"
                className=""
                placeholder="e.g. Make coffee"
                required
              />
              <div className="ml-4">
                <CrossIcon />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                name="subtask"
                className=""
                placeholder="e.g. Drink coffee & smile"
                required
              />
              <div className="ml-4">
                <CrossIcon />
              </div>
            </div>
            <Button
              type={"small secondary"}
              classes="w-full"
              label="+ Add New Subtask"
              onClick={() => {}}
            />
          </div>

          <Select
            label={"Status"}
            items={[
              { label: "Todo", value: "todo" },
              { label: "Doing", value: "doing" },
              { label: "Done", value: "done" },
            ]}
            onChanged={() => {}}
          />

          <Button
            label="Create Task"
            onClick={() => {}}
            classes={"w-full"}
            type={"primary small"}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
