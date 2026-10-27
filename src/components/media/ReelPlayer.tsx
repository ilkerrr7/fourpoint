"use client";

import { useEffect, useRef } from "react";

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
 * Görünür alana girince oynar, çıkınca durur (IntersectionObserver; scroll
 * dinleyicisi yok). Ses yok, kontrol yok: kart tıklanabilir bir şey vaat
 * etmesin diye. `preload="none"` sayesinde ekrana girmeden tek bayt video
 * inmez; poster yine de görünür, yani boş bir kutu kalmaz.
 *
 * `prefers-reduced-motion` açıkken hiç oynatmaz, yalnızca poster görünür.
 */
export function ReelPlayer({ dosya, poster, baslik, className = "" }: ReelPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Azaltılmış hareket: otomatik oynatma yok, poster olduğu gibi kalır.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
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
  }, []);

  return (
    <video
      ref={ref}
      src={dosya}
      poster={poster}
      aria-label={baslik}
      muted
      playsInline
      loop
      preload="none"
      className={`block w-full aspect-[9/16] object-cover rounded-[var(--radius-card)] border border-deep bg-surface ${className}`}
    />
  );
}
