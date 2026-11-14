/**
 * The one pointer listener on the page.
 *
 * Every pointer-reactive effect (AmbientField's drifting cluster, card
 * spotlights, the radar, the hero mark's tilt) reads from here instead of
 * attaching its own `pointermove`. One passive listener records the
 * position; one requestAnimationFrame per frame publishes it, as CSS custom
 * properties (--mx / --my, viewport px) plus data-pointer="in|out" on the
 * elements that asked for them (attachPointerVars), and to JS subscribers
 * for the few that need local coordinates. Nothing here reads layout.
 *
 * The variables go on the consumer, not on <html>, on purpose: a custom
 * property is inherited, so writing it on the root every frame made the
 * browser touch the style of every element on the page (measured: style
 * recalc went from 0.4 s to 3 s over a 16 s scroll). Scoped to the
 * consumer's subtree it costs nothing measurable. data-pointer is written
 * only when it changes, for the same reason.
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
const varTargets = new Set<HTMLElement>();
let inside: boolean | null = null;
let holders = 0;
let frame = 0;

function writeVars(el: HTMLElement) {
  el.style.setProperty("--mx", `${pos.x}px`);
  el.style.setProperty("--my", `${pos.y}px`);
}

function setInside(value: boolean) {
  if (inside === value) return;
  inside = value;
  varTargets.forEach((el) => {
    el.dataset.pointer = value ? "in" : "out";
  });
}

function publish() {
  frame = 0;
  varTargets.forEach(writeVars);
  setInside(true);
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
  if (e.relatedTarget === null) setInside(false);
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
    inside = null;
  };
}

/**
 * Receive --mx/--my and data-pointer on this element (and, through
 * inheritance, its subtree). Returns the detach.
 */
export function attachPointerVars(el: HTMLElement): () => void {
  varTargets.add(el);
  if (pos.x >= 0) writeVars(el);
  if (inside !== null) el.dataset.pointer = inside ? "in" : "out";
  return () => {
    varTargets.delete(el);
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    delete el.dataset.pointer;
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
