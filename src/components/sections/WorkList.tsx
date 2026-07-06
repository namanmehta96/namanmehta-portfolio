"use client";

import { Fragment } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

const MotionLink = m.create(Link);
// power2.out
const HOVER_EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

function ArrowUpRight() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

interface WorkListProps {
  caseStudies: Pick<CaseStudy, "slug" | "title" | "oneLiner" | "tech" | "accent">[];
  note: { title: string; body: string } | null;
}

export function WorkList({ caseStudies, note }: WorkListProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section id="work" className="scroll-mt-24 py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span
              className="text-xs tracking-[0.25em] text-accent tabular-nums"
              aria-hidden="true"
            >
              01
            </span>
            <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
              Selected Work
            </h2>
            <span className="h-px flex-1 bg-foreground/10" aria-hidden="true" />
          </div>
        </Reveal>
        <div className="mt-12">
          {caseStudies.map((project, index) => (
            <Reveal key={project.slug}>
              <MotionLink
                href={`/work/${project.slug}`}
                className={`group block border-t border-foreground/10 py-[clamp(2.5rem,5vw,4rem)]${
                  index === caseStudies.length - 1 ? " border-b" : ""
                }`}
                whileHover={reducedMotion ? undefined : { scale: 1.01 }}
                whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.3, ease: HOVER_EASE }}
              >
                <div className="grid grid-cols-[1fr_auto] items-start gap-y-4 md:grid-cols-[4rem_1fr_auto] md:gap-x-10 md:gap-y-5">
                  <div className="flex items-baseline gap-3 md:col-start-1 md:row-start-1 md:flex-col md:gap-2 md:pt-2">
                    <span
                      className={`text-sm tabular-nums transition-colors duration-250 ${
                        project.accent
                          ? "text-accent"
                          : "text-muted group-hover:text-foreground group-focus-visible:text-foreground"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.accent && (
                      <span className="text-xs uppercase tracking-[0.25em] text-accent">
                        Featured
                      </span>
                    )}
                  </div>
                  <span
                    className="justify-self-end text-muted transition-[transform,color] duration-250 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:text-foreground md:col-start-3 md:row-start-1 md:mt-2"
                    aria-hidden="true"
                  >
                    <ArrowUpRight />
                  </span>
                  <h3 className="col-span-2 font-heading text-[clamp(2.2rem,6vw,4.8rem)] font-bold leading-none tracking-tight md:col-span-1 md:col-start-2 md:row-start-1">
                    <span
                      className={`relative inline-block ${
                        project.accent ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {project.title}
                      <span
                        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        aria-hidden="true"
                      />
                    </span>
                  </h3>
                  <p className="col-span-2 max-w-xl text-muted md:col-span-1 md:col-start-2 md:row-start-2">
                    {project.oneLiner}
                  </p>
                  <p className="col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.25em] text-muted md:col-span-1 md:col-start-2 md:row-start-3">
                    {project.tech.map((tag, tagIndex) => (
                      <Fragment key={tag}>
                        {tagIndex > 0 && <span aria-hidden="true">·</span>}
                        <span>{tag}</span>
                      </Fragment>
                    ))}
                  </p>
                </div>
              </MotionLink>
            </Reveal>
          ))}
        </div>
        {note && (
          <Reveal>
            <div className="grid grid-cols-1 gap-y-3 border-b border-foreground/10 py-[clamp(2rem,4vw,3rem)] md:grid-cols-[4rem_1fr] md:gap-x-10 md:gap-y-0">
              <span className="text-xs uppercase tracking-[0.25em] text-muted md:pt-1">
                NDA
              </span>
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground/90 md:text-xl">
                  {note.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {note.body}
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
