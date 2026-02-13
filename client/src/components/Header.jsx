import lightIcon from "../assets/brightness-high.svg";
import darkIcon from "../assets/brightness-high-fill.svg";

const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className="bg-yellow-500 dark:bg-yellow-600 py-2 px-3 flex items-center justify-between text-2xl text-white shadow-md">
      <h1>Noted</h1>
      <button
        className="text-[20px] font"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <img src={darkIcon} alt="dark mode icon" className="w-5 h-5" />
        ) : (
          <img src={lightIcon} alt="light mode icon" className="w-5 h-5" />
        )}
      </button>
    </header>
  );
};

export default Header;
