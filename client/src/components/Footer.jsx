const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-zinc-400 w-full text-center py-2 text-sm backdrop-blur-sm">
      Copyright © {year}
    </footer>
  );
};

export default Footer;
