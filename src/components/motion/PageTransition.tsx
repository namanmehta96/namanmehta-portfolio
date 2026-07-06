"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

let hasMounted = false;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [skipInitial] = useState(() => !hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <m.div
      initial={skipInitial ? false : { opacity: 0, y: reducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </m.div>
  );
}
