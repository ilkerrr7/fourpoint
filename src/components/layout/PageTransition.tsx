"use client";

import { ViewTransition } from "react";

/**
 * Cinematic page-to-page transition, built on React's `ViewTransition`
 * component (bundled with Next.js 16's App Router — it integrates the
 * browser's native View Transitions API, no extra dependency required).
 *
 * `ViewTransition` is still a React-canary/experimental API. Every
 * page.tsx wraps its content with this component, so this file is the
 * ONLY place that imports it — to disable or remove the feature entirely,
 * change the return below to `return <>{children}</>;` (or delete this
 * file and drop the import from each page.tsx). No other file needs to
 * change either way.
 *
 * Non-directional by design: the same short wipe plays on every
 * navigation (no forward/back tagging on individual links, which would
 * touch every internal <Link> across the site). Reduced motion collapses
 * the wipe to an instant swap via the media query below — the browser's
 * default behavior when a transition has no animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        ::view-transition-old(.page-wipe) {
          animation: page-wipe-exit 180ms ease-in both;
        }
        ::view-transition-new(.page-wipe) {
          animation: page-wipe-enter 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes page-wipe-exit {
          to {
            opacity: 0;
          }
        }
        @keyframes page-wipe-enter {
          from {
            clip-path: inset(0 0 100% 0);
            opacity: 0;
          }
          to {
            clip-path: inset(0 0 0% 0);
            opacity: 1;
          }
        }
        ::view-transition {
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          ::view-transition-old(.page-wipe),
          ::view-transition-new(.page-wipe) {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
      <ViewTransition enter="page-wipe" exit="page-wipe" default="none">
        {children}
      </ViewTransition>
    </>
  );
}
