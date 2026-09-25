"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The dark sweep that plays alongside the page-level ViewTransition wipe
 * (see PageTransition.tsx). Lives once in the root layout, outside the
 * per-page <ViewTransition> tree, so it never unmounts/remounts and does
 * nothing on first paint.
 *
 * Synced to navigation via `usePathname()` rather than ViewTransition's
 * own lifecycle callbacks: those are still an undocumented, unstable part
 * of this React-canary API, while `usePathname` is stable and — because
 * it comes from Next's router state, not a click handler — fires
 * identically for <Link> clicks, back/forward, and router.push(). Timed
 * to roughly overlap PageTransition's CSS duration (~800ms total).
 */
export function Curtain() {
  const pathname = usePathname();
  // Both start equal, so the first run below is a no-op — nothing plays on
  // initial load, only on a pathname change after that.
  const previousPathname = useRef(pathname);
  const controls = useAnimation();

  useEffect(() => {
    if (pathname === previousPathname.current) return;
    previousPathname.current = pathname;

    const sequence = async () => {
      await controls.start({
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: 0.32, ease: EASE_OUT_EXPO },
      });
      await controls.start({
        clipPath: "inset(0 100% 0 0)",
        transition: { duration: 0.42, ease: EASE_OUT_EXPO, delay: 0.05 },
      });
      controls.set({ clipPath: "inset(0 0 100% 0)" });
    };

    sequence();
  }, [pathname, controls]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none bg-ink"
      style={{ clipPath: "inset(0 0 100% 0)" }}
      animate={controls}
      aria-hidden="true"
    >
      <div className="film-grain" />
    </motion.div>
  );
}
