"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: "TradeBuilt",
    description: "Lead generation SaaS for contractors. End-to-end pipeline from scraping to demo booking.",
    tags: ["Next.js", "Supabase", "AI"],
    impact: "153 leads generated in first run.",
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-accent/20 to-transparent",
  },
  {
    title: "VolarTech",
    description: "Drone solutions business for agriculture and land management. Installs autonomous spraying drones and smart mowers across Antioquia, Puerto Rico, and Connecticut. Built between Guatapé and Greenwich — letting farms run themselves.",
    tags: ["Business", "Drones", "AgTech", "Colombia"],
    impact: "Operating in 3 markets: Antioquia, Puerto Rico, Connecticut.",
    liveUrl: "#",
    githubUrl: null,
    gradient: "from-blue-900/25 to-transparent",
  },
  {
    title: "Lead Agent",
    description: "Automated scraping and outreach pipeline. Built for contractors in the U.S. market.",
    tags: ["Node.js", "PostgreSQL", "Twilio"],
    impact: "End-to-end from data to booked call.",
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-red-900/20 to-transparent",
  },
];

type Project = {
  title: string;
  description: string;
  tags: string[];
  impact: string;
  liveUrl: string;
  githubUrl: string | null;
  gradient: string;
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
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
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 max-w-6xl mx-auto"
      aria-label="Projects section"
    >
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="font-body text-xs tracking-[0.3em] text-accent uppercase mb-3">
            Work
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text">
            Things I&apos;ve built
          </h2>
        </div>
      </div>

      <div className="projects-grid grid md:grid-cols-3 gap-6">
        {(PROJECTS as Project[]).map(({ title, description, tags, impact, liveUrl, githubUrl, gradient }) => (
          <article
            key={title}
            className="project-card group relative bg-card border border-border overflow-hidden hover:border-accent transition-all duration-500"
          >
            {/* Image area */}
            <div className={`aspect-video bg-gradient-to-br ${gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-text/20 group-hover:text-text/40 transition-colors tracking-widest">
                  {title}
                </span>
              </div>
              <div className="absolute inset-0 bg-bg/60 group-hover:bg-bg/30 transition-colors duration-500" />
              {/* Hover scale overlay */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-6">
              <h3 className="font-display font-bold text-xl text-text mb-2 group-hover:text-accent transition-colors">
                {title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-4">
                {description}
              </p>

              {/* Impact line */}
              <p className="font-body text-xs text-accent/80 mb-4 italic">
                → {impact}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs text-muted border border-border px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 border-t border-border pt-4">
                {liveUrl !== "#" && (
                  <a
                    href={liveUrl}
                    className="font-body text-xs text-muted hover:text-text transition-colors uppercase tracking-wider"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live ↗
                  </a>
                )}
                {githubUrl && githubUrl !== "#" && (
                  <a
                    href={githubUrl}
                    className="font-body text-xs text-muted hover:text-text transition-colors uppercase tracking-wider"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>
                )}
                {liveUrl === "#" && !githubUrl && (
                  <span className="font-body text-xs text-muted uppercase tracking-wider">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
