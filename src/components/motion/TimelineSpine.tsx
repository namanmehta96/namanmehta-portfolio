"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Timeline spine: a static hairline with an amber line that draws downward,
 * scrubbed to scroll progress through the timeline. Under reduced motion the
 * amber line renders complete and static.
 */
export function TimelineSpine() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 70%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px">
      <span className="absolute inset-0 bg-foreground/15" />
      <span ref={ref} className="absolute inset-0 origin-top bg-accent/60 will-change-transform" />
    </span>
  );
}
