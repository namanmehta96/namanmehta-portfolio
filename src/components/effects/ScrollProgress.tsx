"use client";

import { useEffect, useState } from "react";
import { m, useScroll } from "framer-motion";

/**
 * 2px amber reading-progress line fixed at the very top of the viewport,
 * filling left-to-right with scroll. Functional, not decorative — it reflects
 * position, so it stays active under prefers-reduced-motion. Hidden on pages
 * with no scrollable overflow (framer resolves progress to 1 there, which
 * would show a full bar on an unread page).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    const update = () =>
      setScrollable(
        document.documentElement.scrollHeight > window.innerHeight + 1,
      );
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress, opacity: scrollable ? 1 : 0 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
    />
  );
}
