"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { Button } from "@/components/ui";
import type { NavLink } from "@/types";

const NAV_LINKS: NavLink[] = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Nasıl Çalışıyoruz", href: "/nasil-calisiyoruz" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-ink/90 backdrop-blur-md border-b border-deep"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20"
          aria-label="Ana navigasyon"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Fourpoint ana sayfaya dön"
          >
            <Image
              src="/logo.svg"
              alt="Fourpoint logo"
              width={32}
              height={32}
              className="h-8 w-8 text-fg transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className="font-heading text-18 font-medium text-fg tracking-tight">
              Fourpoint
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-12 font-medium uppercase tracking-[0.14em] text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Button href="/iletisim" variant="secondary" size="sm" className="hidden md:inline-flex" id="header-cta">
              Görüşme Al
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-fg-muted hover:text-fg hover:bg-elevated/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={isMobileMenuOpen}
              id="mobile-menu-toggle"
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
