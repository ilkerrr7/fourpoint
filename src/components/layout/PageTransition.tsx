"use client";

import { ViewTransition } from "react";

/**
 * Page-to-page transition, built on React's `ViewTransition` component
 * (bundled with Next.js 16's App Router — it integrates the browser's native
 * View Transitions API, no extra dependency required).
 *
 * Short on purpose: a transition seen on every click has to feel instant.
 * The outgoing page fades in 150ms while the incoming one rises 8px and fades
 * in over 240ms on an expo-out curve (fast start, soft landing) — they overlap,
 * so the whole swap is ~240ms. Only opacity and transform animate.
 *
 * `ViewTransition` is still a React-canary/experimental API. Every page.tsx
 * wraps its content with this component, so this file is the ONLY place that
 * imports it — to disable the feature, change the return below to
 * `return <>{children}</>;`. No other file needs to change.
 *
 * Reduced motion collapses it to an instant swap.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        ::view-transition-old(.page-wipe) {
          animation: page-out 150ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        ::view-transition-new(.page-wipe) {
          animation: page-in 240ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes page-out {
          to {
            opacity: 0;
          }
        }
        @keyframes page-in {
          from {
            opacity: 0;
            transform: translateY(8px);
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
