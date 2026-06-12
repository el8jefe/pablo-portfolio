"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useIsMobile, useReducedMotion } from "@/lib/utils";

const ColombiaHologram = dynamic(() => import("@/components/three/ColombiaHologram"), {
  ssr: false,
});

const TYPEWRITER_WORDS = ["Colombian.", "Builder.", "Developer.", "Based in the U.S."];

// Colombian flag colors: yellow, blue, red
const FLAG_STRIPE = [
  { color: "#FCD116", width: "50%" },  // yellow - top half
  { color: "#003087", width: "25%" },  // blue
  { color: "#CE1126", width: "25%" },  // red
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(TYPEWRITER_WORDS[0]);
      return;
    }

    const word = TYPEWRITER_WORDS[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % TYPEWRITER_WORDS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index, reducedMotion]);

  const showFlag = TYPEWRITER_WORDS[index] === "Colombian." && !isDeleting;

  return (
    <div className="flex items-center gap-3 h-10">
      <AnimatePresence>
        {showFlag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col w-6 h-4 overflow-hidden rounded-sm"
            aria-label="Colombian flag"
          >
            {FLAG_STRIPE.map(({ color, width }, i) => (
              <div
                key={i}
                className="w-full"
                style={{ backgroundColor: color, height: width }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <span
        className="font-body text-xl md:text-2xl text-accent font-medium tracking-wide"
        aria-live="polite"
      >
        {displayed}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
      aria-hidden="true"
    >
      <span className="text-muted text-xs tracking-widest uppercase font-body">Scroll</span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
        animate={{ scaleY: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: "easeOut" as const, delay },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
      aria-label="Hero section"
    >
      {/* 3D Colombia Hologram — desktop only */}
      {!isMobile && !reducedMotion && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-80"
          aria-hidden="true"
        >
          <div className="w-full h-full max-w-2xl">
            <Canvas
              camera={{ position: [0, 0, 2.8], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <ColombiaHologram />
            </Canvas>
          </div>
        </div>
      )}

      {/* Mobile: Static Colombia SVG outline */}
      {isMobile && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-20"
          aria-hidden="true"
        >
          <svg
            viewBox="-1.2 -1.2 2.4 2.4"
            className="w-64 h-64"
            fill="none"
            stroke="#FF3D00"
            strokeWidth="0.04"
          >
            <polygon
              points="-0.34,0.52 -0.42,0.37 -0.44,0.40 -0.33,0.54 -0.22,0.54 -0.10,0.71 0.03,0.88 0.14,0.88 0.18,0.87 0.24,0.86 0.25,0.83 0.20,0.76 0.22,0.55 0.38,0.60 0.60,0.28 0.50,0.28 0.44,0.33 0.45,0.27 0.40,0.22 0.39,0.03 0.38,-0.07 0.32,-0.06 0.30,-0.27 0.27,-0.31 0.22,-0.31 0.17,-0.33 0.12,-0.25 0.08,-0.27 -0.01,-0.28 -0.07,-0.25 -0.10,-0.07 -0.13,0.04 -0.18,0.09 -0.24,0.06 -0.29,0.09 -0.32,0.17 -0.34,0.18 -0.38,0.15 -0.45,0.25 -0.34,0.52"
            />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          {...fadeUp(0.3)}
          className="font-body text-sm tracking-[0.3em] text-muted uppercase mb-6"
        >
          Portfolio
        </motion.p>

        <motion.h1
          {...fadeUp(0.5)}
          className="font-display font-extrabold text-6xl md:text-8xl lg:text-[10rem] text-text leading-none tracking-tight mb-4"
        >
          PABLO
          <br />
          <span className="text-accent">RINCON</span>
        </motion.h1>

        {/* Colombian flag horizontal stripe */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex justify-center mb-6"
          aria-hidden="true"
        >
          <div className="flex h-1 w-48 overflow-hidden rounded-full">
            <div className="bg-[#FCD116] flex-[2]" />
            <div className="bg-[#003087] flex-[1]" />
            <div className="bg-[#CE1126] flex-[1]" />
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.9)} className="flex justify-center">
          <Typewriter />
        </motion.div>

        <motion.div
          {...fadeUp(1.1)}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="font-body text-sm tracking-widest uppercase border border-accent text-accent px-8 py-3 hover:bg-accent hover:text-bg transition-all duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="font-body text-sm tracking-widest uppercase text-muted hover:text-text transition-colors"
          >
            Get in Touch →
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
