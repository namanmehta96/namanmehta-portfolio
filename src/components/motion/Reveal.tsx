"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  stagger,
  once = true,
}: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = container.current;
      if (!element) return;

      const targets =
        stagger !== undefined ? Array.from(element.children) : element;
      if (Array.isArray(targets) && targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(targets, {
          opacity: 0,
          duration: 0.4,
          delay,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
