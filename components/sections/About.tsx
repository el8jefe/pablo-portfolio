"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { value: "3+", label: "Years Building" },
  { value: "10+", label: "Projects Shipped" },
  { value: "🇨🇴", label: "Colombian Roots" },
  { value: "🇺🇸", label: "Based in the U.S." },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = linesRef.current?.querySelectorAll(".bio-line");
    if (!lines) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: linesRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-row",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 max-w-6xl mx-auto"
      aria-label="About section"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Photo placeholder */}
        <div className="relative">
          <div className="aspect-[3/4] bg-card border border-border overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
            {/* Photo will come from Sanity — placeholder for now */}
            <div className="absolute inset-0 flex items-center justify-center text-muted text-sm font-body">
              Photo
            </div>
            {/* Accent corner decoration */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent" />
          </div>
        </div>

        {/* Right: Bio */}
        <div ref={linesRef}>
          <p className="bio-line font-body text-xs tracking-[0.3em] text-accent uppercase mb-4">
            About Me
          </p>
          <h2 className="bio-line font-display font-bold text-4xl md:text-5xl text-text leading-tight mb-8">
            Colombian roots,
            <br />
            building in the U.S.
          </h2>
          <p className="bio-line font-body text-muted leading-relaxed mb-4 text-lg">
            I'm Pablo Rincon — a developer and builder with deep Colombian roots,
            now based in the United States. I build things that feel as alive as
            they look: fast, intentional, and built to last.
          </p>
          <p className="bio-line font-body text-muted leading-relaxed mb-8">
            From Bogotá to the U.S., I bring a perspective shaped by two cultures,
            a relentless work ethic, and a genuine obsession with craft. Whether
            it's a product, a website, or an idea — I build it like it matters.
          </p>

          <div className="bio-line flex gap-4">
            <a
              href="https://x.com/Pablo_r31"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm tracking-wider uppercase text-accent border border-accent px-5 py-2 hover:bg-accent hover:text-bg transition-all"
            >
              X / Twitter
            </a>
            <a
              href="https://www.instagram.com/p.rincon31/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm tracking-wider uppercase text-muted border border-border px-5 py-2 hover:border-text hover:text-text transition-all"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 border-t border-border pt-12">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat-item text-center">
            <div className="font-display font-bold text-3xl md:text-4xl text-text mb-1">
              {value}
            </div>
            <div className="font-body text-sm text-muted uppercase tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
