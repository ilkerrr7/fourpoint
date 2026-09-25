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
    // 150ms ease-out colour/border change on hover, a 0.97 press on :active
    // (switched off for reduced motion); focus uses the global :focus-visible ring.
    const baseClasses = "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 rounded-[var(--radius-button)]";

    const variants = {
      primary: "bg-fg text-ink hover:bg-fg/85",
      secondary: "bg-transparent border border-deep text-fg hover:border-fg/50",
      ghost: "bg-transparent text-fg-muted hover:text-fg",
    };

    const sizes = {
      sm: "h-9 px-4 text-14",
      md: "h-12 px-7 text-14 uppercase tracking-[0.12em]",
      lg: "h-14 px-9 text-14 uppercase tracking-[0.14em]",
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
        <Link href={href} className={classes} {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}>
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
