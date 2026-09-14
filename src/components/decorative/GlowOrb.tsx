import React from 'react';

interface GlowOrbProps {
  className?: string;
  color?: 'primary' | 'accent' | 'deep';
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  primary: '#0A84FF',
  accent: '#38BDF8',
  deep: '#0B3E82'
};

const sizeMap = {
  sm: 'w-[300px] h-[300px]',
  md: 'w-[500px] h-[500px]',
  lg: 'w-[700px] h-[700px]'
};

export function GlowOrb({ className = '', color = 'primary', size = 'md' }: GlowOrbProps) {
  const hexColor = colorMap[color];
  const dimensions = sizeMap[size];

  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-15 animate-[glow-pulse_6s_ease-in-out_infinite] ${dimensions} ${className}`}
      style={{
        background: `radial-gradient(circle, ${hexColor} 0%, transparent 70%)`
      }}
    />
  );
}
