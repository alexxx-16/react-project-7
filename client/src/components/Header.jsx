import lightIcon from "../assets/brightness-high.svg";
import darkIcon from "../assets/brightness-high-fill.svg";
import UserSelector from "./UserSelector";

const Header = ({
  isDarkMode,
  setIsDarkMode,
  currentUserId,
  setCurrentUserId,
  users,
  onAddUser,
}) => {
  return (
    <header className="bg-yellow-500 dark:bg-yellow-600 py-2 px-3 flex items-center justify-between text-2xl text-white shadow-md">
      <div className="flex gap-4 items-center">
        <h1>Noted</h1>
        <UserSelector
          users={users}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          onAddUser={onAddUser}
        />
      </div>

      <button
        className="text-[20px] font"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        <img
          src={isDarkMode ? darkIcon : lightIcon}
          alt="colour mode icon"
          className="w-6 h-6"
        />
      </button>
    </header>
  );
};

export default Header;
