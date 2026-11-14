"use client";

import { useSyncExternalStore } from "react";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

const subscribe = () => () => {};

/**
 * The light behind the home page: one fixed layer under everything, with a
 * few large soft clusters of the brand blues and the usual film grain on
 * top. Nothing here is interactive or readable (pointer-events: none,
 * aria-hidden); the page is drawn over it, and only sections with a
 * see-through background let it show.
 *
 * All drawing is CSS (effects.css): radial gradients, no filters, so the
 * softness costs nothing per frame. Two kinds of movement, on separate
 * elements so they never fight over `transform`:
 *   .field-scroll  drifts with the page's own scroll (CSS scroll timeline;
 *                  browsers without it keep the resting position)
 *   .field-orb     wanders on its own 40-60s loop (transform + opacity only)
 *
 * Both only run while data-live="on": after hydration, when motion is
 * allowed (useMotionAllowed: no reduced-motion, not a phone, no data saver,
 * enough memory). The resting composition (server HTML, reduced motion,
 * phones, data saver, browsers without scroll timelines) is the night-blue
 * pool alone, i.e. the hero exactly as it was; the other clusters only
 * exist as a scroll-driven layer that fades in after the first screen.
 */
export function AmbientField() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const allowed = useMotionAllowed();

  return (
    <div className="ambient-field" data-live={hydrated && allowed ? "on" : "off"} aria-hidden="true">
      {/* the pool is always there; the other lanes fade in once the page scrolls
          past the hero, so the first screen is exactly the old hero */}
      <div className="field-scroll field-scroll--pool">
        <div className="field-orb field-orb--1" />
      </div>
      <div className="field-scroll field-scroll--b">
        <div className="field-orb field-orb--2" />
      </div>
      <div className="field-scroll field-scroll--c">
        <div className="field-orb field-orb--3" />
      </div>
      <div className="field-scroll field-scroll--b">
        <div className="field-orb field-orb--4" />
      </div>
      <div className="film-grain" />
    </div>
  );
}
