"use client";

import React from "react";
import { motion } from "motion/react";
import { Badge } from "./Badge";
import { EASE_OUT_EXPO } from "@/lib/motion";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const wordVariant = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0, y: "0.25em" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export function SectionHeading({ badge, title, description, align = "center", className = "", ...props }: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center flex flex-col items-center" : "text-left flex flex-col items-start";
  const descAlignClass = align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl";
  const words = title.split(" ");

  return (
    <div className={`${alignClass} space-y-5 ${className}`} {...props}>
      {badge && <Badge>{badge}</Badge>}
      <motion.h2
        className={`font-heading text-h2-sm md:text-6xl lg:text-7xl font-medium leading-[1.05] text-fg flex flex-wrap gap-x-[0.28em] ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
        variants={wordContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={wordVariant} style={{ display: "inline-block" }}>
            {w}
          </motion.span>
        ))}
      </motion.h2>
      {description && (
        <motion.p
          className={`text-fg-muted text-lg leading-relaxed ${descAlignClass}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
