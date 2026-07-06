"use client";

import { useEffect, useRef } from "react";

interface AuroraProps {
  className?: string;
  /** Overall color strength, 0-1. The footer runs fainter than the hero. */
  intensity?: number;
}

type Rgb = [number, number, number];

function tokenRgb(name: string): Rgb {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// Buffer resolution: tiny on purpose — the GPU upscales and blurs it into silk.
const W = 220;
const H = 132;
const FRAME_MS = 33; // ~30fps is plenty for smoke-slow motion

/**
 * Ambient aurora: 3-4 large soft gradient blobs in palette tones (amber and a
 * desaturated warm umber over the background) drifting on incommensurate
 * sinusoids for an organic ~45s feel. Drawn on a low-res canvas, upscaled and
 * CSS-blurred. Pauses offscreen; reduced motion gets one static frame.
 */
export function Aurora({ className = "", intensity = 1 }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = W;
    canvas.height = H;

    const bg = tokenRgb("--background");
    const amber = tokenRgb("--accent");
    const umber = mix(amber, bg, 0.45);
    const deep = mix(amber, bg, 0.68);

    // period pairs are deliberately incommensurate so the drift never reads as a loop
    const blobs = [
      { c: amber, a: 0.16, r: 0.42, cx: 0.24, cy: 0.28, p1: 47, p2: 31, ax: 0.17, ay: 0.13, ph: 0.0 },
      { c: umber, a: 0.22, r: 0.52, cx: 0.74, cy: 0.62, p1: 59, p2: 37, ax: 0.21, ay: 0.15, ph: 2.1 },
      { c: amber, a: 0.11, r: 0.38, cx: 0.55, cy: 0.14, p1: 53, p2: 41, ax: 0.15, ay: 0.19, ph: 4.2 },
      { c: deep, a: 0.26, r: 0.58, cx: 0.34, cy: 0.80, p1: 67, p2: 43, ax: 0.19, ay: 0.11, ph: 1.3 },
    ];

    const draw = (t: number) => {
      ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
      ctx.fillRect(0, 0, W, H);
      for (const b of blobs) {
        const x =
          (b.cx +
            Math.sin(t / b.p1 + b.ph) * b.ax +
            Math.sin(t / (b.p2 * 1.7) + b.ph * 2) * b.ax * 0.5) *
          W;
        const y =
          (b.cy +
            Math.cos(t / b.p2 + b.ph) * b.ay +
            Math.cos(t / (b.p1 * 1.3) + b.ph) * b.ay * 0.5) *
          H;
        const r = (b.r + Math.sin(t / (b.p1 * 0.8) + b.ph) * 0.08) * W;
        const alpha = b.a * intensity;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${alpha})`);
        grad.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(12); // one organic static frame
      return;
    }

    let raf = 0;
    let running = false;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now / 1000);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ filter: "blur(48px)", transform: "scale(1.15)" }}
    />
  );
}
