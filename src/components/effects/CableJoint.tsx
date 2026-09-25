import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";

/**
 * A neon cable bridging two sections: a thin azure filament that drops out of
 * the bottom of one section and docks just above the next section's eyebrow,
 * with a pulse of light that runs down it as you scroll (see effects.css).
 *
 * Server component, pure SVG + CSS. It carries no text, is aria-hidden, and
 * sits in a zero-height slot between two sections, so it never affects layout.
 *
 * Geometry is hand-authored per joint in a local viewBox. Cables anchor to the
 * container's left edge or its centre (the same anchors the eyebrows use), so
 * they land in the right place at any viewport width; the drawing is
 * bottom-aligned and only ever scales uniformly, so the docking point stays
 * fixed against the next section however narrow the screen gets.
 */

export type CableJointId =
  | "hero-pain"
  | "break-automation"
  | "differentiators-pricing"
  | "faq-closing";

interface CableGeometry {
  anchor: "left" | "center";
  /** viewBox size in px */
  w: number;
  h: number;
  /** distance from the section boundary down to the terminal node's centre */
  terminal: number;
  /** path from the light's entry to the docking point (ends at y = h - 8) */
  d: string;
  start: [number, number];
  end: [number, number];
}

const joints: Record<CableJointId, CableGeometry> = {
  // Hero → "Tanıdık Geldi mi?" (left-aligned eyebrow)
  "hero-pain": {
    anchor: "left",
    w: 210,
    h: 210,
    terminal: 115,
    d: "M170 60 C170 128 12 124 12 202",
    start: [170, 60],
    end: [12, 202],
  },
  // Photo break → "Otomasyon" (left-aligned eyebrow)
  "break-automation": {
    anchor: "left",
    w: 250,
    h: 280,
    terminal: 115,
    d: "M210 30 C210 130 12 140 12 272",
    start: [210, 30],
    end: [12, 272],
  },
  // "Neden Fourpoint?" → "Ücretlendirme" (centred eyebrow)
  "differentiators-pricing": {
    anchor: "center",
    w: 340,
    h: 250,
    terminal: 115,
    d: "M20 40 C20 138 170 128 170 242",
    start: [20, 40],
    end: [170, 242],
  },
  // FAQ → closing call to action, docking above the compass mark
  "faq-closing": {
    anchor: "center",
    w: 380,
    h: 290,
    terminal: 155,
    d: "M360 40 C360 148 190 138 190 282",
    start: [360, 40],
    end: [190, 282],
  },
};

export function CableJoint({ id }: { id: CableJointId }) {
  const g = joints[id];
  const viewBox = `0 0 ${g.w} ${g.h}`;
  const fadeId = `cable-fade-${id}`;
  const blurId = `cable-blur-${id}`;
  const style = {
    "--cable-w": `${g.w}px`,
    "--cable-h": `${g.h}px`,
    "--cable-terminal": `${g.terminal}px`,
  } as CSSProperties;

  return (
    <div className="cable-joint" aria-hidden="true">
      <Container>
        <div className="relative">
          <div className={`cable-anchor cable-anchor--${g.anchor}`} style={style}>
            {/* static glow: blurred once, on its own layer */}
            <svg className="cable-halo" viewBox={viewBox} preserveAspectRatio="xMidYMax meet">
              <defs>
                <filter id={blurId} x="-40%" y="-20%" width="180%" height="140%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path d={g.d} stroke={`url(#${fadeId})`} filter={`url(#${blurId})`} />
            </svg>

            <svg className="cable-core" viewBox={viewBox} preserveAspectRatio="xMidYMax meet">
              <defs>
                {/* the cable emerges from darkness rather than starting on a hard end */}
                <linearGradient
                  id={fadeId}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={g.start[1]}
                  x2="0"
                  y2={g.start[1] + 70}
                >
                  <stop offset="0" style={{ stopColor: "var(--fx-azure)", stopOpacity: 0 }} />
                  <stop offset="1" style={{ stopColor: "var(--fx-azure)", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path className="cable-base" d={g.d} pathLength={1} stroke={`url(#${fadeId})`} />
              <path className="cable-charged" d={g.d} pathLength={1} stroke={`url(#${fadeId})`} />
              <path className="cable-head-outer" d={g.d} pathLength={1} />
              <path className="cable-head-glow" d={g.d} pathLength={1} />
              <path className="cable-head-mid" d={g.d} pathLength={1} />
              <path className="cable-head" d={g.d} pathLength={1} />
            </svg>

            <span className="cable-node" style={{ left: `${(g.end[0] / g.w) * 100}%` }} />
          </div>
        </div>
      </Container>
    </div>
  );
}
