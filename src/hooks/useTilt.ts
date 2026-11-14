"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { useMotionAllowed } from "./useMotionAllowed";
import { usePointerField } from "./usePointerField";
import { subscribePointer } from "@/lib/pointer-field";

export interface TiltOptions {
  /** rotateX follows the element's position through the viewport (default on) */
  scroll?: boolean;
  /**
   * Where the pointer part comes from:
   *  "element" — pointermove on the element itself (default)
   *  "field"   — the shared pointer field (lib/pointer-field): the mark tilts
   *              towards the cursor wherever it is on screen, which is what a
   *              pointer-events:none watermark needs. Runs only while the
   *              element is in view.
   */
  pointer?: "element" | "field";
}

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Drives a subtle CSS 3D tilt on the returned ref's element: rotateX
 * follows scroll position through the viewport, rotateY follows pointer
 * position on hover-capable desktops. No listeners are attached at all
 * (not just CSS-disabled) under reduced motion, on narrow viewports, or
 * on low-power/data-saver devices — see useMotionAllowed. Pass
 * `enabled: false` to opt out entirely (e.g. a purely decorative,
 * non-interactive use of the same mark).
 */
export function useTilt<T extends HTMLElement>(
  enabled: boolean = true,
  { scroll = true, pointer = "element" }: TiltOptions = {},
) {
  const ref = useRef<T>(null);
  const motionAllowed = useMotionAllowed();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const field = usePointerField(enabled && pointer === "field");

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !motionAllowed) return;

    let scrollRotateX = 0;
    let pointerRotateX = 0;
    let pointerRotateY = 0;
    let scrollFrame = 0;

    const apply = () => {
      el.style.transform = `rotateX(${scrollRotateX + pointerRotateX}deg) rotateY(${pointerRotateY}deg)`;
    };

    const updateFromScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const fraction = clamp((elementCenter - viewportCenter) / viewportCenter);
      scrollRotateX = fraction * -10;
      apply();
      scrollFrame = 0;
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateFromScroll);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      pointerRotateY = clamp(x) * 14;
      apply();
    };

    const onPointerLeave = () => {
      pointerRotateY = 0;
      apply();
    };

    if (scroll) {
      updateFromScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (pointer === "element" && canHover) {
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerleave", onPointerLeave);
    }

    // Field mode: subscribe to the shared pointer only while in view. The
    // centre is measured once per subscription (document coordinates), the
    // per-frame work is arithmetic, and a CSS transition smooths the result.
    let unsubscribe: (() => void) | null = null;
    let observer: IntersectionObserver | null = null;
    if (pointer === "field" && field) {
      el.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !unsubscribe) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + window.scrollX + rect.width / 2;
          const cy = rect.top + window.scrollY + rect.height / 2;
          unsubscribe = subscribePointer((p) => {
            pointerRotateY = clamp((p.pageX - cx) / (window.innerWidth / 2)) * 8;
            pointerRotateX = clamp((cy - p.pageY) / (window.innerHeight / 2)) * 5;
            apply();
          });
        } else if (!entry.isIntersecting && unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }
      });
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      unsubscribe?.();
      observer?.disconnect();
      el.style.transform = "";
      el.style.transition = "";
    };
  }, [enabled, motionAllowed, canHover, scroll, pointer, field]);

  return ref;
}
