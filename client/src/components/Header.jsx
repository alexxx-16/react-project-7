import Button from "./Button";

const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className="bg-yellow-500 py-2 px-3 flex justify-between text-2xl text-white shadow-md">
      <h1>Noted</h1>
      <Button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "Dark" : "Light"}
      </Button>
    </header>
  );
};

export default Header;
