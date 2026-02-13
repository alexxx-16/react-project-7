const Button = ({ onClick, children, type = "submit", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`outline-none bg-yellow-400 dark:bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-400 active:scale-95 transition-all duration-200 dark:shadow-[0_0_10px_rgba(234,179,8,0.2)] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
