export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-xl font-bold text-white">
          Abhilash Joga
        </h1>


        {/* Navigation Links */}
        <div className="hidden gap-8 text-gray-300 md:flex">

          <a href="#home" className="hover:text-blue-400">
            Home
          </a>

          <a href="#experience" className="hover:text-blue-400">
            Experience
          </a>

          <a href="#skills" className="hover:text-blue-400">
            Skills
          </a>

          <a href="#projects" className="hover:text-blue-400">
            Projects
          </a>

          <a href="#contact" className="hover:text-blue-400">
            Contact
          </a>

        </div>

      </div>

    </nav>
  );
}