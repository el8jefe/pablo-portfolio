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

function InstagramCard() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-6">
      {/* Instagram gradient icon */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
        </svg>
      </div>
      <div className="text-center">
        <p className="font-display font-bold text-text text-xl mb-1">@p.rincon31</p>
        <p className="font-body text-sm text-muted">Life, work, and Medellín moments</p>
      </div>
      <a
        href="https://www.instagram.com/p.rincon31/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-sm tracking-widest uppercase text-accent border border-accent px-6 py-2.5 hover:bg-accent hover:text-bg transition-all duration-300"
      >
        Follow on Instagram
      </a>
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
      className="py-24 md:py-36 overflow-hidden"
      aria-label="Social feeds"
    >
      {/* Header — stays within max-w container */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <p className="font-body text-xs tracking-[0.3em] text-accent uppercase mb-3">
          Find Me
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text">
          Social
        </h2>
      </div>

      {/* Full-width edge-to-edge panels */}
      <div className="grid md:grid-cols-2">
        {/* Twitter — left panel, touches left edge */}
        <div
          className="social-panel bg-card/50 border-b md:border-b-0 md:border-r border-border px-6 py-8"
          style={{ paddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2))" }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            <span className="font-body text-sm text-muted uppercase tracking-widest">Twitter / X</span>
            <a
              href="https://x.com/Pablo_r31"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-accent hover:text-accent-hover transition-colors ml-auto"
            >
              @Pablo_r31
            </a>
          </div>
          <TwitterEmbed />
        </div>

        {/* Instagram — right panel, touches right edge */}
        <div
          className="social-panel bg-card/50 border-border md:border-l px-6 py-8"
          style={{ paddingRight: "max(1.5rem, calc((100vw - 72rem) / 2))" }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="font-body text-sm text-muted uppercase tracking-widest">Instagram</span>
            <a
              href="https://www.instagram.com/p.rincon31/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-accent hover:text-accent-hover transition-colors ml-auto"
            >
              @p.rincon31
            </a>
          </div>
          <InstagramCard />
        </div>
      </div>
    </section>
  );
}
