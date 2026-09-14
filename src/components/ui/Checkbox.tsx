"use client";

import React, { forwardRef } from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'label'> {
  label: string | React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, name, label, error, checked, required, className = "", onChange, ...props }, ref) => {
    const checkboxId = id || name;
    
    // Custom click handler to trigger the hidden checkbox when visual box is clicked
    const handleVisualClick = () => {
      const el = document.getElementById(checkboxId as string);
      if (el) el.click();
    };

    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-start">
          <div className="flex items-center h-5 mt-0.5">
            <input
              ref={ref}
              id={checkboxId}
              name={name}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              required={required}
              className="peer hidden"
              {...props}
            />
            <div 
              className={`w-5 h-5 rounded-[0.25rem] border flex items-center justify-center transition-colors cursor-pointer ${
                checked ? 'bg-primary border-primary' : 'bg-surface border-deep hover:border-primary/50'
              } ${error && !checked ? 'border-red-500' : ''}`}
              onClick={handleVisualClick}
            >
              <svg 
                className={`w-3.5 h-3.5 text-white pointer-events-none transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} 
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
