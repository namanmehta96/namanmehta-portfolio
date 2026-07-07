"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProgressSpineProps {
  /** Positioning/visibility classes (e.g. "left-3 hidden md:block"); the
   *  spine spans the full height of its positioned parent. */
  className?: string;
}

/**
 * Reading-progress spine: a static hairline whose amber fill draws downward,
 * scrubbed so its tip tracks the 55%-viewport line through the parent — the
 * same threshold the Counter section ticks fire at, so numbers turn amber
 * exactly as the fill reaches them. Functional, like the timeline spine.
 * Under reduced motion the fill stays empty (a full spine would read as
 * "already read") and the instant number ticks carry the progress.
 */
export function ProgressSpine({ className = "" }: ProgressSpineProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      // md+ only: below the breakpoint the spine is display:none, so a
      // trigger there would measure a zero rect and do per-scroll work for
      // an invisible element
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 48rem)",
        () => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top 55%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        },
      );
    },
    { scope: ref },
  );

  return (
    <span aria-hidden="true" className={`absolute inset-y-0 w-px ${className}`}>
      <span className="absolute inset-0 bg-foreground/15" />
      <span
        ref={ref}
        className="absolute inset-0 origin-top scale-y-0 bg-accent/60 will-change-transform"
      />
    </span>
  );
}
