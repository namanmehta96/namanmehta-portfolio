import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Counter } from "@/components/motion/Counter";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

function pad(index: number): string {
  return String(index).padStart(2, "0");
}

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLiner,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const index = caseStudies.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? caseStudies[index - 1] : null;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;

  const sections = [
    { label: "Problem", text: project.problem },
    { label: "Approach", text: project.approach },
    { label: "Outcome", text: project.outcome },
  ];

  return (
    <article className="pt-36 md:pt-44">
      <header className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <Counter
              value={index + 1}
              className="text-xs tracking-[0.25em] text-accent tabular-nums"
            />
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              Case Study
            </span>
            <Rule className="flex-1" />
          </div>
          <h1
            className={`mt-12 font-heading text-[clamp(2.6rem,7.5vw,7rem)] font-bold leading-[0.95] tracking-tight ${
              project.accent ? "text-accent" : "text-foreground"
            }`}
          >
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted md:text-2xl">
            {project.oneLiner}
          </p>
          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.25em] text-muted">
            {project.tech.map((tag, tagIndex) => (
              <li key={tag} className="flex items-center gap-x-3">
                {tagIndex > 0 && <span aria-hidden="true">&middot;</span>}
                {tag}
              </li>
            ))}
          </ul>
          {project.recognition && (
            <p className="mt-6 text-sm text-accent">{project.recognition}</p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-8 py-4 text-background transition-colors duration-250 hover:bg-accent/85 focus-visible:bg-accent/85"
            >
              View live
              <ArrowUpRight />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/60 px-8 py-4 text-accent transition-colors duration-250 hover:bg-accent hover:text-background focus-visible:bg-accent focus-visible:text-background"
            >
              View repository
              <ArrowUpRight />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </Reveal>
      </header>

      <div className="mx-auto w-full max-w-7xl px-6 pb-[clamp(3rem,8vw,7rem)] md:px-10">
        {sections.map((section, sectionIndex) => (
          <section key={section.label} className="pt-[clamp(3rem,8vw,7rem)]">
            <Reveal>
              <div className="flex items-center gap-4">
                <Counter
                  value={sectionIndex + 1}
                  className="text-xs tracking-[0.25em] text-accent tabular-nums"
                />
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

        <section className="pt-[clamp(3rem,8vw,7rem)]">
          <Reveal>
            <div className="flex items-center gap-4">
              <Counter
                value={sections.length + 1}
                className="text-xs tracking-[0.25em] text-accent tabular-nums"
              />
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
                Learnings
              </h2>
              <Rule className="flex-1" />
            </div>
            <ul className="mt-6 max-w-prose divide-y divide-foreground/10">
              {project.learnings.map((learning, learningIndex) => (
                <li key={learningIndex} className="flex gap-6 py-10">
                  <span className="pt-1 font-heading text-sm font-medium tabular-nums text-accent">
                    {pad(learningIndex + 1)}
                  </span>
                  <p className="text-lg leading-relaxed text-foreground">
                    {learning}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>

      <nav
        aria-label="More case studies"
        className="border-t border-foreground/10"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10">
          <Reveal>
            <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              {prev ? (
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
              ) : (
                <span aria-hidden="true" className="hidden sm:block" />
              )}
              {next && (
                <Link
                  href={`/work/${next.slug}`}
                  className="group flex min-h-11 flex-col items-start gap-2 sm:items-end sm:text-right"
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-muted">
                    Next
                  </span>
                  <span className="relative inline-block font-heading text-xl font-medium tracking-tight text-foreground md:text-2xl">
                    {next.title}
                    <span
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </nav>
    </article>
  );
}
