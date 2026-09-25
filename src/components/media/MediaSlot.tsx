"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { mediaSlots } from "@/lib/media";
import { FourPointMark } from "@/components/decorative/FourPointMark";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface MediaSlotProps {
  slot: keyof typeof mediaSlots;
  className?: string;
  /** Extra delay before the reveal starts — used to sequence after a headline. */
  revealDelay?: number;
}

/**
 * Renders a media slot from the registry in `@/lib/media`: a real
 * video/image once `src` is set, or a placeholder until then — never a
 * stock photo or a fabricated screenshot. The aspect ratio is always
 * reserved, so swapping in a real asset later causes no layout shift.
 */
export function MediaSlot({ slot, className = "", revealDelay = 0 }: MediaSlotProps) {
  const config = mediaSlots[slot];

  return (
    <motion.div
      className={`relative overflow-hidden bg-surface border border-deep ${className}`}
      style={{ aspectRatio: config.aspectRatio }}
      initial={{ clipPath: "inset(0 0 6% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay: revealDelay, ease: EASE_OUT_EXPO }}
    >
      {/* The 1.03 settle-scale lives on this inner layer, inside the clipped
          frame. Scaling the frame itself made a full-bleed slot 1.5% wider
          than the viewport until it revealed (22px of horizontal overflow at
          1440, 6px at 390). */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.03 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: revealDelay, ease: EASE_OUT_EXPO }}
      >
        {config.src ? (
          config.type === "video" ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={config.src}
              poster={config.poster}
              autoPlay
              muted
              loop
              playsInline
              preload={config.priority ? "auto" : "none"}
              aria-label={config.alt}
            />
          ) : (
            <Image
              src={config.src}
              alt={config.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={config.priority}
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="film-grain" aria-hidden="true" />
            <FourPointMark className="w-16 h-16 md:w-20 md:h-20 opacity-[0.1]" interactive={false} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
