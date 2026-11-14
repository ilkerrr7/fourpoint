/**
 * The one pointer listener on the page.
 *
 * Every pointer-reactive effect (AmbientField's drifting cluster, card
 * spotlights, the radar, the hero mark's tilt) reads from here instead of
 * attaching its own `pointermove`. One passive listener records the
 * position; one requestAnimationFrame per frame publishes it, as CSS custom
 * properties on <html> (--mx / --my, viewport px; data-pointer="in|out")
 * for CSS consumers, and to JS subscribers for the few that need local
 * coordinates. Nothing here reads layout.
 *
 * Reference counted: the listener exists only while at least one consumer
 * holds it (see usePointerField, which also owns the gating: fine pointer,
 * motion allowed, no kill switch). While the tab is hidden the browser sends
 * no pointer events; a pending frame is dropped, so nothing runs.
 */

export interface PointerPos {
  /** viewport coordinates */
  x: number;
  y: number;
  /** document coordinates: stable across scrolling, so a subscriber can keep
      a rect it measured once and subtract */
  pageX: number;
  pageY: number;
}

type Subscriber = (p: PointerPos) => void;

const pos: PointerPos = { x: -1, y: -1, pageX: -1, pageY: -1 };
const subscribers = new Set<Subscriber>();
let holders = 0;
let frame = 0;

const root = () => document.documentElement;

function publish() {
  frame = 0;
  const style = root().style;
  style.setProperty("--mx", `${pos.x}px`);
  style.setProperty("--my", `${pos.y}px`);
  root().dataset.pointer = "in";
  subscribers.forEach((fn) => fn(pos));
}

function onMove(e: PointerEvent) {
  if (e.pointerType && e.pointerType !== "mouse") return;
  pos.x = e.clientX;
  pos.y = e.clientY;
  pos.pageX = e.pageX;
  pos.pageY = e.pageY;
  if (!frame && !document.hidden) frame = requestAnimationFrame(publish);
}

// the pointer left the window: consumers ease back to their resting state
function onOut(e: PointerEvent) {
  if (e.relatedTarget === null) root().dataset.pointer = "out";
}

function onVisibility() {
  if (document.hidden && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/** Start publishing (if not already) and return the matching release. */
export function acquirePointerField(): () => void {
  holders += 1;
  if (holders === 1) {
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holders -= 1;
    if (holders > 0) return;
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    document.removeEventListener("visibilitychange", onVisibility);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    const style = root().style;
    style.removeProperty("--mx");
    style.removeProperty("--my");
    delete root().dataset.pointer;
  };
}

/** Per-frame position updates; fires once immediately if a position is known. */
export function subscribePointer(fn: Subscriber): () => void {
  subscribers.add(fn);
  if (pos.x >= 0) fn(pos);
  return () => {
    subscribers.delete(fn);
  };
}

/** The latest published position (read, never write). */
export const pointerPos: Readonly<PointerPos> = pos;
