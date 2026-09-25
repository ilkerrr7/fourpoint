"use client";

import { useTilt } from "@/hooks/useTilt";

interface FourPointMarkProps {
  className?: string;
  /** False for purely decorative uses (e.g. a watermark) — skips the tilt entirely. */
  interactive?: boolean;
}

/**
 * The Four Point compass mark, rendered as inline SVG so it can be
 * CSS-3D-tilted. Tilt is scroll-linked (base motion) plus a pointer-follow
 * offset on hover-capable desktops — see useTilt for the disable rules
 * (reduced motion, mobile, low-power devices).
 */
export function FourPointMark({ className = "", interactive = true }: FourPointMarkProps) {
  const tiltRef = useTilt<HTMLDivElement>(interactive);

  return (
    <div className={`inline-block ${className}`} style={interactive ? { perspective: "900px" } : undefined}>
      <div
        ref={tiltRef}
        style={interactive ? { transformStyle: "preserve-3d", willChange: "transform" } : undefined}
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
          <path
            fillRule="evenodd"
            fill="var(--color-fg)"
            opacity="0.12"
            d="M24 9.25a14.75 14.75 0 1 1 0 29.5 14.75 14.75 0 0 1 0-29.5Zm0 1.5a13.25 13.25 0 1 0 0 26.5 13.25 13.25 0 0 0 0-26.5Z"
          />
          <path fill="var(--color-fg)" d="M24 2l-4 22h4Z" />
          <path fill="var(--color-accent)" d="M24 2v22h4Z" />
          <path fill="var(--color-fg)" d="M40 24l-16-4v4Z" />
          <path fill="var(--color-accent)" d="M40 24H24v4Z" />
          <path fill="var(--color-fg)" d="M24 46l4-22h-4Z" />
          <path fill="var(--color-accent)" d="M24 46V24h-4Z" />
          <path fill="var(--color-fg)" d="M8 24l16 4v-4Z" />
          <path fill="var(--color-accent)" d="M8 24h16v-4Z" />
          <path fill="var(--color-fg)" opacity="0.7" d="M35 13l-7 5 2 2Z" />
        </svg>
      </div>
    </div>
  );
}
