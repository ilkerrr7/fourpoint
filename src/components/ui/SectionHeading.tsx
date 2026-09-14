import React from "react";
import { Badge } from "./Badge";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ badge, title, description, align = "center", className = "", ...props }: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center flex flex-col items-center" : "text-left flex flex-col items-start";
  const descAlignClass = align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl";

  return (
    <div className={`${alignClass} space-y-4 ${className}`} {...props}>
      {badge && <Badge>{badge}</Badge>}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-fg">
        {title}
      </h2>
      {description && (
        <p className={`text-fg-muted text-lg ${descAlignClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
