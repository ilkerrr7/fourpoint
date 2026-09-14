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
        <label htmlFor={inputId} className="text-sm text-fg-muted mb-1.5 block">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-surface border ${error ? 'border-red-500' : 'border-deep/50'} rounded-[0.625rem] px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all`}
          {...props}
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
