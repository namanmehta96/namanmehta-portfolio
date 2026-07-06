"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useMotionValue } from "framer-motion";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const CARD_W = 360;
const CARD_H = 240;

interface PreviewItem {
  slug: string;
  title: string;
}

interface ProjectPreviewProps {
  items: PreviewItem[];
  active: string | null;
}

/**
 * Floating preview card that follows the cursor with lerped lag and a slight
 * velocity-based tilt while a project row is hovered. Desktop (fine pointer)
 * only, disabled under prefers-reduced-motion; touch devices get static
 * thumbnails in the rows instead.
 */
export function ProjectPreview({ items, active }: ProjectPreviewProps) {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-CARD_W);
  const y = useMotionValue(-CARD_H);
  const rotate = useMotionValue(0);
  const target = useRef({ x: -CARD_W, y: -CARD_H });
  const pos = useRef({ x: -CARD_W, y: -CARD_H });
  const wasActive = useRef(false);

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
    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };
    let raf = 0;
    const loop = () => {
      const p = pos.current;
      const t = target.current;
      const prevX = p.x;
      p.x += (t.x - p.x) * 0.13;
      p.y += (t.y - p.y) * 0.13;
      x.set(p.x - CARD_W / 2);
      y.set(p.y - CARD_H / 2);
      const velocity = p.x - prevX;
      rotate.set(Math.max(-6, Math.min(6, velocity * 0.3)));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled, x, y, rotate]);

  // When a hover begins, snap the card to the pointer instead of gliding in
  // from wherever it last faded out.
  useEffect(() => {
    if (active && !wasActive.current) {
      pos.current.x = target.current.x;
      pos.current.y = target.current.y;
    }
    wasActive.current = !!active;
  }, [active]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ x, y, rotate, width: CARD_W, height: CARD_H }}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="pointer-events-none fixed top-0 left-0 z-30 overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-[0_24px_80px_-16px_rgba(0,0,0,0.6)] will-change-transform"
    >
      {items.map((item) => (
        <Image
          key={item.slug}
          src={`/previews/${item.slug}.jpg`}
          alt=""
          width={720}
          height={480}
          sizes="360px"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            active === item.slug ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </m.div>
  );
}
