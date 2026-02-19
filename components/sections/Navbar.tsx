"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-5">
        <nav className="glass-card rounded-2xl px-4 py-2 shadow-glow md:px-6 md:py-2.5">
          <div className="flex items-center justify-between gap-5 md:gap-8">
            <Link href="#" className="group relative inline-flex shrink-0 items-center justify-center md:pr-1">
              <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-sky-400/10 to-emerald-400/20 opacity-80 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <span className="inline-flex items-center rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 backdrop-blur-md transition-all duration-300 group-hover:border-cyan-300/45 group-hover:bg-slate-900/95">
                <span className="text-base font-semibold tracking-wide text-cyan-100 transition-colors duration-300 group-hover:text-cyan-200 md:text-lg">
                  {"<entora.space>"}
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Work With Us
              </a>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation"
              className="inline-flex rounded-lg border border-white/10 p-2 text-slate-200 md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 md:hidden ${
              open ? "max-h-80 pt-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/70 p-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-1 rounded-md bg-gradient-to-r from-cyan-300 to-emerald-300 px-3 py-2 text-center text-sm font-semibold text-slate-950"
                onClick={() => setOpen(false)}
              >
                Work With Us
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
