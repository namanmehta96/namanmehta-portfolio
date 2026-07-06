"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue } from "framer-motion";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

type CursorMode = "default" | "view" | "link";

/**
 * Custom cursor: a small dot that tracks the pointer directly plus a ring
 * that follows with lerped lag. Over project rows ([data-cursor="view"]) the
 * ring expands into an amber "View" badge; over links/buttons it shrinks.
 * Mounted only on fine pointers without prefers-reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [hidden, setHidden] = useState(true);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;
    let seeded = false;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      dotX.set(target.x);
      dotY.set(target.y);
      if (!seeded) {
        // first movement: ring appears at the pointer, no glide from the corner
        ring.x = target.x;
        ring.y = target.y;
        seeded = true;
      }
      setHidden(false);
    };
    const onOver = (event: PointerEvent) => {
      const el = event.target as Element | null;
      if (el?.closest?.("[data-cursor='view']")) setMode("view");
      else if (el?.closest?.("a, button, [role='button']")) setMode("link");
      else setMode("default");
    };
    const onLeaveWindow = () => setHidden(true);
    const onEnterWindow = () => setHidden(false);

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      ringX.set(ring.x);
      ringY.set(ring.y);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [enabled, dotX, dotY, ringX, ringY]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <m.span
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: mode === "view" ? 0 : mode === "link" ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: EASE }}
        className="pointer-events-none fixed top-0 left-0 z-[80] -mt-1 -ml-1 h-2 w-2 rounded-full bg-foreground will-change-transform"
      />
      <m.span
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: mode === "view" ? 2.2 : mode === "link" ? 0.55 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: EASE }}
        className={`pointer-events-none fixed top-0 left-0 z-[79] -mt-[18px] -ml-[18px] h-9 w-9 rounded-full border transition-colors duration-200 will-change-transform ${
          mode === "view" ? "border-accent bg-accent" : "border-foreground/30"
        }`}
      />
      <m.span
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: mode === "view" && !hidden ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="pointer-events-none fixed top-0 left-0 z-[80] -mt-[18px] -ml-[18px] flex h-9 w-9 items-center justify-center text-[10px] font-medium tracking-[0.2em] text-background uppercase will-change-transform"
      >
        View
      </m.span>
    </div>
  );
}
