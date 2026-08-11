export default function Footer() {
  return (
    <footer className="border-t border-blue-400/10 bg-slate-950 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        {/* Copyright */}
        <p className="text-center text-sm text-gray-500 md:text-left">
          © {new Date().getFullYear()} Abhilash Joga. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          <a
            href="https://www.linkedin.com/in/jogaabhilash/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-cyan-300"
          >
            LinkedIn
          </a>

          <a
            href="mailto:abhilashjoga1028@gmail.com"
            className="text-gray-400 transition hover:text-cyan-300"
          >
            Email
          </a>

          <a
            href="tel:+13854613687"
            className="text-gray-400 transition hover:text-cyan-300"
          >
            Mobile
          </a>

          <a
            href="https://github.com/abhilashjoga1228"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-cyan-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}