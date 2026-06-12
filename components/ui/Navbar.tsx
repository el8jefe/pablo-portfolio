"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <a
        href="#hero"
        className="font-display font-bold text-lg tracking-widest text-text hover:text-accent transition-colors"
      >
        PR
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="font-body text-sm tracking-wider text-muted hover:text-text transition-colors uppercase"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://x.com/Pablo_r31"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2 text-sm font-body text-muted hover:text-accent transition-colors border border-border px-4 py-2 hover:border-accent"
      >
        @Pablo_r31
      </a>
    </nav>
  );
}
