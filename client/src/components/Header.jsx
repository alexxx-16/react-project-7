import lightIcon from "../assets/brightness-high.svg";
import darkIcon from "../assets/brightness-high-fill.svg";
import trashIcon from "../assets/trash3.svg";
import UserSelector from "./UserSelector";

const Header = ({
  isDarkMode,
  setIsDarkMode,
  currentUserId,
  setCurrentUserId,
  users,
  onAddUser,
  onDeleteUser,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <header className="bg-yellow-500 dark:bg-yellow-600 py-2 px-4 flex items-center justify-between text-2xl text-white shadow-md">
      <div className="flex gap-2 items-center">
        <h1 className="mr-2">Noted</h1>
        <UserSelector
          users={users}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          onAddUser={onAddUser}
        />
        <button onClick={onDeleteUser} title="Delete Current User">
          <img
            src={trashIcon}
            alt="delete button icon"
            className="min-w-4.5 h-4.5 cursor-pointer shrink-0"
          />
        </button>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-lg dark:text-zinc-100 border-b-2 bg-transparent w-24 sm:w-32 md:w-48 border-zinc-100 dark:border-zinc-300 outline-none"
        />
        <button
          className="text-[20px] font"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <img
            src={isDarkMode ? darkIcon : lightIcon}
            alt="colour mode icon"
            className="min-w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
