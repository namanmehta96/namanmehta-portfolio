import type { Metadata } from "next";
import { site, achievements } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Counter } from "@/components/motion/Counter";
import { Timeline } from "@/components/sections/Timeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Seven years in data infrastructure for Morgan Stanley and the Election Commission of India, now finishing an MBA in AI & Innovation at EDHEC.",
};

// Split the bio verbatim at sentence boundaries: a lede plus 1-2 supporting paragraphs.
const bioSentences = site.bio.split(/(?<=\.)\s+(?=[A-Z])/);
const bioLede = bioSentences[0] ?? site.bio;
const bioRest = bioSentences.slice(1);
const bioParagraphs =
  bioRest.length > 1 ? [bioRest[0], bioRest.slice(1).join(" ")] : bioRest;

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pb-[clamp(4rem,10vw,8rem)] pt-36 md:px-10 md:pt-44">
        <h1 className="sr-only">About {site.name}</h1>
        <div className="flex items-center gap-4">
          <Counter
            value={1}
            className="text-xs tracking-[0.25em] text-accent tabular-nums"
          />
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            About
          </span>
          <Rule className="flex-1" />
        </div>
        <Reveal className="mt-12 md:mt-16" stagger={0.12}>
          <p className="max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl">
            {bioLede}
          </p>
          {bioParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-6 max-w-prose text-lg leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}
          <p className="mt-10 text-sm text-muted">
            {site.location} &middot; {site.availability}
          </p>
        </Reveal>
      </section>

      <Timeline index={2} />

      <SkillsGrid index={3} />

      <section className="mx-auto w-full max-w-7xl px-6 py-[clamp(4rem,10vw,8rem)] md:px-10">
        <div className="flex items-center gap-4">
          <Counter
            value={4}
            className="text-xs tracking-[0.25em] text-accent tabular-nums"
          />
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
            Achievements
          </h2>
          <Rule className="flex-1" />
        </div>
        <Reveal className="mt-12 md:mt-16">
          <ol className="space-y-8">
            {achievements.map((achievement, index) => (
              <li
                key={achievement}
                className="flex items-baseline gap-5 md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-sm font-medium tabular-nums text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-3xl text-lg leading-relaxed md:text-xl">
                  {achievement}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 pb-[clamp(4rem,10vw,8rem)] md:px-10">
        <Reveal>
          <p className="max-w-2xl border-l-2 border-accent pl-5 text-base leading-relaxed text-muted">
            {site.personalLine}
          </p>
        </Reveal>
      </div>
    </>
  );
}
