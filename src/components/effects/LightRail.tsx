import type { CSSProperties } from "react";
import { InViewOnce } from "./InViewOnce";

export type RailSide = "left" | "center" | "right";

export interface LightRailProps {
  side: RailSide;
  /** px (or any CSS length) from the section top to where the rail starts */
  top: number | string;
  /** px from the section bottom to where the rail ends (= where the next curve starts) */
  bottom: number | string;
  /** the line's very first piece: it emerges from darkness */
  fadeTop?: boolean;
}

/**
 * One straight piece of the continuous light line (docs/isik-hatti.md): a
 * vertical rail in the page margin beside a section, between the node above
 * and the curve below. Four layers, all plain boxes: halo, base trace,
 * charged part (scaleY, transform only) and the travelling head.
 *
 * Only exists at 1280px and up (effects.css); below that it is display:none
 * and the four legacy cables carry on as before. Server component; the
 * InViewOnce wrapper is the one-shot fallback for browsers without scroll
 * timelines, armed at the same 45% reading line.
 */
export function LightRail({ side, top, bottom, fadeTop = false }: LightRailProps) {
  const style = {
    top: typeof top === "number" ? `${top}px` : top,
    bottom: typeof bottom === "number" ? `${bottom}px` : bottom,
  } as CSSProperties;
  return (
    <InViewOnce
      className={`light-rail light-rail--${side} ${fadeTop ? "light-rail--fade" : ""}`}
      style={style}
      margin="0px 0px -55% 0px"
    >
      <span className="lr-halo" />
      <span className="lr-base" />
      <span className="lr-charged" />
      <span className="lr-head" />
    </InViewOnce>
  );
}
