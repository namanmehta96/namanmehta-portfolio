import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies, engagementNote } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";

export const metadata: Metadata = {
  title: engagementNote.title,
  description: engagementNote.body,
};

const sections = [
  { label: "The engagement", text: engagementNote.engagement },
  { label: "How we worked", text: engagementNote.howWeWorked },
  { label: "What I did", text: engagementNote.whatIDid },
  { label: "Why there's nothing to click", text: engagementNote.whyNothingToClick },
];

/**
 * Quieter engagement template: no live/repo buttons, no tech tags, no
 * recognition, no progress spine or section counters — the substance is
 * under NDA, so the page stays deliberately restrained.
 */
export default function AmadeusPage() {
  const prev = caseStudies[caseStudies.length - 1];

  return (
    <article className="pt-36 md:pt-44">
      <header className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              Consulting Engagement · NDA
            </span>
            <Rule className="flex-1" />
          </div>
          <h1 className="mt-12 max-w-4xl font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            {engagementNote.title}
          </h1>
          <p className="mt-6 text-sm text-muted md:text-base">
            {engagementNote.subtitle}
          </p>
        </Reveal>
      </header>

      <div className="mx-auto w-full max-w-7xl px-6 pb-[clamp(3rem,8vw,7rem)] md:px-10">
        {sections.map((section) => (
          <section key={section.label} className="pt-[clamp(3rem,6vw,5rem)]">
            <Reveal>
              <div className="flex items-center gap-4">
                <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
                  {section.label}
                </h2>
                <Rule className="flex-1" />
              </div>
              <p className="mt-12 max-w-prose text-lg leading-relaxed text-foreground">
                {section.text}
              </p>
            </Reveal>
          </section>
        ))}
      </div>

      <nav aria-label="More work" className="border-t border-foreground/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10">
          <Reveal>
            <Link
              href={`/work/${prev.slug}`}
              className="group flex min-h-11 flex-col items-start gap-2"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Previous
              </span>
              <span className="relative inline-block font-heading text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {prev.title}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </nav>
    </article>
  );
}
