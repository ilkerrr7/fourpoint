"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "fp-cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setCurrentConsent(consent);
    
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsVisible(true);
    window.addEventListener("open-cookie-banner", handleOpen);
    return () => window.removeEventListener("open-cookie-banner", handleOpen);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setCurrentConsent("accepted");
    setIsVisible(false);
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  };

  const handleReject = () => {
    const previousConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setCurrentConsent("rejected");
    setIsVisible(false);
    
    // Temizle (varsa mevcut Meta çerezleri)
    document.cookie = "_fbp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_fbc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Eğer önceden kabul edilmişse ve şimdi reddedildiyse veya tekrar reddedildiyse temiz bir sayfa için reload at.
    // Çünkü fbevents.js zaten hafızaya yüklendiyse state değişimi onu tamamen durdurmaz.
    if (previousConsent === "accepted") {
      window.location.reload();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      role="dialog"
      aria-label="Çerez onayı"
      id="cookie-banner"
    >
      <div className="mx-auto max-w-4xl rounded-[var(--radius-card)] bg-surface border border-deep shadow-2xl shadow-ink/60 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-14 text-fg-muted leading-relaxed">
              Reklam performansını ölçmek için çerezler kullanıyoruz. Detaylı bilgi
              için{" "}
              <Link
                href="/cerez-politikasi"
                className="text-primary hover:underline"
              >
                Çerez Politikamızı
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {currentConsent && (
              <span className="text-12 text-fg-subtle">
                Mevcut tercihiniz:{" "}
                <strong className={currentConsent === "accepted" ? "text-green-400" : "text-red-400"}>
                  {currentConsent === "accepted" ? "Kabul Edildi" : "Reddedildi"}
                </strong>
              </span>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2 text-14 font-medium text-fg-muted hover:text-fg transition-colors rounded-[var(--radius-button)] hover:bg-elevated"
                id="cookie-reject"
              >
                Reddet
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-5 py-2 text-14 font-semibold text-ink bg-fg rounded-[var(--radius-button)] hover:bg-fg/85 transition-colors"
                id="cookie-accept"
              >
                Kabul Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
