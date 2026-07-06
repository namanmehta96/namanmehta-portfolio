import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Aurora } from "@/components/effects/Aurora";

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

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10">
      <Aurora intensity={0.5} />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-[clamp(4rem,10vw,8rem)] md:px-10">
        <h2 className="font-heading font-bold tracking-tight">
          <MagneticButton
            href={`mailto:${site.email}`}
            className="inline-block text-[clamp(2.75rem,7vw,6.5rem)] leading-none text-foreground transition-colors duration-250 hover:text-accent focus-visible:text-accent"
          >
            Let&rsquo;s talk
          </MagneticButton>
        </h2>
        <p className="mt-6 max-w-2xl text-muted">{site.availability}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center text-sm text-accent transition-colors duration-200 hover:text-foreground"
          >
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
            <ArrowUpRight />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            GitHub
            <span className="sr-only"> (opens in new tab)</span>
            <ArrowUpRight />
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-8 text-xs text-muted">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.location}</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
