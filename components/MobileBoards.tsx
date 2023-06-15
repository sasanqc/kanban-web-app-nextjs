import BoardsList from "./BoardsList";
import ToggleTheme from "./ToggleTheme";

const MobileBoards = () => {
  return (
    <div className="bg-white rounded-md pt-2 mx-7">
      {/* <BoardsList /> */}
      <div className="p-4">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default MobileBoards;
