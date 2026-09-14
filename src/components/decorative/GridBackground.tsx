"use client";

import React from 'react';

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className = '' }: GridBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      >
        <svg width="100%" height="100%" className="animate-[grid-shift_20s_linear_infinite]">
          <defs>
            <pattern
              id="dotGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#0B3E82" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="200%" height="200%" fill="url(#dotGrid)" transform="translate(-10%, -10%)" />
        </svg>
      </div>
    </div>
  );
}
