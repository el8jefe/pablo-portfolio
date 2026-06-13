"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const COLORS = ["#FF3D00", "#FF6B35", "#FCD116", "#FF8C00", "#FFB347", "#FF4500"];

export default function FireworksCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles proportional to cursor speed
      const count = Math.min(Math.floor(speed * 0.4), 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 0.5 + Math.random() * 2.5;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * vel + dx * 0.08,
          vy: Math.sin(angle) * vel + dy * 0.08,
          life: 1,
          maxLife: 0.6 + Math.random() * 0.8,
          size: 1.5 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    // Occasional burst on click
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const vel = 2 + Math.random() * 4;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 1,
          maxLife: 0.8 + Math.random() * 0.6,
          size: 2 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.life > 0);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.98;
        p.life -= 0.016 / p.maxLife;

        const alpha = Math.max(0, p.life);
        ctx.save();
        ctx.globalAlpha = alpha * alpha; // quadratic fade
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9990]"
      aria-hidden="true"
    />
  );
}
