import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { InViewOnce } from "./InViewOnce";

/**
 * A neon cable bridging two sections: a thin electric-blue filament that drops out of
 * the bottom of one section and docks just above the next section's eyebrow,
 * with a pulse of light that runs down it as you scroll (see effects.css).
 * Where scroll timelines are missing, the same pulse plays once, on a timer,
 * when the cable comes on screen (InViewOnce).
 *
 * At 1280px and up the joint is instead one curve of the continuous light
 * line (LineCurve, docs/isik-hatti.md): formula geometry between the page
 * rails, driven by the 45% reading line. Both drawings are in the DOM; CSS
 * shows exactly one of them per width, so below 1280px nothing changes.
 *
 * Server component, pure SVG + CSS (the anchor alone is a client wrapper). It carries no text, is aria-hidden, and
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
  | "rnd-process"
  | "process-differentiators"
  | "differentiators-pricing"
  | "pricing-faq"
  | "faq-closing";

/** Rail position in the fixed 1280px layout (docs/isik-hatti.md §4). */
export type LineSide = "left" | "center" | "right";

/**
 * Line mode (1280px and up): the joint is one curve of the continuous light
 * line, drawn by formula between two rails. `up` = how far above the section
 * boundary the curve starts (where the rail above ends); the curve ends on
 * the node, `terminal` below the boundary. Below 1280px only the legacy
 * drawing exists.
 */
interface LineGeometry {
  from: LineSide;
  to: LineSide;
  up: number;
  terminal: number;
}

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

/* content box is 1216px wide at >=1280; rails sit 24px outside it */
const RAIL_X: Record<LineSide, number> = { left: -24, center: 608, right: 1240 };
const LINE_VIEW_LEFT = -40;
const LINE_VIEW_WIDTH = 1296;

function linePath({ from, to, up, terminal }: LineGeometry): string {
  const h = up + terminal + 8;
  const xs = RAIL_X[from];
  const xe = RAIL_X[to];
  const yEnd = h - 8;
  if (from !== to) {
    // S-curve between two rails
    return `M${xs} 0 C${xs} ${(h * 0.45).toFixed(1)} ${xe} ${(h * 0.55).toFixed(1)} ${xe} ${yEnd}`;
  }
  // same rail: a swing out to the right and back, the feel of the old cables
  const bulge = xs + 200;
  return `M${xs} 0 C${bulge} ${(h * 0.3).toFixed(1)} ${bulge} ${(h * 0.7).toFixed(1)} ${xs} ${yEnd}`;
}

const lineJoints: Record<CableJointId, LineGeometry> = {
  "hero-pain": { from: "left", to: "left", up: 120, terminal: 115 },
  // the console ends 128px above the boundary: start 100px above keeps 28px clear
  "break-automation": { from: "left", to: "left", up: 100, terminal: 115 },
  "rnd-process": { from: "left", to: "center", up: 120, terminal: 115 },
  "process-differentiators": { from: "center", to: "left", up: 120, terminal: 115 },
  "differentiators-pricing": { from: "left", to: "center", up: 120, terminal: 115 },
  "pricing-faq": { from: "center", to: "right", up: 120, terminal: 115 },
  "faq-closing": { from: "right", to: "center", up: 120, terminal: 155 },
};

/** Legacy cables (below 1280px, unchanged): only the four original joints. */
const joints: Partial<Record<CableJointId, CableGeometry>> = {
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
  // Engine console → "Otomasyon" (left-aligned eyebrow). The drawing starts
  // 157px above the section boundary and the console ends 128px above it, so
  // the visible stroke begins at y=54 to keep a 25px gap under the console.
  // The docking point (end, terminal) is unchanged.
  "break-automation": {
    anchor: "left",
    w: 250,
    h: 280,
    terminal: 115,
    d: "M210 54 C210 146 12 150 12 272",
    start: [210, 54],
    end: [12, 272],
  },
  // "Neden Four Point?" → "Ücretlendirme" (centred eyebrow)
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

function LineCurve({ id }: { id: CableJointId }) {
  const l = lineJoints[id];
  const h = l.up + l.terminal + 8;
  const d = linePath(l);
  const blurId = `line-blur-${id}`;
  const viewBox = `${LINE_VIEW_LEFT} 0 ${LINE_VIEW_WIDTH} ${h}`;
  const style = {
    "--lc-h": `${h}px`,
    "--lc-terminal": `${l.terminal}px`,
  } as CSSProperties;
  return (
    <InViewOnce className="line-curve" style={style} margin="0px 0px -55% 0px">
      <svg className="lc-halo" viewBox={viewBox} preserveAspectRatio="none">
        <defs>
          <filter id={blurId} x="-10%" y="-20%" width="120%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path d={d} filter={`url(#${blurId})`} />
      </svg>
      <svg className="lc-core" viewBox={viewBox} preserveAspectRatio="none">
        <path className="lc-base" d={d} pathLength={1} />
        <path className="lc-charged" d={d} pathLength={1} />
        <path className="lc-head-outer" d={d} pathLength={1} />
        <path className="lc-head-glow" d={d} pathLength={1} />
        <path className="lc-head-mid" d={d} pathLength={1} />
        <path className="lc-head" d={d} pathLength={1} />
      </svg>
      <span className="lc-node" style={{ left: `${RAIL_X[l.to] - LINE_VIEW_LEFT}px` }} />
    </InViewOnce>
  );
}

export function CableJoint({ id }: { id: CableJointId }) {
  const g = joints[id];
  const line = <LineCurve id={id} />;
  if (!g) {
    // line-only joint: nothing below 1280px
    return (
      <div className="cable-joint" aria-hidden="true">
        <Container>
          <div className="relative">{line}</div>
        </Container>
      </div>
    );
  }
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
          {line}
          <InViewOnce className={`cable-anchor cable-anchor--${g.anchor}`} style={style}>
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
                  <stop offset="0" style={{ stopColor: "var(--fx-line)", stopOpacity: 0 }} />
                  <stop offset="1" style={{ stopColor: "var(--fx-line)", stopOpacity: 1 }} />
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
          </InViewOnce>
        </div>
      </Container>
    </div>
  );
}
