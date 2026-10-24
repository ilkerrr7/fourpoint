"use client";

import React, { forwardRef } from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
}

/**
 * Kurumsal kimlik: ana buton gök mavisi zemin + siyah yazı, ikincil buton
 * şeffaf zemin + 1px güçlü çizgi kenar + krem yazı. Köşe 4px (--radius-button),
 * Poppins 500 15px, gölge yok. Sayfa başına tek ana buton vurgusu; header'daki
 * "Görüşme Al" ikincil stildedir.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, icon, className = "", children, disabled, type = "button", ...props }, ref) => {
    // 150ms ease-out renk/kenar geçişi, :active'de 0.97 basış (azaltılmış
    // harekette kapalı); odak halkası global :focus-visible kuralından gelir.
    const baseClasses = "inline-flex items-center justify-center gap-2 font-medium text-15 transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 rounded-[var(--radius-button)]";

    const variants = {
      primary: "bg-accent text-ink hover:bg-accent/85",
      secondary: "bg-transparent border border-line-strong text-fg hover:border-fg",
      ghost: "bg-transparent text-fg-muted hover:text-fg",
    };

    const sizes = {
      sm: "h-11 md:h-9 px-4",
      md: "h-12 px-7",
      lg: "h-14 px-9",
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
