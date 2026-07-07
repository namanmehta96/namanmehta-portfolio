"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SpineNodeProps {
  /** Positioning/visibility classes — the caller anchors the node on the
   *  spine line (and hides it below md where the spine is hidden). */
  className?: string;
}

/**
 * Circular node on a ProgressSpine: hollow (background-filled, so it masks
 * the line behind it) until the spine's 55%-viewport fill line reaches it,
 * then filled amber; reverses on scroll-back. Functional like the section
 * ticks, so it stays active under reduced motion — the global reduced-motion
 * CSS zeroes the color transition, making the fill instant.
 */
export function SpineNode({ className = "" }: SpineNodeProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      // md+ only (nodes are display:none below, and a hidden trigger would
      // measure a zero rect). Deliberately no reduced-motion condition:
      // the fill is functional and must stay active there — the global
      // reduced-motion CSS already makes the color change instant.
      mm.add("(min-width: 48rem)", () => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          onEnter: () => {
            el.style.backgroundColor = "var(--accent)";
            el.style.borderColor = "var(--accent)";
          },
          onLeaveBack: () => {
            el.style.backgroundColor = "";
            el.style.borderColor = "";
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`absolute h-2 w-2 rounded-full border border-foreground/30 bg-background transition-colors duration-250 ${className}`}
    />
  );
}
