import { useState, useRef, useEffect, useCallback } from "react";
import ChevronDownIcon from "@/icons/icon-chevron-down.svg";

interface SelectProps {
  onChanged: (value: string) => void;
  label?: string;
  items: { label: string; value: string }[];
  initialItem?: number;
}

const Select: React.FC<SelectProps> = ({
  items,
  label,
  onChanged,
  initialItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(items?.[initialItem || 0]?.value);

  const handleClickDropDown = () => {
    setIsOpen(true);
  };

  const handleSelectedItem = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    const value = (e.target as HTMLElement).getAttribute("data-value");

    if (value) {
      setIsOpen(false);
      setSelected(value);
      onChanged(value);
    }
  };
  const handleClickOnWindow = useCallback((e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClickOnWindow, {
      capture: false,
    });
    return () => {
      window.removeEventListener("click", handleClickOnWindow);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropDownRef}>
      {label && <p className="text-sm font-bold text-gray3 mb-2">{label}</p>}
      <div
        tabIndex={0}
        className="border rounded-md border-gray2 cursor-pointer focus:border-primary2 px-4 py-2 flex items-center justify-between"
        onClick={handleClickDropDown}
      >
        <p className="text-base">
          {items?.find((el) => el.value === selected)?.label}
        </p>
        <ChevronDownIcon />
      </div>
      {isOpen && (
        <ul
          className="bg-white text-base dark:bg-black3 p-4 text-gray3 absolute mt-2 rounded-lg w-full space-y-2 z-20"
          onClick={handleSelectedItem}
        >
          {items.map((el) => (
            <li key={el.value}>
              <p className="cursor-pointer select-none" data-value={el.value}>
                {el.label}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
