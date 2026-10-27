"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks";

/**
 * Sayfadaki o an oynayan tek reel. Modül düzeyinde durur, çünkü kural
 * bileşenler arası: bir video oynamaya başladığında önceki durur, böylece
 * aynı anda hiçbir zaman iki video çalmaz.
 */
let oynayan: HTMLVideoElement | null = null;

export interface ReelPlayerProps {
  /** public/ altındaki web sürümü, örn. "/media/cekimler/x-web.mp4". */
  dosya: string;
  poster: string;
  /** Erişilebilir ad: çekim vitrininde kart başlığı (işletme adı). */
  baslik: string;
  className?: string;
}

/**
 * 9:16 sessiz reel oynatıcı.
 *
 * Normalde görünür alana girince oynar, çıkınca durur (IntersectionObserver;
 * scroll dinleyicisi yok). Ses yok. `preload="none"` sayesinde ekrana girmeden
 * tek bayt video inmez; poster yine de görünür, yani boş bir kutu kalmaz.
 *
 * `prefers-reduced-motion` açıkken kendiliğinden hiç başlamaz: kartta bir
 * oynat düğmesi belirir, dokunan oynatır, tekrar dokunan durdurur. Ekrandan
 * çıkınca her iki durumda da durur — kendi kendine başlamaz ama arkada da
 * çalmaya devam etmez.
 */
export function ReelPlayer({ dosya, poster, baslik, className = "" }: ReelPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const azaltilmisHareket = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [calisiyor, setCalisiyor] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          // Hareket azaltılmışsa görünür olmak tek başına oynatmaya yetmez;
          // başlatma kararı ziyaretçinin.
          if (azaltilmisHareket) return;
          if (oynayan && oynayan !== el) oynayan.pause();
          oynayan = el;
          // Tarayıcı otomatik oynatmayı reddedebilir; o zaman poster kalır.
          void el.play().catch(() => {});
        } else {
          el.pause();
          if (oynayan === el) oynayan = null;
        }
      },
      { threshold: 0.5 },
    );

    gozlemci.observe(el);

    return () => {
      gozlemci.disconnect();
      el.pause();
      if (oynayan === el) oynayan = null;
    };
  }, [azaltilmisHareket]);

  const degistir = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      if (oynayan && oynayan !== el) oynayan.pause();
      oynayan = el;
      void el.play().catch(() => {});
    } else {
      el.pause();
      if (oynayan === el) oynayan = null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        src={dosya}
        poster={poster}
        aria-label={baslik}
        muted
        playsInline
        loop
        preload="none"
        onPlay={() => setCalisiyor(true)}
        onPause={() => setCalisiyor(false)}
        className="block w-full aspect-[9/16] object-cover rounded-[var(--radius-card)] border border-deep bg-surface"
      />

      {/* Yalnızca hareket azaltılmışken: kartın tamamı bir düğme olur. Klavyeyle
          de çalışsın diye gerçek bir <button>, salt tıklama dinleyicisi değil. */}
      {azaltilmisHareket && (
        <button
          type="button"
          onClick={degistir}
          aria-label={`${baslik} videosunu ${calisiyor ? "durdur" : "oynat"}`}
          className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-card)]"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius-button)] border border-deep bg-ink/70 text-fg">
            {calisiyor ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
