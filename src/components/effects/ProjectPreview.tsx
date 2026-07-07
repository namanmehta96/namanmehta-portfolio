"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useMotionValue } from "framer-motion";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const CARD_W = 340;
const CARD_H = 221;
const MARGIN = 24;

interface PreviewItem {
  slug: string;
  title: string;
}

export interface HoveredRow {
  slug: string;
  row: HTMLElement;
}

interface ProjectPreviewProps {
  items: PreviewItem[];
  active: HoveredRow | null;
}

/**
 * Floating CARD_W x CARD_H preview card. Follows the cursor with lerp + velocity tilt,
 * but is constrained so it never covers the hovered row's own title (stays
 * below its baseline) or oneLiner/tags (stays to their right), clamped to the
 * viewport. Renders above everything including the grain overlay. Desktop
 * fine-pointer only; disabled under prefers-reduced-motion.
 */
export function ProjectPreview({ items, active }: ProjectPreviewProps) {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-CARD_W);
  const y = useMotionValue(-CARD_H);
  const rotate = useMotionValue(0);
  const target = useRef({ x: -CARD_W, y: -CARD_H });
  const pos = useRef({ x: -CARD_W, y: -CARD_H });
  const bounds = useRef<{ title: Element | null; copy: Element[] }>({
    title: null,
    copy: [],
  });
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

  // Cache the hovered row's text elements; their rects are read per frame so
  // the constraints stay correct while the page scrolls under the cursor.
  useEffect(() => {
    if (active) {
      bounds.current.title = active.row.querySelector("[data-row-title]");
      bounds.current.copy = Array.from(
        active.row.querySelectorAll("[data-row-copy]"),
      );
      if (!wasActive.current) {
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
      }
    } else {
      bounds.current.title = null;
      bounds.current.copy = [];
    }
    wasActive.current = !!active;
  }, [active]);

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

      // desired: card centered right of the cursor
      let cardX = p.x + 36;
      let cardY = p.y - CARD_H / 2;

      // constraints against the hovered row's own text
      const { title, copy } = bounds.current;
      let minX = MARGIN;
      if (copy.length) {
        minX = Math.max(
          minX,
          ...copy.map((el) => el.getBoundingClientRect().right + MARGIN),
        );
      }
      const maxX = window.innerWidth - CARD_W - MARGIN;
      cardX = Math.min(Math.max(cardX, Math.min(minX, maxX)), maxX);

      const maxY = window.innerHeight - CARD_H - MARGIN;
      const titleRect = title?.getBoundingClientRect();
      if (titleRect) {
        const below = titleRect.bottom + 16;
        const above = titleRect.top - 16 - CARD_H;
        if (below <= maxY) {
          cardY = Math.min(Math.max(cardY, below), maxY);
        } else if (above >= MARGIN) {
          // no room below the title in the viewport: flip above it
          cardY = Math.min(Math.max(cardY, MARGIN), above);
        } else {
          cardY = Math.min(Math.max(cardY, MARGIN), maxY);
        }
      } else {
        cardY = Math.min(Math.max(cardY, MARGIN), maxY);
      }

      x.set(cardX);
      y.set(cardY);
      const velocity = p.x - prevX;
      rotate.set(Math.max(-5, Math.min(5, velocity * 0.25)));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled, x, y, rotate]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ x, y, rotate, width: CARD_W, height: CARD_H }}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.94 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="pointer-events-none fixed top-0 left-0 z-[60] overflow-hidden rounded-lg border border-foreground/15 bg-background shadow-[0_32px_100px_-20px_rgba(0,0,0,0.75)] will-change-transform"
    >
      {items.map((item) => (
        <Image
          key={item.slug}
          src={`/previews/${item.slug}.jpg`}
          alt=""
          width={720}
          height={480}
          sizes="340px"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            active?.slug === item.slug ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </m.div>
  );
}
