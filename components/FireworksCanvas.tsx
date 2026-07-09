"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

type Rocket = {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
};

const COLORS = ["#7EC8E3", "#F9D56E", "#C4B5FD", "#FCA5A5", "#FDE68A", "#86EFAC"];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let lastLaunch = 0;
    let launchInterval = 2200;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      launchInterval = width < 640 ? 3200 : 2200;
    };

    const launchRocket = () => {
      const x = width * (0.12 + Math.random() * 0.76);
      rockets.push({
        x,
        y: height,
        vy: -(6 + Math.random() * 4),
        targetY: height * (0.18 + Math.random() * 0.28),
        color: randomColor(),
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = width < 640 ? 28 : 48;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 55 + Math.random() * 35,
          color,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    const tick = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      if (time - lastLaunch > launchInterval) {
        launchRocket();
        lastLaunch = time;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        rocket.y += rocket.vy;
        rocket.vy *= 0.985;

        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = rocket.color;
        ctx.fill();

        if (rocket.y <= rocket.targetY) {
          explode(rocket.x, rocket.y, rocket.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045;
        p.vx *= 0.99;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] opacity-70 mix-blend-screen"
    />
  );
}
