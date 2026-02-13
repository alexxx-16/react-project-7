const Button = ({ onClick, children, type = "submit", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`outline-none bg-yellow-400 text-white py-1 px-2 rounded-md hover:bg-yellow-500 active:scale-95 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
