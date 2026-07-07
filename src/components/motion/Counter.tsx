"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CounterProps {
  value: number;
  className?: string;
  /**
   * Tick to amber once the surrounding section scrolls past (reading
   * progress). Functional, so it stays active under prefers-reduced-motion —
   * the color change is simply instant there (global reduced-motion CSS
   * zeroes the transition).
   */
  tick?: boolean;
}

/**
 * Zero-padded section index that briefly counts up from 00 when it enters
 * the viewport. Server-renders the final value (no-JS and SEO safe); GSAP
 * takes over the text content on the client, so React never re-renders it.
 */
export function Counter({ value, className, tick = false }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (tick) {
        // trigger on the number itself so ticks align with a ProgressSpine
        // whose fill tip tracks the same 55%-viewport line
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          onEnter: () => {
            el.style.color = "var(--accent)";
          },
          onLeaveBack: () => {
            el.style.color = "";
          },
        });
      }
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { v: 0 };
        gsap.to(state, {
          v: value,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onStart: () => {
            el.textContent = "00";
          },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v)).padStart(2, "0");
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {String(value).padStart(2, "0")}
    </span>
  );
}
