import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
