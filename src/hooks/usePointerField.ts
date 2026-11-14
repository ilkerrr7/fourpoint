"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { useMotionAllowed } from "./useMotionAllowed";
import { acquirePointerField } from "@/lib/pointer-field";

const subscribeNoop = () => () => {};
const readFxOff = () => document.documentElement.dataset.fx === "off";
const serverFxOff = () => false;

/**
 * Whether pointer-reactive effects may run here, and, while `enabled`, a
 * hold on the shared pointer listener (lib/pointer-field). True only on
 * hover-capable fine-pointer devices with motion allowed (no reduced
 * motion, not a phone, no data saver, enough memory) and without the
 * data-fx="off" kill switch. False on the server and before hydration, so
 * nothing attaches until the page is interactive.
 */
export function usePointerField(enabled: boolean = true): boolean {
  const motionAllowed = useMotionAllowed();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const fxOff = useSyncExternalStore(subscribeNoop, readFxOff, serverFxOff);
  const allowed = motionAllowed && finePointer && !fxOff;

  useEffect(() => {
    if (!enabled || !allowed) return;
    return acquirePointerField();
  }, [enabled, allowed]);

  return allowed;
}
