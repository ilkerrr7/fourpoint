"use client";

import { useEffect, useRef } from "react";
import { usePointerField } from "@/hooks/usePointerField";
import { subscribePointer } from "@/lib/pointer-field";

/**
 * A pointer-lit disc inside its parent: a single-colour (elektrik, low
 * alpha) radial light under the cursor plus a faint glow on the edge line,
 * all clipped to the parent. The parent needs `position: relative`,
 * `isolation: isolate` and `overflow: hidden` (Card adds them with its
 * `spotlight` prop; rows add them by hand). Drawing is in effects.css.
 *
 * Nothing lifts, tilts or casts a shadow: the surface stays flat, only the
 * light moves. The layer sits under the content (z-index -1 inside the
 * parent's stacking context) and takes no pointer events.
 *
 * Work happens only while this parent is hovered: pointerenter measures
 * the parent once (document coordinates, so scrolling needs no re-read),
 * then the shared pointer field (lib/pointer-field) feeds --sx/--sy per
 * frame; pointerleave unsubscribes. Touch devices, reduced motion, the kill
 * switch and low-power devices never attach anything (usePointerField).
 */
export function Spotlight({ edge = "all", className = "" }: { edge?: "all" | "bottom"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = usePointerField();

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || !allowed) return;

    let left = 0;
    let top = 0;
    let unsubscribe: (() => void) | null = null;

    const onEnter = () => {
      const rect = host.getBoundingClientRect();
      left = rect.left + window.scrollX;
      top = rect.top + window.scrollY;
      unsubscribe?.();
      unsubscribe = subscribePointer((p) => {
        el.style.setProperty("--sx", `${p.pageX - left}px`);
        el.style.setProperty("--sy", `${p.pageY - top}px`);
      });
      el.dataset.on = "1";
    };
    const onLeave = () => {
      unsubscribe?.();
      unsubscribe = null;
      el.dataset.on = "0";
    };

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [allowed]);

  return <div ref={ref} className={`spotlight spotlight--${edge} ${className}`} aria-hidden="true" />;
}
