"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
 * allowed (useMotionAllowed with phones: no reduced motion, no data saver,
 * enough memory). Phones get the time loops but not the scroll drift
 * (effects.css gates that on width). The resting composition (server HTML,
 * reduced motion, data saver) is the night-blue pool alone, i.e. the hero
 * exactly as it was.
 *
 * The other clusters appear once the hero has left the screen. Where CSS
 * scroll timelines exist (and the width allows the drift) that is the
 * scroll-driven fade in effects.css. Everywhere else — Firefox, Safari
 * before 26, phones — data-hero="gone" does it: an IntersectionObserver on
 * the hero section flips it, and the clusters cross-fade in and out with a
 * plain opacity transition. Scroll-timeline browsers never see that rule
 * take effect because their lane animation owns the opacity.
 */
export function AmbientField() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const allowed = useMotionAllowed({ phones: true });
  const [heroGone, setHeroGone] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("section.hero");
    if (!hero) return;
    // "gone" once no part of the hero is below the fixed header any more
    const observer = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="ambient-field"
      data-live={hydrated && allowed ? "on" : "off"}
      data-hero={heroGone ? "gone" : "visible"}
      aria-hidden="true"
    >
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
