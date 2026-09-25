import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "elevated";
  hover?: boolean;
}

export function Card({ variant = "surface", hover = false, className = "", children, ...props }: CardProps) {
  const baseClasses = "rounded-[var(--radius-card)] overflow-hidden";
  
  const variants = {
    surface: "bg-surface border border-deep/50",
    elevated: "bg-elevated border border-deep",
  };
  
  // hover-only border brighten: these cards are not links, so no lift/shadow
  // that would promise a click
  const hoverClasses = hover ? "hover:border-fg/25 transition-colors duration-200 ease-out" : "";

  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
