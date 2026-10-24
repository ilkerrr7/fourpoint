"use client";

import React, { forwardRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, name, options, placeholder = "Seçiniz", error, required, className = "", ...props }, ref) => {
    const selectId = id || name;
    
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={selectId} className="text-14 text-fg-muted mb-1.5 block">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            name={name}
            required={required}
            defaultValue=""
            className={`w-full bg-surface border ${error ? 'border-red-500' : 'border-line-strong'} rounded-[var(--radius-button)] px-4 py-3 text-fg focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition-[border-color,box-shadow] duration-150 appearance-none cursor-pointer`}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-fg-muted">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <p className="text-red-400 text-14 mt-1">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
