"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "Three.js", category: "3D/Creative" },
  { name: "GSAP", category: "Animation" },
  { name: "Tailwind", category: "Styling" },
  { name: "Supabase", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "FastAPI", category: "Backend" },
  { name: "Stripe", category: "Payments" },
  { name: "Anthropic", category: "AI" },
  { name: "Claude Code", category: "AI" },
  { name: "Grok AI", category: "AI" },
  { name: "Zod", category: "Validation" },
  { name: "Vercel", category: "Deploy" },
  { name: "Railway", category: "Deploy" },
  { name: "Docker", category: "Infra" },
  { name: "Firecrawl", category: "Tooling" },
  { name: "Git", category: "Tooling" },
  { name: "Figma", category: "Design" },
  { name: "Framer", category: "Design" },
  { name: "Cursor", category: "IDE" },
  { name: "Warp", category: "Terminal" },
  { name: "Sanity", category: "CMS" },
  { name: "REST APIs", category: "Backend" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-card/30 border-y border-border"
      aria-label="Skills section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-accent uppercase mb-3">
            Stack
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text">
            What I build with
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {SKILLS.map(({ name, category }) => (
            <div
              key={name}
              className="skill-card group relative bg-card border border-border px-4 py-5 hover:border-accent transition-all duration-300 cursor-default"
              data-cursor
            >
              <div className="font-body font-medium text-text text-sm group-hover:text-accent transition-colors">
                {name}
              </div>
              <div className="font-body text-xs text-muted mt-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                {category}
              </div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
