const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-zinc-400 dark:text-zinc-600 w-full text-center py-2 text-sm backdrop-blur-sm">
      <p className="text-xs font-light"> Noted App © {year}</p>
      <p className="text-[10px]">Version 1.0.3 • Southport, QLD</p>
    </footer>
  );
};

export default Footer;
