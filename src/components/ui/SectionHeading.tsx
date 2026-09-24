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
    <div className={`${alignClass} space-y-5 ${className}`} {...props}>
      {badge && <Badge>{badge}</Badge>}
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-fg">
        {title}
      </h2>
      {description && (
        <p className={`text-fg-muted text-lg leading-relaxed ${descAlignClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
