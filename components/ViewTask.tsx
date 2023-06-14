import VerticalElipsisIcon from "@/icons/icon-vertical-ellipsis.svg";

import Select from "./UI/Select";
import Checkbox from "./UI/Checkbox";
const ViewTask = () => {
  return (
    <div className="modal-content">
      <div className="flex mb-6 items-center gap-x-6 ">
        <h2 className="text-black4 ">
          Research pricing points of various competitors and trial different
          business models
        </h2>
        <div>
          <VerticalElipsisIcon />
        </div>
      </div>
      <p className="text-base text-gray3 mb-6 ">
        We know what we&#39;re planning to build for version one. Now we need to
        finalise the first pricing model we&#39;ll use. Keep iterating the
        subtasks until we have a coherent proposition.
      </p>

      <div className="">
        <p className="text-sm font-bold text-gray3 mb-4">Subtasks (2 of 3)</p>
        <ul className="space-y-2  mb-6">
          <li>
            <Checkbox
              label={"Research competitor pricing and business models"}
              checked={true}
            />
          </li>

          <li>
            <Checkbox
              label={"Research competitor pricing and business models"}
              checked={true}
            />
          </li>

          <li>
            <Checkbox
              label={"Research competitor pricing and business models"}
              checked={true}
            />
          </li>
        </ul>
        <Select
          label={"Current Status"}
          items={[
            { label: "Todo", value: "todo" },
            { label: "Doing", value: "doing" },
            { label: "Done", value: "done" },
          ]}
          onChanged={() => {}}
        />
      </div>
    </div>
  );
};

export default ViewTask;
