"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Drives a subtle CSS 3D tilt on the returned ref's element: rotateX
 * follows scroll position through the viewport, rotateY follows pointer
 * position on hover-capable desktops. No listeners are attached at all
 * (not just CSS-disabled) under reduced motion, on narrow viewports, or
 * on low-power/data-saver devices.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion || isMobile) return;

    const nav = navigator as NavigatorWithHints;
    if ((nav.deviceMemory ?? Infinity) <= 4) return;
    if (nav.connection?.saveData) return;

    let scrollRotateX = 0;
    let pointerRotateY = 0;
    let scrollFrame = 0;

    const apply = () => {
      el.style.transform = `rotateX(${scrollRotateX}deg) rotateY(${pointerRotateY}deg)`;
    };

    const updateFromScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const fraction = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / viewportCenter));
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
      pointerRotateY = Math.max(-1, Math.min(1, x)) * 14;
      apply();
    };

    const onPointerLeave = () => {
      pointerRotateY = 0;
      apply();
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (canHover) {
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      el.style.transform = "";
    };
  }, [prefersReducedMotion, isMobile, canHover]);

  return ref;
}
