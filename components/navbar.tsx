"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/use-active-section";

const NAV_LINKS = [
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
        scrolled ? "border-stroke-soft bg-bg/72 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1140px] items-center justify-between gap-6 px-7">
        <Link href="#top" className="font-mono text-[15px] font-bold tracking-wide text-text">
          danish<span className="text-accent">.dev</span>
        </Link>
        <ul className="hidden gap-1.5 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[14.5px] transition-colors ${
                  active === link.href.slice(1)
                    ? "bg-white/6 text-text"
                    : "text-text-2 hover:bg-white/6 hover:text-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="hidden rounded-full border border-stroke px-4 py-2 text-[13.5px] font-semibold text-text-2 transition-colors hover:text-text sm:block"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-full bg-text px-[18px] py-[9px] text-[14px] font-semibold text-bg transition-transform hover:-translate-y-px"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-[42px] w-[42px] place-items-center rounded-[10px] border border-stroke text-text md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-0.5 border-b border-stroke bg-bg/96 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3.5 py-3 text-[16px] text-text-2 hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3.5 py-3 text-[16px] text-text-2 hover:text-text"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
