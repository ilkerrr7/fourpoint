"use client";

import React, { useState } from "react";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-deep/30 last:border-b-0">
            <button
              type="button"
              className="group w-full py-5 flex justify-between items-center text-left rounded-[var(--radius-button)]"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className="font-heading text-18 text-fg font-medium pr-4">{item.question}</span>
              <span 
                className={`transform transition-[transform,color] duration-300 ease-[var(--ease-out-expo)] flex-shrink-0 text-primary group-hover:text-fg ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div 
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-expo)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-fg-muted text-16 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
