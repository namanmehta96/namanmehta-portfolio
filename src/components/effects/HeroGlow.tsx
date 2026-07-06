"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "breathing" amber glow behind the hero: two very soft radial
 * gradients drifting on slow CSS loops (see glow-drift-* in globals.css),
 * with a few px of lerped mouse parallax on desktop. Static under
 * prefers-reduced-motion; parallax disabled on touch.
 */
export function HeroGlow() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = wrapRef.current;
    if (!el || !finePointer || reduced) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 24;
      target.y = (event.clientY / window.innerHeight - 0.5) * 16;
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.04;
      pos.y += (target.y - pos.y) * 0.04;
      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 will-change-transform"
    >
      <div
        className="glow-drift-a absolute -top-[12%] -left-[15%] h-[70vh] w-[70vw] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(closest-side, var(--accent), transparent 70%)" }}
      />
      <div
        className="glow-drift-b absolute -right-[18%] -bottom-[14%] h-[60vh] w-[60vw] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(closest-side, var(--accent), transparent 72%)" }}
      />
    </div>
  );
}
