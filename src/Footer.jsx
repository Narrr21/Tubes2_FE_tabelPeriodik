const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-2">
          <p className="text-cyan-400 font-semibold text-lg">Alchemy Explorer</p>
        </div>
        <div className="text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Alchemy Explorer. All rights reserved.
          </p>
        </div>
        <div className="mt-2 flex justify-center gap-4 text-sm text-cyan-500">
          <a href="#" className="hover:underline hover:text-cyan-300 transition">About</a>
          <a href="#" className="hover:underline hover:text-cyan-300 transition">Contact</a>
          <a href="#" className="hover:underline hover:text-cyan-300 transition">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;