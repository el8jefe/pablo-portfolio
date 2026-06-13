"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useIsMobile, useReducedMotion } from "@/lib/utils";

const ColombiaHologram = dynamic(() => import("@/components/three/ColombiaHologram"), {
  ssr: false,
});

const TYPEWRITER_WORDS = ["Colombian.", "Builder.", "Developer.", "Based in the U.S."];

const FLAG_STRIPE = [
  { color: "#FCD116", flex: 2 },
  { color: "#003087", flex: 1 },
  { color: "#CE1126", flex: 1 },
];

// Real Colombia coords normalized for SVG viewBox [-2,-1.2] to [1.5,1.8]
const COLOMBIA_SVG_POINTS = [
  [-75.373223,-0.152032],[-75.801466,0.084801],[-76.292314,0.416047],
  [-76.57638,0.256936],[-77.424984,0.395687],[-77.668613,0.825893],
  [-77.855061,0.809925],[-78.855259,1.380924],[-78.990935,1.69137],
  [-78.617831,1.766404],[-78.662118,2.267355],[-78.42761,2.629556],
  [-77.931543,2.696606],[-77.510431,3.325017],[-77.12769,3.849636],
  [-77.496272,4.087606],[-77.307601,4.667984],[-77.533221,5.582812],
  [-77.318815,5.845354],[-77.476661,6.691116],[-77.881571,7.223771],
  [-77.753414,7.70984],[-77.431108,7.638061],[-77.242566,7.935278],
  [-77.474723,8.524286],[-77.353361,8.670505],[-76.836674,8.638749],
  [-76.086384,9.336821],[-75.6746,9.443248],[-75.664704,9.774003],
  [-75.480426,10.61899],[-74.906895,11.083045],[-74.276753,11.102036],
  [-74.197223,11.310473],[-73.414764,11.227015],[-72.627835,11.731972],
  [-72.238195,11.95555],[-71.75409,12.437303],[-71.399822,12.376041],
  [-71.137461,12.112982],[-71.331584,11.776284],[-71.973922,11.608672],
  [-72.227575,11.108702],[-72.614658,10.821975],[-72.905286,10.450344],
  [-73.027604,9.73677],[-73.304952,9.152],[-72.78873,9.085027],
  [-72.660495,8.625288],[-72.439862,8.405275],[-72.360901,8.002638],
  [-72.479679,7.632506],[-72.444487,7.423785],[-72.198352,7.340431],
  [-71.960176,6.991615],[-70.674234,7.087785],[-70.093313,6.960376],
  [-69.38948,6.099861],[-68.985319,6.206805],[-68.265052,6.153268],
  [-67.695087,6.267318],[-67.34144,6.095468],[-67.521532,5.55687],
  [-67.744697,5.221129],[-67.823012,4.503937],[-67.621836,3.839482],
  [-67.337564,3.542342],[-67.303173,3.318454],[-67.809938,2.820655],
  [-67.447092,2.600281],[-67.181294,2.250638],[-66.876326,1.253361],
  [-67.065048,1.130112],[-67.259998,1.719999],[-67.53781,2.037163],
  [-67.868565,1.692455],[-69.816973,1.714805],[-69.804597,1.089081],
  [-69.218638,0.985677],[-69.252434,0.602651],[-69.452396,0.706159],
  [-70.015566,0.541414],[-70.020656,-0.185156],[-69.577065,-0.549992],
  [-69.420486,-1.122619],[-69.444102,-1.556287],[-69.893635,-4.298187],
  [-70.394044,-3.766591],[-70.692682,-3.742872],[-70.047709,-2.725156],
  [-70.813476,-2.256865],[-71.413646,-2.342802],[-71.774761,-2.16979],
  [-72.325787,-2.434218],[-73.070392,-2.308954],[-73.659504,-1.260491],
  [-74.122395,-1.002833],[-74.441601,-0.53082],[-75.106625,-0.057205],
].map(([lng, lat]) => {
  const x = (lng - (-72.95)) / 6;
  const y = -((lat - 4.07) / 6); // flip Y for SVG
  return [x, y] as [number, number];
});

const SVG_POINTS_STR = COLOMBIA_SVG_POINTS.map(([x, y]) => `${x},${y}`).join(" ");

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) { setDisplayed(TYPEWRITER_WORDS[0]); return; }
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
            {FLAG_STRIPE.map(({ color, flex }, i) => (
              <div key={i} className="w-full" style={{ backgroundColor: color, flex }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="font-body text-xl md:text-2xl text-accent font-medium tracking-wide" aria-live="polite">
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

function ScrollGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!glowRef.current) return;
      const y = window.scrollY * 0.4;
      glowRef.current.style.transform = `translate(-50%, calc(-50% - ${y}px))`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255,61,0,0.08) 0%, rgba(255,107,53,0.04) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
      aria-hidden="true"
    />
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
      {/* Scroll-parallax orange glow — drifts upward as you scroll */}
      {!reducedMotion && <ScrollGlow />}

      {/* 3D Colombia Hologram — desktop, positioned left-heavy */}
      {!isMobile && !reducedMotion && (
        <div
          className="absolute inset-0"
          style={{ left: "-15%", right: "30%" }}
          aria-hidden="true"
        >
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <ColombiaHologram />
          </Canvas>
        </div>
      )}

      {/* Mobile: Real Colombia SVG outline */}
      {isMobile && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-25"
          aria-hidden="true"
        >
          <svg
            viewBox="-2 -1.4 3.5 3"
            className="w-72 h-72"
            fill="none"
            stroke="#FF3D00"
            strokeWidth="0.03"
            strokeLinejoin="round"
          >
            <polygon points={SVG_POINTS_STR} fill="rgba(255,61,0,0.08)" />
          </svg>
        </div>
      )}

      {/* Bottom fade */}
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

        <motion.div {...fadeUp(0.7)} className="flex justify-center mb-6" aria-hidden="true">
          <div className="flex h-1 w-48 overflow-hidden rounded-full">
            {FLAG_STRIPE.map(({ color, flex }, i) => (
              <div key={i} style={{ backgroundColor: color, flex }} />
            ))}
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
