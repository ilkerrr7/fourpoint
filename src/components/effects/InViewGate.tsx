"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

export type GateMargin = NonNullable<NonNullable<Parameters<typeof useInView>[1]>["margin"]>;

/**
 * Tells CSS whether a time-based effect is on screen: renders
 * data-live="on" while the element is in view and "off" otherwise (and in the
 * server HTML, so the pre-hydration state is the static one). effects.css only
 * starts its infinite loops under [data-live="on"], so nothing animates while
 * off screen. Uses Motion's IntersectionObserver hook: no scroll listeners,
 * no per-frame work.
 *
 * `active` (default true) is a second switch for the caller: false keeps the
 * effect in its static state even on screen (the service diagrams: only the
 * active row's drawing moves). `margin` narrows the band that counts as "on
 * screen" (an IntersectionObserver rootMargin).
 */
export function InViewGate({
  className,
  children,
  active = true,
  margin = "0px 0px -8% 0px",
}: {
  className?: string;
  children: ReactNode;
  active?: boolean;
  margin?: GateMargin;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin });

  return (
    <div ref={ref} className={className} data-live={inView && active ? "on" : "off"} aria-hidden="true">
      {children}
    </div>
  );
}
