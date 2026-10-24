import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * Üst etiket (eyebrow). Kurumsal kimlik: gök mavisi vurgu metin, Poppins 500,
 * 13px, büyük harf, 0.3em harf aralığı. Öndeki kısa çizgi dekoratif bir
 * grafik çizgidir, o yüzden elektrik mavisi (primary).
 */
export function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-13 font-medium tracking-[0.3em] uppercase text-accent ${className}`}
      {...props}
    >
      <span className="h-px w-6 bg-primary" aria-hidden="true" />
      {children}
    </span>
  );
}
