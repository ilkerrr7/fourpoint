"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

/**
 * Tells CSS whether a time-based effect is on screen: renders
 * data-live="on" while the element is in view and "off" otherwise (and in the
 * server HTML, so the pre-hydration state is the static one). effects.css only
 * starts its infinite loops under [data-live="on"], so nothing animates while
 * off screen. Uses Motion's IntersectionObserver hook: no scroll listeners,
 * no per-frame work.
 */
export function InViewGate({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -8% 0px" });

  return (
    <div ref={ref} className={className} data-live={inView ? "on" : "off"} aria-hidden="true">
      {children}
    </div>
  );
}
