import type { CSSProperties } from "react";
import { InViewGate } from "./InViewGate";

/**
 * Two cables, one behaviour each — the whole meaning is the contrast:
 *
 *   right strand: continuous, unbroken, light packets at a constant rhythm
 *                 (the system: it does not tire)
 *   left strand : the same cable, but in pieces — gaps, uneven brightness,
 *                 segments that drop out and come back at irregular moments,
 *                 and no steady flow (human attention)
 *
 * Deliberately NOT data: no numbers, labels, axes, ticks, gridlines, markers,
 * frame or shared baseline; both strands run vertically as physical cables,
 * never as a plotted line. It says nothing quantitative because we have no
 * measurements to show. The static state (reduced motion, mobile fallback,
 * kill switch, before hydration) still reads: unbroken vs broken.
 *
 * Animation lives in effects.css and only runs while on screen (InViewGate).
 */

const VIEW_W = 440;
const VIEW_H = 560;

// Same cable language as CableJoint, running top to bottom off both edges.
const STEADY_D = "M292 -10 C292 110 236 150 244 250 C252 350 322 430 290 570";
const ERRATIC_D = "M150 -10 C150 100 200 138 190 236 C180 334 116 410 146 570";

// The broken strand: [start, end] as fractions of the path, base brightness,
// which flicker pattern it follows, and a negative delay so they never sync.
const segments = [
  { a: 0.0, b: 0.14, o: 1.0, f: "a", delay: 0 },
  { a: 0.19, b: 0.27, o: 0.5, f: "b", delay: -1.7 },
  { a: 0.3, b: 0.52, o: 0.85, f: "c", delay: -3.1 },
  { a: 0.58, b: 0.63, o: 0.35, f: "a", delay: -2.2 },
  { a: 0.69, b: 0.83, o: 0.7, f: "b", delay: -4.4 },
  { a: 0.86, b: 0.9, o: 0.3, f: "c", delay: -0.9 },
  { a: 0.94, b: 1.0, o: 0.55, f: "a", delay: -3.6 },
] as const;

// dash list that leaves the same gaps as `segments` (dash, gap, dash, gap, …)
const gapDashes = "0.14 0.05 0.08 0.03 0.22 0.06 0.05 0.06 0.14 0.03 0.04 0.04 0.06 3";

export function StrandCompare({ className = "" }: { className?: string }) {
  const box = `0 0 ${VIEW_W} ${VIEW_H}`;

  return (
    <InViewGate className={`strands ${className}`}>
      <svg viewBox={box} preserveAspectRatio="xMidYMid meet" className="strand-halo">
        <defs>
          <filter id="strand-blur" x="-30%" y="-5%" width="160%" height="110%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          {/* both cables fade in from and out into the dark at the frame edges
              (shared by all three layers below) */}
          <linearGradient id="strand-fade-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={VIEW_H}>
            <stop offset="0" style={{ stopColor: "var(--fx-line)", stopOpacity: 0 }} />
            <stop offset="0.14" style={{ stopColor: "var(--fx-line)", stopOpacity: 1 }} />
            <stop offset="0.86" style={{ stopColor: "var(--fx-line)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--fx-line)", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="strand-fade-hot" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={VIEW_H}>
            <stop offset="0" style={{ stopColor: "var(--fx-line-hot)", stopOpacity: 0 }} />
            <stop offset="0.14" style={{ stopColor: "var(--fx-line-hot)", stopOpacity: 1 }} />
            <stop offset="0.86" style={{ stopColor: "var(--fx-line-hot)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--fx-line-hot)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <g filter="url(#strand-blur)">
          <path d={STEADY_D} stroke="url(#strand-fade-line)" style={{ strokeOpacity: 0.2 }} />
          <path
            d={ERRATIC_D}
            pathLength={1}
            stroke="url(#strand-fade-line)"
            strokeDasharray={gapDashes}
            style={{ strokeOpacity: 0.12 }}
          />
        </g>
      </svg>

      {/* the system: one unbroken cable, packets of light at a fixed rhythm.
          Its own svg (and layer): the per-frame repaint of the flowing light
          never re-records the flickering strand. */}
      <svg viewBox={box} preserveAspectRatio="xMidYMid meet" className="strand-steady-svg">
        <g className="strand-steady">
          <path className="strand-line" d={STEADY_D} pathLength={1} stroke="url(#strand-fade-line)" />
          <path className="strand-packets-glow" d={STEADY_D} pathLength={1} stroke="url(#strand-fade-line)" />
          <path className="strand-packets" d={STEADY_D} pathLength={1} stroke="url(#strand-fade-hot)" />
        </g>
      </svg>

      {/* human attention: the same cable in pieces that drop out on their own clocks */}
      <svg viewBox={box} preserveAspectRatio="xMidYMid meet" className="strand-erratic-svg">
        <g className="strand-erratic">
          {segments.map((s, i) => {
            const dash = `${(s.b - s.a).toFixed(3)} 3`;
            const off = -s.a;
            const style = { "--delay": `${s.delay}s` } as CSSProperties;
            return (
              <g key={i} className={`strand-seg strand-seg--${s.f}`} style={style}>
                <path
                  d={ERRATIC_D}
                  pathLength={1}
                  stroke="url(#strand-fade-line)"
                  strokeDasharray={dash}
                  strokeDashoffset={off}
                  className="strand-seg-glow"
                  style={{ strokeOpacity: 0.09 * s.o }}
                />
                <path
                  d={ERRATIC_D}
                  pathLength={1}
                  stroke="url(#strand-fade-line)"
                  strokeDasharray={dash}
                  strokeDashoffset={off}
                  className="strand-seg-core"
                  style={{ strokeOpacity: s.o }}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </InViewGate>
  );
}
