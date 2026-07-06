"use client";

import { useRef } from "react";
import { animate, m, useMotionValue, useReducedMotion } from "framer-motion";

const MAX_OFFSET = 10;
const STRENGTH = 0.3;
const RETURN_EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function MagneticButton({
  href,
  children,
  className,
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const restRect = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reducedMotion = useReducedMotion();

  function handlePointerEnter(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    restRect.current = ref.current?.getBoundingClientRect() ?? null;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = restRect.current;
    if (!rect) return;
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) * STRENGTH;
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) * STRENGTH;
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY)));
  }

  function handlePointerLeave() {
    restRect.current = null;
    animate(x, 0, { duration: 0.3, ease: RETURN_EASE });
    animate(y, 0, { duration: 0.3, ease: RETURN_EASE });
  }

  return (
    <m.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </m.a>
  );
}
