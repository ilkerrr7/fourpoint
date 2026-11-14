"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  getServerCookieConsent,
  readCookieConsent,
  subscribeCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  // localStorage'daki karar; sunucuda ve hidrasyonda null (lib/cookie-consent)
  const currentConsent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    getServerCookieConsent,
  );
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentConsent) return;
    // Small delay so it doesn't flash on page load
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [currentConsent]);

  // Sabit konumlu banner açıkken sayfanın altına kendi yüksekliği kadar boşluk
  // bırakır: footer'ın son satırı (sosyal ikonlar, telif) banner'ın altında
  // kalmaz, en alta kaydırınca tıklanabilir olur. Kapanınca boşluk kalkar.
  useEffect(() => {
    if (!isVisible) {
      document.body.style.paddingBottom = "";
      return;
    }
    const reserve = () => {
      const h = bannerRef.current?.offsetHeight ?? 0;
      document.body.style.paddingBottom = h ? `${h}px` : "";
    };
    reserve();
    window.addEventListener("resize", reserve);
    return () => {
      window.removeEventListener("resize", reserve);
      document.body.style.paddingBottom = "";
    };
  }, [isVisible]);

  useEffect(() => {
    const handleOpen = () => setIsVisible(true);
    window.addEventListener("open-cookie-banner", handleOpen);
    return () => window.removeEventListener("open-cookie-banner", handleOpen);
  }, []);

  const handleAccept = () => {
    writeCookieConsent("accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    const previousConsent = readCookieConsent();
    writeCookieConsent("rejected");
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
      ref={bannerRef}
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      role="dialog"
      aria-label="Çerez onayı"
      id="cookie-banner"
    >
      <div className="mx-auto max-w-4xl rounded-[var(--radius-card)] bg-surface border border-deep p-4 md:p-6">
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
            {/* KVKK çerez rehberi: reddetme kabul etmekle eşit görünürlükte.
                İki seçenek de aynı boyut, aynı ikincil stil, yan yana. */}
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={handleReject} id="cookie-reject" className="min-w-28">
                Reddet
              </Button>
              <Button variant="secondary" size="sm" onClick={handleAccept} id="cookie-accept" className="min-w-28">
                Kabul Et
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
