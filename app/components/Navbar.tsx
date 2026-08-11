"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Certifications",
    href: "#certifications",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-blue-400/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Name / Brand */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-xl font-bold text-transparent transition hover:opacity-90 md:text-2xl"
        >
          Abhilash Joga
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition duration-300 hover:text-cyan-300 lg:text-base"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/20 text-gray-200 transition hover:border-cyan-400/40 hover:bg-blue-500/10 hover:text-cyan-300 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-blue-400/10 bg-slate-950/95 px-6 pb-6 pt-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3.5 text-base font-medium text-gray-300 transition hover:text-cyan-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="/Abhilash_Joga_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View Resume
          </a>
        </div>
      )}
    </nav>
  );
}