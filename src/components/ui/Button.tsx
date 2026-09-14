"use client";

import React, { forwardRef } from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, icon, className = "", children, disabled, type = "button", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-[var(--radius-button)]";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-elevated border border-deep text-fg hover:bg-deep",
      ghost: "bg-transparent text-fg-muted hover:text-fg hover:bg-elevated/50",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
      <>
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        {children}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={classes} disabled={disabled} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
