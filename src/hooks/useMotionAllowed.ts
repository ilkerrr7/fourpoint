"use client";

import { useMediaQuery } from "./useMediaQuery";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Whether ambient/decorative motion (continuous loops, 3D tilt) should run
 * at all — not just be visually simplified. False under reduced motion, on
 * narrow/mobile viewports, or on low-power/data-saver devices. Shared by
 * useTilt (FourPointMark) and the Automation section's scan-line loop so
 * the gating rule lives in exactly one place.
 */
export function useMotionAllowed(): boolean {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (prefersReducedMotion || isMobile) return false;

  if (typeof navigator !== "undefined") {
    const nav = navigator as NavigatorWithHints;
    if ((nav.deviceMemory ?? Infinity) <= 4) return false;
    if (nav.connection?.saveData) return false;
  }

  return true;
}
