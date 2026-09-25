"use client";

import React, { forwardRef } from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'label'> {
  label: string | React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, name, label, error, checked, required, className = "", onChange, ...props }, ref) => {
    const checkboxId = id || name;

    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-start">
          <div className="flex items-center h-5 mt-0.5">
            <div
              className={`relative w-5 h-5 rounded-[2px] border flex items-center justify-center transition-colors bg-surface border-deep has-checked:bg-fg has-checked:border-fg ${
                error ? 'border-red-500' : ''
              }`}
            >
              <input
                ref={ref}
                id={checkboxId}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                required={required}
                className="peer absolute inset-0 w-full h-full appearance-none bg-transparent border-0 m-0 p-0 cursor-pointer"
                {...props}
              />
              <svg
                className="w-3.5 h-3.5 text-ink pointer-events-none transition-opacity duration-200 opacity-0 peer-checked:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="ml-3 text-sm flex-1">
            <label htmlFor={checkboxId} className="text-fg-muted cursor-pointer select-none">
              {label} {required && <span className="text-primary">*</span>}
            </label>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
