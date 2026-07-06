import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Counter } from "@/components/motion/Counter";

function ArrowRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

interface AboutTeaserProps {
  excerpt: string;
}

export function AboutTeaser({ excerpt }: AboutTeaserProps) {
  return (
    <section className="py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <Counter
              value={2}
              className="text-xs tracking-[0.25em] text-accent tabular-nums"
            />
            <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
              About
            </h2>
            <Rule className="flex-1" />
          </div>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {excerpt}
          </p>
          <Link
            href="/about"
            className="group mt-10 inline-flex min-h-11 items-center gap-3 font-heading text-2xl font-medium tracking-tight text-accent md:text-3xl"
          >
            <span className="relative">
              More about me
              <span
                className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                aria-hidden="true"
              />
            </span>
            <span
              className="transition-transform duration-250 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
              aria-hidden="true"
            >
              <ArrowRight />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
