"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder posts — will come from Sanity
const POSTS = [
  {
    slug: "building-in-the-u-s-as-a-colombian",
    title: "Building in the U.S. as a Colombian",
    excerpt: "What it feels like to build products in a market that isn't yours by birth, but is yours by choice.",
    date: "2026-06-01",
    tags: ["Life", "Colombia"],
  },
  {
    slug: "why-i-went-all-in-on-ai-tooling",
    title: "Why I went all-in on AI tooling",
    excerpt: "The moment I realized that agents and automation weren't the future — they were already the present.",
    date: "2026-05-20",
    tags: ["AI", "Tech"],
  },
  {
    slug: "first-real-saas",
    title: "Shipping my first real SaaS",
    excerpt: "From zero leads to a working pipeline in 30 days. What worked, what didn't, and what I'd do differently.",
    date: "2026-05-01",
    tags: ["Startup", "Build"],
  },
];

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journal-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journal-grid",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 bg-card/20 border-y border-border"
      aria-label="Journal section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-accent uppercase mb-3">
            Journal
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text">
            Thoughts & stories
          </h2>
          <p className="font-body text-muted mt-2 text-lg">
            Behind the build. Personal perspective. Colombian lens.
          </p>
        </div>

        <div className="journal-grid grid md:grid-cols-3 gap-6">
          {POSTS.map(({ slug, title, excerpt, date, tags }) => (
            <article
              key={slug}
              className="journal-card group border border-border bg-card hover:border-accent transition-all duration-300 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs text-accent uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors mb-3 leading-snug">
                {title}
              </h3>

              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                {excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto border-t border-border pt-4">
                <span className="font-body text-xs text-muted">
                  {formatDate(date)}
                </span>
                <a
                  href={`/blog/${slug}`}
                  className="font-body text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest"
                >
                  Read →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
