"use client";

import { m, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
// power2.inOut — documented deviation: the scroll cue is a symmetric loop
const CUE_EASE: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

interface HeroProps {
  name: string;
  tagline: string;
  availability: string;
  location: string;
}

export function Hero({ name, tagline, availability, location }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const nameLines = name.split(" ");

  return (
    <section className="relative flex min-h-svh flex-col justify-center">
      <div className="mx-auto w-full max-w-7xl px-6 pb-32 pt-28 md:px-10">
        <h1 className="font-heading text-[clamp(3.2rem,12vw,11rem)] font-bold leading-[0.92] tracking-tight">
          {nameLines.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <m.span
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  y: { duration: reducedMotion ? 0 : 0.9, ease: EASE },
                  opacity: { duration: reducedMotion ? 0.4 : 0.35 },
                  delay: reducedMotion ? 0 : index * 0.12,
                }}
              >
                {line}{" "}
              </m.span>
            </span>
          ))}
        </h1>
        <m.p
          className="mt-8 text-xl text-accent md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            y: { duration: reducedMotion ? 0 : 0.8, ease: EASE },
            opacity: { duration: reducedMotion ? 0.4 : 0.8, ease: EASE },
            delay: reducedMotion ? 0.05 : 0.55,
          }}
        >
          {tagline}
        </m.p>
        <m.p
          className="mt-4 text-sm text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            y: { duration: reducedMotion ? 0 : 0.8, ease: EASE },
            opacity: { duration: reducedMotion ? 0.4 : 0.8, ease: EASE },
            delay: reducedMotion ? 0.1 : 0.7,
          }}
        >
          {availability}
          {" · "}
          {location}
        </m.p>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-7xl px-6 pb-10 md:px-10">
          <m.div
            className="flex flex-col items-start gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0.4 : 0.8,
              ease: EASE,
              delay: reducedMotion ? 0.1 : 1.05,
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Scroll
            </span>
            <m.span
              className="block h-10 w-px origin-top bg-muted/60"
              aria-hidden="true"
              animate={reducedMotion ? undefined : { scaleY: [1, 0.35, 1] }}
              transition={
                reducedMotion
                  ? undefined
                  : { duration: 2.4, ease: CUE_EASE, repeat: Infinity }
              }
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
