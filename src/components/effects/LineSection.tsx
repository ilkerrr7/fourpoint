import type { ReactNode } from "react";
import { LightRail, type LightRailProps } from "./LightRail";

/**
 * Wraps one home-page section so a LightRail can be positioned against it
 * (the rail needs a `relative` box the height of the section, and the
 * sections themselves stay untouched). No rail: a plain wrapper.
 */
export function LineSection({ rail, children }: { rail?: LightRailProps; children: ReactNode }) {
  return (
    <div className="line-section">
      {children}
      {rail && <LightRail {...rail} />}
    </div>
  );
}
