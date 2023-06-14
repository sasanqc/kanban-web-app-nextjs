import React, { useState } from "react";
interface CheckBoxProps {
  checked: boolean;
  label: string;
}
const Checkbox: React.FC<CheckBoxProps> = ({ label, checked }) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <label className="flex p-3 bg-white2 hover:bg-secondary2 rounded select-none cursor-pointer items-center">
      <input
        type="checkbox"
        className="cursor-pointer appearance-none w-4 h-4 bg-white border rounded-sm border-gray1 mr-4 checked:bg-primary2 checked:bg-no-repeat checked:bg-center  checked:bg-[url(/assets/images/icon-check.svg)]"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <span
        className={`text-sm font-bold ${
          isChecked ? "text-[#00010c80] line-through" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
