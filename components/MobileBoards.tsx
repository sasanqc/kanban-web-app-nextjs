import { useBoard } from "@/hooks/useBoard";
import BoardsList from "./BoardsList";
import ToggleTheme from "./ToggleTheme";

const MobileBoards = () => {
  const boards = useBoard({ boards: [] });
  return (
    <div className="bg-white dark:bg-black1 rounded-md pt-2 mx-7">
      <BoardsList boards={boards} />
      <div className="p-4">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default MobileBoards;
