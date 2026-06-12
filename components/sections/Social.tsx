"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TwitterEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widgets script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-chrome="noheader nofooter noborders transparent"
        data-tweet-limit="5"
        href="https://twitter.com/Pablo_r31"
        style={{ color: "#F0EBE3" }}
      >
        Loading tweets from @Pablo_r31...
      </a>
    </div>
  );
}

function InstagramPlaceholder() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <a
          key={i}
          href="https://www.instagram.com/p.rincon31/"
          target="_blank"
          rel="noopener noreferrer"
          className="aspect-square bg-card border border-border hover:border-accent transition-colors group relative overflow-hidden"
          aria-label="Instagram post"
        >
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ))}
      <div className="col-span-3 text-center mt-2">
        <a
          href="https://www.instagram.com/p.rincon31/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest"
        >
          @p.rincon31 on Instagram ↗
        </a>
      </div>
    </div>
  );
}

export default function Social() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".social-panel",
        { opacity: 0, x: (i) => (i === 0 ? -40 : 40) },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="social"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 max-w-6xl mx-auto"
      aria-label="Social feeds"
    >
      <div className="mb-16">
        <p className="font-body text-xs tracking-[0.3em] text-accent uppercase mb-3">
          Find Me
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text">
          Social
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Twitter */}
        <div className="social-panel border border-border bg-card/50 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <span className="font-body text-sm text-muted uppercase tracking-widest">
              Twitter / X
            </span>
            <a
              href="https://x.com/Pablo_r31"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-accent hover:text-accent-hover transition-colors ml-auto"
            >
              @Pablo_r31 ↗
            </a>
          </div>
          <TwitterEmbed />
        </div>

        {/* Instagram */}
        <div className="social-panel border border-border bg-card/50 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <span className="font-body text-sm text-muted uppercase tracking-widest">
              Instagram
            </span>
            <a
              href="https://www.instagram.com/p.rincon31/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-accent hover:text-accent-hover transition-colors ml-auto"
            >
              @p.rincon31 ↗
            </a>
          </div>
          <InstagramPlaceholder />
        </div>
      </div>
    </section>
  );
}
