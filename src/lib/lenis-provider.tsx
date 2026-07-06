"use client";

import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { LazyMotion, domAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function GsapTicker() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const content = (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );

  if (reducedMotion) {
    return content;
  }

  return (
    <ReactLenis root options={{ autoRaf: false, stopInertiaOnNavigate: true }}>
      <GsapTicker />
      {content}
    </ReactLenis>
  );
}
