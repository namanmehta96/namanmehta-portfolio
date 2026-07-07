"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Counter } from "@/components/motion/Counter";
import { SplitChars } from "@/components/motion/SplitChars";
import { ProgressSpine } from "@/components/motion/ProgressSpine";
import { SpineNode } from "@/components/motion/SpineNode";
import { ProjectPreview, type HoveredRow } from "@/components/effects/ProjectPreview";

const MotionLink = m.create(Link);
// power2.out
const HOVER_EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const CHAR_HOVER =
  "transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-[0.06em] group-focus-visible:-translate-y-[0.06em]";

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
  caseStudies: Pick<
    CaseStudy,
    "slug" | "title" | "oneLiner" | "tech" | "accent" | "recognition"
  >[];
  note: { title: string; body: string } | null;
}

export function WorkList({ caseStudies, note }: WorkListProps) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<HoveredRow | null>(null);

  const dimmed = (isHovered: boolean) =>
    `transition-opacity duration-300 ${hovered && !isHovered ? "opacity-55" : ""}`;

  return (
    <section id="work" className="relative z-[26] scroll-mt-24 py-[clamp(4rem,10vw,8rem)]">
      {/* spotlight: dims everything outside this section while a row is hovered */}
      <m.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: HOVER_EASE }}
        className="pointer-events-none fixed inset-0 z-[-1] bg-background/25"
      />
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className={dimmed(false)}>
          <Reveal>
            <div className="flex items-center gap-4">
              <Counter
                value={1}
                className="text-xs tracking-[0.25em] text-accent tabular-nums"
              />
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
                Selected Work
              </h2>
              <Rule className="flex-1" />
            </div>
          </Reveal>
        </div>
        <div className="relative mt-[clamp(2.5rem,4vw,3.5rem)]">
          {/* -left-6: this wrapper sits inside the container padding, so the
              line lands at container-x + 16px, same as the case-study spine */}
          <ProgressSpine className="-left-6 hidden md:block" />
          {caseStudies.map((project, index) => (
            <Reveal key={project.slug}>
              <div className={`relative ${dimmed(hovered?.slug === project.slug)}`}>
                {/* outside the scaled MotionLink so it never slides off the
                    line on hover; center = row padding-top + index pt-3 (12px)
                    + half the text-sm line box (10px) */}
                <SpineNode className="top-[calc(clamp(2.5rem,5vw,4.25rem)+22px)] -left-[27.5px] hidden -translate-y-1/2 md:block" />
                <MotionLink
                  href={`/work/${project.slug}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse")
                      setHovered({ slug: project.slug, row: event.currentTarget });
                  }}
                  onPointerLeave={() => setHovered(null)}
                  className={`group block border-t border-foreground/10 py-[clamp(2.5rem,5vw,4.25rem)] ${
                    index === caseStudies.length - 1 ? "border-b" : ""
                  }`}
                  whileHover={reducedMotion ? undefined : { scale: 1.01 }}
                  whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
                  transition={{ duration: 0.3, ease: HOVER_EASE }}
                >
                  <div className="grid grid-cols-[1fr_auto] gap-y-6 md:grid-cols-[6rem_1fr_auto] md:gap-x-14">
                    <div className="flex items-baseline gap-3 md:flex-col md:gap-4 md:pt-3">
                      <Counter
                        value={index + 1}
                        className={`text-sm tabular-nums transition-colors duration-250 ${
                          project.accent
                            ? "text-accent"
                            : "text-muted group-hover:text-foreground group-focus-visible:text-foreground"
                        }`}
                      />
                      {project.accent && (
                        <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.25em] text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <span
                      className={`justify-self-end transition-[transform,color] duration-250 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 md:col-start-3 md:mt-3 ${
                        project.accent
                          ? "text-accent"
                          : "text-muted group-hover:text-foreground group-focus-visible:text-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowUpRight />
                    </span>
                    <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1">
                      {/* data-row-title wraps eyebrow + title so the preview
                          card's flip-above constraint clears the award too */}
                      <div data-row-title>
                        {project.recognition && (
                          <p className="mb-5 text-sm leading-relaxed text-accent md:text-base">
                            {project.recognition}
                          </p>
                        )}
                      <h3
                        className="font-heading text-[clamp(2.2rem,6vw,4.8rem)] font-bold leading-none tracking-tight"
                      >
                        <span className="sr-only">{project.title}</span>
                        <span
                          aria-hidden="true"
                          className={`relative inline-block ${
                            project.accent ? "text-accent" : "text-foreground"
                          }`}
                        >
                          <SplitChars
                            text={project.title}
                            charClassName={reducedMotion ? "" : CHAR_HOVER}
                            delayStep={reducedMotion ? 0 : 12}
                          />
                          <span
                            className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                            aria-hidden="true"
                          />
                        </span>
                      </h3>
                      </div>
                      <p
                        data-row-copy
                        className="mt-6 max-w-[55ch] text-muted leading-[1.8] md:mt-8"
                      >
                        {project.oneLiner}
                      </p>
                      <p
                        data-row-copy
                        className="mt-10 flex w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.25em] text-muted md:mt-12"
                      >
                        {project.tech.map((tag, tagIndex) => (
                          <Fragment key={tag}>
                            {tagIndex > 0 && <span aria-hidden="true">·</span>}
                            <span>{tag}</span>
                          </Fragment>
                        ))}
                      </p>
                      <div className="mt-6 hidden [@media(pointer:coarse)]:block">
                        <Image
                          src={`/previews/${project.slug}.jpg`}
                          alt={`${project.title} — live site preview`}
                          width={720}
                          height={480}
                          sizes="176px"
                          loading="lazy"
                          className="h-auto w-44 rounded-md border border-foreground/10"
                        />
                      </div>
                    </div>
                  </div>
                </MotionLink>
              </div>
            </Reveal>
          ))}
        </div>
        {note && (
          <Reveal>
            <div className={dimmed(false)}>
              <div className="grid grid-cols-1 gap-y-3 border-b border-foreground/10 py-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[6rem_1fr] md:gap-x-14 md:gap-y-0">
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
            </div>
          </Reveal>
        )}
      </div>
      <ProjectPreview
        items={caseStudies.map(({ slug, title }) => ({ slug, title }))}
        active={hovered}
      />
    </section>
  );
}
