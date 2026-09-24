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
  
  const hoverClasses = hover ? "hover:border-fg/25 transition-colors duration-300 ease-[var(--ease-out-expo)]" : "";

  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
