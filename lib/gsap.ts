import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function createScrollReveal(
  targets: string | Element | Element[],
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    trigger?: Element | string;
    start?: string;
  } = {}
) {
  const {
    y = 50,
    stagger = 0.1,
    duration = 0.8,
    trigger,
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || (typeof targets === "string" ? targets : undefined),
        start,
        once: true,
      },
    }
  );
}
