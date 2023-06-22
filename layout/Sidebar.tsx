import BoardsList from "@/components/BoardsList";
import ToggleTheme from "@/components/ToggleTheme";
import { useBoard } from "@/hooks/useBoard";
import HideIcon from "@/icons/icon-hide.svg";

const Sidebar = () => {
  const boards = useBoard({ boards: [] });
  console.log("render sidebar");
  return (
    <div className="w-[260px] md:w-[300px] border-r border-r-gray1  dark:border-r-black1 relative  hidden sm:inline-block">
      <BoardsList boards={boards} />
      <div className="absolute bottom-12 w-full px-4 space-y-4">
        <ToggleTheme />
        <div className=" text-gray3 flex items-center gap-x-4 mx-auto  cursor-pointer">
          <HideIcon />
          <h3 className="">Hide Sidebar</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
