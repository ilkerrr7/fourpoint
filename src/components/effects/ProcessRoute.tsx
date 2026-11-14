"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

const subscribe = () => () => {};

/**
 * Süreç rotası: adımları (01 / 02 / 03 …) tek bir çizilen hatla bağlar. Her
 * adımın başında bir düğüm; hat ilerledikçe düğümler sırayla yanar ve yanık
 * kalır. Çizim effects.css'te ("Process route"): yalnızca kutular, SVG yok,
 * yazı/rakam/eksen yok.
 *
 *   ProcessRoute  ızgara + hat modu. `direction`:
 *                 "responsive" (varsayılan): telefonda dikey, solda; md ve
 *                 üstünde yatay, düğümler adımların üstünde (ana sayfa Süreç).
 *                 "vertical": her genişlikte dikey (/nasil-calisiyoruz gibi
 *                 liste yerleşimleri için).
 *   RouteStep     bir adım: düğüm + bir sonraki düğüme giden parça + içerik.
 *                 Son adımın parçası CSS'te gizlenir (:last-child).
 *
 * Hareket: kaydırma zaman çizelgesi varsa ona bağlı (yatayda satır
 * görünümün %80'inden %45 okuma çizgisine çıkarken, dikeyde her adım okuma
 * çizgisini keserken). Yoksa her adım ekrana gelince bir kez oynar
 * (data-live: InViewOnce ile aynı üç durum). Hareketi azalt, data-fx="off",
 * veri tasarrufu ve az bellek durumlarında hareket yok: ilk iki durumu CSS,
 * son ikisini useMotionAllowed → data-motion="off" kapatır. Sunucu HTML'i
 * her zaman bitmiş haldir: hat dolu, düğümler yanık.
 *
 * Düğüm hizası `--route-y` ile ayarlanır (dikeyde düğüm merkezinin adım
 * üstünden uzaklığı); yerleşim değişkenleri effects.css'te.
 */
export function ProcessRoute({
  direction = "responsive",
  className = "",
  children,
}: {
  direction?: "responsive" | "vertical";
  className?: string;
  children: ReactNode;
}) {
  const allowed = useMotionAllowed({ phones: true });
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const style = { "--n": Children.count(children) } as CSSProperties;
  const mode = direction === "vertical" ? "route--v" : "route--h";

  return (
    <div
      className={`route ${mode} ${className}`}
      style={style}
      data-motion={hydrated && !allowed ? "off" : undefined}
    >
      {/* yatay modda kaydırma zaman çizelgesinin öznesi: düğüm satırı üstünde sıfır yükseklikli kutu */}
      <span className="route-track" aria-hidden="true" />
      {children}
    </div>
  );
}

export function RouteStep({
  index,
  className = "",
  margin = "0px 0px -35% 0px",
  children,
}: {
  /** 0 tabanlı sıra; yatay modda parçaların aralığını ve yedek yolun gecikmesini belirler */
  index: number;
  className?: string;
  /** IntersectionObserver rootMargin: yedek yolda "görüldü" sayılan bant */
  margin?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [seen, setSeen] = useState(false);

  // InViewOnce ile aynı kural: banda girdi ya da zaten üstünde kaldı → görüldü
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootTop = entry.rootBounds?.top ?? 0;
        if (entry.isIntersecting || entry.boundingClientRect.bottom < rootTop) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  const style = { "--i": index } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`route-step ${className}`}
      style={style}
      data-live={hydrated ? (seen ? "on" : "wait") : undefined}
    >
      <span className="route-node" aria-hidden="true" />
      <span className="route-seg" aria-hidden="true">
        <span className="route-seg-base" />
        <span className="route-seg-charged" />
        <span className="route-seg-head" />
      </span>
      {children}
    </div>
  );
}
