"use client";

import { useEffect } from "react";

/**
 * Scrolls to `location.hash` on a cold page load.
 *
 * Clicking an anchor link inside the site already works: those are next/link
 * navigations and the App Router scrolls to the hash itself. What never
 * worked is arriving with the hash already in the URL — a pasted or shared
 * link, a bookmark, a search result pointing at /hizmetler#hizmetler-google.
 * The browser's own fragment scroll happens while the HTML is still
 * streaming, and React's hydration lands the page back at the top, so the
 * visitor reads the page header instead of the section they asked for.
 *
 * Mounted once in the root layout, so every anchor on every page is covered.
 * Three things keep it from fighting anyone:
 *
 * - It runs on mount only. In-site navigation is left to the router.
 * - It gives up if the page is no longer at the top, i.e. the browser or the
 *   visitor has already moved.
 * - It jumps rather than animating. `scroll-behavior: smooth` (globals.css)
 *   would otherwise glide through the whole page on arrival.
 *
 * `scrollIntoView` honours the `scroll-padding-top` on <html>, so the section
 * lands below the fixed header rather than underneath it.
 */
export default function HashScroll() {
  useEffect(() => {
    const raw = window.location.hash.slice(1);
    if (!raw) return;
    if (window.scrollY > 0) return;

    let id: string;
    try {
      id = decodeURIComponent(raw);
    } catch {
      // A malformed percent-escape is not an anchor we can resolve.
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    const land = () => target.scrollIntoView({ block: "start", behavior: "instant" });

    // Land immediately rather than waiting for a frame: a link opened in a
    // background tab gets no animation frames at all until it is looked at,
    // and the visitor would arrive at the top of the page.
    land();

    // Layout is stable by now (headings hold a metric-matched fallback and
    // every media slot reserves its aspect ratio), but a second pass on the
    // next frame costs nothing and absorbs any late shift.
    const frame = requestAnimationFrame(land);

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
