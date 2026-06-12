"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1 });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35 });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 2, borderColor: "#FF3D00", duration: 0.25 });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: "#F0EBE3", duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor]"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // Re-attach on DOM changes (for dynamically loaded content)
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-text pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
    </>
  );
}
