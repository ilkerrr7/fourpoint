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
 * enough memory). The server HTML and every other case are the resting
 * composition, which is a complete picture on its own.
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
      <div className="field-scroll field-scroll--a">
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
