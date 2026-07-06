import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
    <footer className="border-t border-foreground/10">
      <div className="mx-auto w-full max-w-7xl px-6 py-[clamp(4rem,10vw,8rem)] md:px-10">
        <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Let&rsquo;s talk
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{site.availability}</p>
        <div className="mt-10">
          <MagneticButton
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/60 px-8 py-4 text-accent transition-colors duration-250 hover:bg-accent hover:text-background focus-visible:bg-accent focus-visible:text-background"
          >
            {site.email}
          </MagneticButton>
        </div>
        <div className="mt-12 flex items-center gap-8">
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
