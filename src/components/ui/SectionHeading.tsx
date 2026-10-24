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
  /** "h1" on a page's title block (every page has exactly one), "h2" for sections. */
  as?: "h1" | "h2";
  /** id for the heading element itself (aria-labelledby targets). */
  headingId?: string;
}

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

// The clip box gets a margin on every side: descenders (ğ ş ç y p) and the
// dot of İ sit outside the line box of an inline-block span, so a
// tight inset(0 …) end state cut them off. The wipe still starts fully clipped.
const wordVariant = {
  hidden: { clipPath: "inset(-0.15em -0.05em 100% -0.05em)", opacity: 0, y: "0.25em" },
  visible: {
    clipPath: "inset(-0.15em -0.05em -0.3em -0.05em)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export function SectionHeading({ badge, title, description, align = "center", as = "h2", headingId, className = "", ...props }: SectionHeadingProps) {
  const Heading = as === "h1" ? motion.h1 : motion.h2;
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
      {/* size, weight and leading come from the brand heading rules in globals.css */}
      <Heading
        id={headingId}
        className="text-fg [word-spacing:0.07em]"
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
      </Heading>
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
