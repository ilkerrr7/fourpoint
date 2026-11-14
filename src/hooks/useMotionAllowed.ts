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
 *
 * `phones: true` keeps the rule but lifts the narrow-viewport cut, for
 * effects cheap enough to run on a phone (transform-only loops on a few
 * layers, see AmbientField). Reduced motion, data saver and low memory
 * still switch those off.
 */
export function useMotionAllowed({ phones = false }: { phones?: boolean } = {}): boolean {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (prefersReducedMotion || (isMobile && !phones)) return false;

  if (typeof navigator !== "undefined") {
    const nav = navigator as NavigatorWithHints;
    // Under 4 GB only. The old "<= 4" also switched motion off on ordinary
    // 4 GB Windows laptops, which handle a transform-only tilt without effort.
    if ((nav.deviceMemory ?? Infinity) < 4) return false;
    if (nav.connection?.saveData) return false;
  }

  return true;
}
