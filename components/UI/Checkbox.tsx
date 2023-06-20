import React, { useState } from "react";
interface CheckBoxProps {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}
const Checkbox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <label className="flex p-3 bg-white2 dark:bg-black3 hover:bg-secondary2 hover:dark:bg-secondary2 rounded select-none cursor-pointer items-center transition-all">
      <input
        type="checkbox"
        className="cursor-pointer appearance-none w-4 h-4 bg-white dark:bg-black1  border rounded-sm border-gray1 dark:border-black1 mr-4 checked:bg-primary2 checked:dark:bg-primary2 checked:bg-no-repeat checked:bg-center  checked:bg-[url(/assets/images/icon-check.svg)]"
        checked={isChecked}
        onChange={() => {
          setIsChecked((prev) => !prev);
          onChange(!isChecked);
        }}
      />
      <span
        className={`text-sm font-bold ${
          isChecked ? "text-black line-through dark:text-white opacity-25" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
