"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder gallery items — will be replaced by Sanity + Instagram data
const GALLERY_ITEMS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: null,
  alt: `Photo ${i + 1}`,
  caption: "",
  aspect: i % 3 === 0 ? "tall" : i % 5 === 0 ? "wide" : "square",
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
            className="relative max-w-3xl w-full mx-6 bg-card border border-border p-6"
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
            <div className="aspect-[4/3] bg-border flex items-center justify-center">
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
        ".gallery-item",
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
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
      className="py-24 md:py-36 px-6 bg-card/20 border-y border-border"
      aria-label="Photo gallery"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
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

        <div className="gallery-grid columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="gallery-item break-inside-avoid cursor-pointer group relative overflow-hidden bg-card border border-border"
              onClick={() => setSelected(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.alt}`}
              onKeyDown={(e) => e.key === "Enter" && setSelected(item)}
            >
              <div
                className={`w-full bg-card/50 flex items-center justify-center relative ${
                  item.aspect === "tall"
                    ? "aspect-[2/3]"
                    : item.aspect === "wide"
                    ? "aspect-[4/3]"
                    : "aspect-square"
                }`}
              >
                <span className="text-border font-body text-xs">Photo</span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border-0 border-accent group-hover:border opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Instagram credit */}
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
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
