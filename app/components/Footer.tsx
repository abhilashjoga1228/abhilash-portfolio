export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-10 py-10 text-center">

      <h3 className="text-xl font-semibold text-white">
        Abhilash Joga
      </h3>

      <p className="mt-3 text-gray-400">
        Data Engineer | Microsoft Fabric | Analytics
      </p>


      <div className="mt-5 flex justify-center gap-6">

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-400"
        >
          LinkedIn
        </a>


        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-400"
        >
          GitHub
        </a>


        <a
          href="mailto:your-email@example.com"
          className="text-gray-300 hover:text-blue-400"
        >
          Email
        </a>

      </div>


      <p className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Abhilash Joga. All rights reserved.
      </p>


    </footer>
  );
}