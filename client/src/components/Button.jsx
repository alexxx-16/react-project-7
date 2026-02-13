const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="outline-none bg-yellow-400 text-white py-1 px-2 rounded-md hover:bg-yellow-500 active:scale-95 transition-all duration-200"
    >
      {children}
    </button>
  );
};

export default Button;
