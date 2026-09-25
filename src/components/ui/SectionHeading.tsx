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
      {/* Words are inline-blocks separated by real space characters (not a flex
          gap), so textContent / the accessible name / copy-paste read as normal
          text. 0.07em of word-spacing tops the 0.212em space glyph up to the
          0.28em gap the layout was designed with. */}
      <motion.h2
        className="font-heading text-36 md:text-72 font-medium leading-[1.05] text-fg [word-spacing:0.07em]"
        variants={wordContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && " "}
            <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
              {w}
            </motion.span>
          </React.Fragment>
        ))}
      </motion.h2>
      {description && (
        <motion.p
          className={`text-fg-muted text-18 leading-relaxed ${descAlignClass}`}
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
