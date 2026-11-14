import React from "react";
import { Spotlight } from "@/components/effects/Spotlight";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "elevated";
  hover?: boolean;
  /** A pointer-lit disc inside the card on fine-pointer devices (effects/Spotlight). */
  spotlight?: boolean;
}

export function Card({
  variant = "surface",
  hover = false,
  spotlight = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const baseClasses = "rounded-[var(--radius-card)] overflow-hidden";
  
  const variants = {
    surface: "bg-surface border border-deep/50",
    elevated: "bg-elevated border border-deep",
  };
  
  // hover-only border brighten: these cards are not links, so no lift/shadow
  // that would promise a click
  const hoverClasses = hover ? "hover:border-fg/25 transition-colors duration-200 ease-out" : "";
  // the spotlight layer sits at z-index -1 inside the card's own stacking context
  const spotlightClasses = spotlight ? "relative isolate" : "";

  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${spotlightClasses} ${className}`} {...props}>
      {spotlight && <Spotlight />}
      {children}
    </div>
  );
}
