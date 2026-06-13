"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: null,
  alt: `Photo ${i + 1}`,
  caption: "",
}));

interface LightboxProps {
  item: (typeof GALLERY_ITEMS)[0] | null;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <motion.div
            className="relative max-w-2xl w-full mx-6 bg-card border border-border p-6"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 font-body text-muted hover:text-text transition-colors z-10 text-sm uppercase tracking-widest"
              aria-label="Close lightbox"
            >
              Close ✕
            </button>
            <div className="aspect-square bg-border flex items-center justify-center">
              <span className="text-muted font-body text-sm">{item.alt}</span>
            </div>
            {item.caption && (
              <p className="font-body text-sm text-muted mt-4">{item.caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-tile",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
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
      id="gallery"
      ref={sectionRef}
      className="py-24 md:py-36 bg-card/20 border-y border-border"
      aria-label="Photo gallery"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <p className="font-body text-xs tracking-[0.3em] text-accent uppercase mb-3">
          Gallery
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text">
          Moments
        </h2>
        <p className="font-body text-muted mt-2 text-lg">
          Photos from life, work, and everywhere in between.
        </p>
      </div>

      <div className="gallery-grid grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-0.5 px-0.5">
        {GALLERY_ITEMS.map((item) => (
          <button
            key={item.id}
            className="gallery-tile group relative aspect-square overflow-hidden bg-card border border-border/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setSelected(item)}
            aria-label={`View ${item.alt}`}
          >
            {/* Placeholder content */}
            <div className="absolute inset-0 bg-gradient-to-br from-card to-bg" />

            {/* Shimmer sweep on hover */}
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,61,0,0.14) 45%, rgba(252,209,22,0.10) 55%, transparent 100%)",
              }}
            />

            {/* Accent border glow on hover */}
            <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

            {/* Corner spark */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.instagram.com/p.rincon31/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-muted hover:text-accent transition-colors"
        >
          More on Instagram @p.rincon31 ↗
        </a>
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
