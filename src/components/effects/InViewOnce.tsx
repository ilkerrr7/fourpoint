"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

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
 * "Seen" means the element has reached the band between the top of the
 * viewport and `margin` (an IntersectionObserver rootMargin) — or is already
 * above it, as after a reload that restores a scroll position or an anchor
 * jump: those pieces are treated as passed, so nothing above the fold is
 * left rewound. effects.css uses this for the cable joints in browsers
 * without scroll timelines (Firefox, Safari before 26 — which is most
 * iPhones) and for the light line's rails and curves.
 */
export function InViewOnce({
  className,
  style,
  margin = "0px 0px -30% 0px",
  children,
}: {
  className?: string;
  style?: CSSProperties;
  /** IntersectionObserver rootMargin: where on screen "seen" starts */
  margin?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootTop = entry.rootBounds?.top ?? 0;
        if (entry.isIntersecting || entry.boundingClientRect.bottom < rootTop) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className} style={style} data-live={hydrated ? (seen ? "on" : "wait") : undefined}>
      {children}
    </div>
  );
}
