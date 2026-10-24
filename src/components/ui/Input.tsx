"use client";

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, name, type = "text", placeholder, error, required, className = "", ...props }, ref) => {
    const inputId = id || name;
    
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={inputId} className="text-14 text-fg-muted mb-1.5 block">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-surface border ${error ? 'border-red-500' : 'border-line-strong'} rounded-[var(--radius-button)] px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition-[border-color,box-shadow] duration-150`}
          {...props}
        />
        {error && <p className="text-red-400 text-14 mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
