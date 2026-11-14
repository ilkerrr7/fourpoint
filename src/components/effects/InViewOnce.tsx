"use client";

import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";

const subscribe = () => () => {};

/**
 * One-shot counterpart of InViewGate, for effects that play once when they
 * come on screen. Three states on data-live:
 *
 *   (absent)  server HTML and before hydration: CSS shows the finished state,
 *             so a page whose JS never runs is still complete
 *   "wait"    hydrated, not seen yet: CSS may rewind the effect
 *   "on"      seen: CSS plays it, and it stays "on"
 *
 * effects.css uses this for the cable joints in browsers without scroll
 * timelines (Firefox, Safari before 26 — which is most iPhones).
 */
export function InViewOnce({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  // fires when the element is well inside the viewport, not at its edge
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });

  return (
    <div ref={ref} className={className} style={style} data-live={hydrated ? (inView ? "on" : "wait") : undefined}>
      {children}
    </div>
  );
}
