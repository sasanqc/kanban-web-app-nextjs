import React, { useRef, useState, useEffect } from "react";
import VerticalElipsisIcon from "@/icons/icon-vertical-ellipsis.svg";
interface DropdownProps {
  items: { label: string; className: string; onClick: () => void }[];
  disable?: boolean;
}
const Dropdown: React.FC<DropdownProps> = ({ items, disable = false }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuIsOpoen, setMenuIsOpen] = useState(false);
  const handleClickedOnBackdrop = (e: MouseEvent) => {
    if (menuRef?.current && !menuRef?.current?.contains(e.target as Node)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", handleClickedOnBackdrop);
    });
    return () => {
      window.removeEventListener("click", handleClickedOnBackdrop);
    };
  }, []);
  return (
    <div className="relative z-30" ref={menuRef}>
      <div
        className={`${
          disable ? "cursor-not-allowed" : "cursor-pointer"
        } p-2 dark:hover:bg-black1  hover:bg-gray1 rounded-md transition`}
        onClick={() => {
          if (disable) return;
          setMenuIsOpen(true);
        }}
      >
        <VerticalElipsisIcon />
      </div>

      {menuIsOpoen && (
        <ul className="absolute text-base font-semibold bg-white dark:bg-black1 right-0 mt-4 w-48 p-4 rounded-md space-y-4">
          {items.map((el, index) => {
            return (
              <li
                key={index}
                className={`cursor-pointer ${el.className}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuIsOpen(false);
                  el.onClick();
                }}
              >
                {el.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
