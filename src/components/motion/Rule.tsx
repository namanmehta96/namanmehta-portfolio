"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Hairline rule that draws in (scaleX 0 -> 1, origin left) when scrolled into view. */
export function Rule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          duration: 0.4,
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`block h-px bg-foreground/10 ${className}`}
    />
  );
}
