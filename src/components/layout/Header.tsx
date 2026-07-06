import Link from "next/link";
import { site } from "@/data/site";
import { NavLinks } from "@/components/layout/NavLinks";

export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-5 focus:z-50 focus:rounded-full focus:bg-background focus:px-5 focus:py-3 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>
      <header className="header-scrim pointer-events-none fixed inset-x-0 top-0 z-40 pb-10">
        <div className="pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-heading font-medium text-foreground"
          >
            {site.name}
          </Link>
          <nav aria-label="Primary">
            <NavLinks />
          </nav>
        </div>
      </header>
    </>
  );
}
