"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  offset: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

const STAR_COLORS = [
  "#FF3D00", "#FF6B35", "#FF8C00",
  "#FCD116",
  "#F0EBE3", "#F0EBE3", "#F0EBE3", "#F0EBE3", "#F0EBE3",
];

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: rand(0.5, 2.5),
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      speed: rand(0.3, 1.5),
      offset: Math.random() * Math.PI * 2,
    }));

    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.25;
        ctx.fill();
      }
      return;
    }

    const meteors: Meteor[] = [];
    let lastMeteorTime = 0;
    let nextMeteorDelay = rand(2000, 4000);
    let raf: number;
    const startTime = performance.now();

    function spawnMeteor() {
      if (meteors.length >= 3) return;
      meteors.push({
        x: rand(0, width * 0.8),
        y: rand(-60, -10),
        length: rand(80, 160),
        speed: rand(6, 12),
        angle: Math.PI / 4 + rand(-0.15, 0.15),
        opacity: 0.9,
      });
    }

    function animate(now: number) {
      const t = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Stars
      for (const s of stars) {
        const alpha = 0.1 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed + s.offset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Meteors
      if (now - lastMeteorTime > nextMeteorDelay) {
        spawnMeteor();
        lastMeteorTime = now;
        nextMeteorDelay = rand(2000, 4000);
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const dx = Math.cos(m.angle) * m.length;
        const dy = Math.sin(m.angle) * m.length;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - dx, m.y - dy);
        grad.addColorStop(0, `rgba(255,107,53,${m.opacity})`);
        grad.addColorStop(0.4, `rgba(255,61,0,${m.opacity * 0.4})`);
        grad.addColorStop(1, "rgba(255,61,0,0)");
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - dx, m.y - dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1;
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.007;

        if (m.x > width + 100 || m.y > height + 100 || m.opacity <= 0) {
          meteors.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      for (const s of stars) {
        s.x = Math.random() * width;
        s.y = Math.random() * height;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
