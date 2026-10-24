"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import type { NavLink } from "@/types";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the panel when opened
      panelRef.current?.focus();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigasyon"
        tabIndex={-1}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-deep/50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-button)] text-fg-muted hover:text-fg hover:bg-elevated/50 transition-colors"
            aria-label="Menüyü kapat"
            id="mobile-menu-close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="px-6" aria-label="Mobil navigasyon">
          <ul className="flex flex-col gap-1 border-t border-deep pt-4">
            {links.map((link) => (
              <li key={link.href} className="border-b border-deep">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 text-16 font-heading text-fg hover:text-fg-muted transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <div className="px-6 mt-6">
          <Button href="/iletisim" variant="primary" size="md" className="w-full" onClick={onClose} id="mobile-cta">
            Görüşme Al
          </Button>
        </div>
      </div>
    </>
  );
}
