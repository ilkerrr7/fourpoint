import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.22em] uppercase text-accent ${className}`}
      {...props}
    >
      <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
      {children}
    </span>
  );
}
