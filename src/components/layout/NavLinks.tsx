"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#work", label: "Work", path: "/" },
  { href: "/about", label: "About", path: "/about" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {links.map(({ href, label, path }) => {
        const isActive = pathname === path;
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-h-11 items-center px-3 text-sm transition-colors duration-200 hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
