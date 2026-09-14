import React from 'react';

interface GeometricSVGProps {
  className?: string;
  variant?: 'default' | 'alt';
}

export function GeometricSVG({ className = '', variant = 'default' }: GeometricSVGProps) {
  if (variant === 'alt') {
    return (
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <path d="M200 50 L350 125 L350 275 L200 350 L50 275 L50 125 Z" stroke="#1B2942" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M200 100 L300 150 L300 250 L200 300 L100 250 L100 150 Z" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="50" fill="#0B3E82" fillOpacity="0.1" />
        <line x1="150" y1="200" x2="250" y2="200" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.6" />
        <line x1="200" y1="150" x2="200" y2="250" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="150" stroke="#1B2942" strokeWidth="2" />
      <circle cx="200" cy="200" r="100" stroke="#0B3E82" strokeWidth="1" strokeDasharray="8 4" />
      <circle cx="200" cy="200" r="100" fill="#0B3E82" fillOpacity="0.05" />
      <circle cx="280" cy="120" r="30" fill="#38BDF8" fillOpacity="0.2" />
      <circle cx="120" cy="280" r="20" fill="#38BDF8" fillOpacity="0.3" />
      <path d="M50 200 Q 200 50 350 200" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="200" y1="50" x2="200" y2="100" stroke="#1B2942" strokeWidth="2" />
      <line x1="200" y1="300" x2="200" y2="350" stroke="#1B2942" strokeWidth="2" />
    </svg>
  );
}
