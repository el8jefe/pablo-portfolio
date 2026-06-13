"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Styled CSS mock-up UIs for each project card
function TradeBuiltMock() {
  return (
    <div className="w-full h-full bg-[#080808] relative overflow-hidden">
      {/* Mock nav */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0f0f0f] border-b border-border/40 flex items-center px-3 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        <div className="h-1.5 w-20 bg-border/50 rounded-sm" />
        <div className="ml-auto h-1.5 w-12 bg-accent/30 rounded-sm" />
      </div>
      {/* Metric cards row */}
      <div className="absolute top-10 left-3 right-3 grid grid-cols-3 gap-1.5">
        {["153 Leads", "$12k ARR", "84% Conv"].map((v) => (
          <div key={v} className="bg-[#0f0f0f] border border-border/40 rounded p-2">
            <div className="h-1.5 w-8 bg-accent/50 rounded-sm mb-2" />
            <div className="font-body text-[9px] text-accent/80 font-medium">{v}</div>
          </div>
        ))}
      </div>
      {/* Mock table */}
      <div className="absolute left-3 right-3 space-y-1" style={{ top: "52%" }}>
        {[100, 85, 70].map((w, i) => (
          <div key={i} className="h-3 bg-[#0f0f0f] border border-border/25 rounded-sm flex items-center px-2 gap-2">
            <div className="w-2 h-1 bg-accent/40 rounded-sm" />
            <div className="h-1 bg-border/35 rounded-sm" style={{ width: `${w}%`, maxWidth: "55%" }} />
            <div className="ml-auto h-1 w-8 bg-border/25 rounded-sm" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent" />
    </div>
  );
}

function LeadAgentMock() {
  return (
    <div className="w-full h-full bg-[#060608] relative overflow-hidden font-mono">
      {/* Terminal header */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#111] border-b border-border/40 flex items-center px-3 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className="ml-2 font-body text-[9px] text-muted/60 tracking-wider">lead-agent — bash</span>
      </div>
      {/* Terminal lines */}
      <div className="absolute top-10 left-3 right-3 space-y-1.5">
        {[
          { color: "text-green-400/80", text: "$ scraper.py --target CT --mode live" },
          { color: "text-muted/70", text: "→ Found 153 contractors in database" },
          { color: "text-accent/80", text: "→ Calling lead #47: (203) 555-0183..." },
          { color: "text-green-400/70", text: "✓ Demo booked: Thu 2pm — roofing co." },
          { color: "text-muted/50", text: "→ Processing next batch..." },
        ].map(({ color, text }, i) => (
          <div key={i} className={`font-body text-[8px] ${color} tracking-tight`}>{text}</div>
        ))}
        <div className="flex items-center gap-1 mt-2">
          <span className="font-body text-[8px] text-accent/80">$</span>
          <div className="w-1.5 h-3 bg-accent/70 animate-pulse" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent" />
    </div>
  );
}

function VolarTechMock() {
  return (
    <div className="w-full h-full bg-[#060810] relative overflow-hidden">
      {/* Mock map grid */}
      <div className="absolute inset-4 grid grid-cols-6 grid-rows-4 gap-0.5 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border border-blue-400/20 rounded-sm" />
        ))}
      </div>
      {/* Drone waypoints */}
      {[
        { x: "20%", y: "30%", label: "Antioquia" },
        { x: "60%", y: "50%", label: "PR" },
        { x: "78%", y: "20%", label: "CT" },
      ].map(({ x, y, label }) => (
        <div key={label} className="absolute flex flex-col items-center gap-1" style={{ left: x, top: y }}>
          <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent/40 shadow-[0_0_8px_#FF3D00]" />
          <span className="font-body text-[7px] text-accent/80 tracking-wider whitespace-nowrap">{label}</span>
        </div>
      ))}
      {/* Route lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
        <line x1="20%" y1="30%" x2="60%" y2="50%" stroke="#FF3D00" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60%" y1="50%" x2="78%" y2="20%" stroke="#FF3D00" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      {/* Status bar */}
      <div className="absolute bottom-3 left-3 right-3 bg-[#0f0f14] border border-blue-400/20 rounded px-3 py-1.5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-body text-[8px] text-muted/70">3 markets active · autonomous mode</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent" />
    </div>
  );
}

const MOCK_IMAGES: Record<string, () => React.ReactElement> = {
  TradeBuilt: TradeBuiltMock,
  "Lead Agent": LeadAgentMock,
  VolarTech: VolarTechMock,
};

const PROJECTS = [
  {
    title: "TradeBuilt",
    description: "Lead generation SaaS for contractors. End-to-end pipeline from scraping to demo booking.",
    tags: ["Next.js", "Supabase", "AI"],
    impact: "153 leads generated in first run.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "VolarTech",
    description: "Drone solutions business for agriculture and land management. Installs autonomous spraying drones and smart mowers across Antioquia, Puerto Rico, and Connecticut.",
    tags: ["Business", "Drones", "AgTech", "Colombia"],
    impact: "Operating in 3 markets: Antioquia, Puerto Rico, Connecticut.",
    liveUrl: "#",
    githubUrl: null,
  },
  {
    title: "Lead Agent",
    description: "Automated scraping and outreach pipeline. Built for contractors in the U.S. market.",
    tags: ["Node.js", "PostgreSQL", "Twilio"],
    impact: "End-to-end from data to booked call.",
    liveUrl: "#",
    githubUrl: "#",
  },
];

type Project = {
  title: string;
  description: string;
  tags: string[];
  impact: string;
  liveUrl: string;
  githubUrl: string | null;
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
        {(PROJECTS as Project[]).map(({ title, description, tags, impact, liveUrl, githubUrl }) => {
          const MockImage = MOCK_IMAGES[title];
          return (
            <article
              key={title}
              className="project-card group relative bg-card border border-border overflow-hidden hover:border-accent transition-all duration-500"
            >
              {/* Mock UI image area */}
              <div className="aspect-video relative overflow-hidden">
                {MockImage && <MockImage />}
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-text mb-2 group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed mb-4">
                  {description}
                </p>

                <p className="font-body text-xs text-accent/80 mb-4 italic">
                  → {impact}
                </p>

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
          );
        })}
      </div>
    </section>
  );
}
