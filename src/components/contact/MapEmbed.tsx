"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { ServiceDiagram } from "@/components/hizmetler/ServiceDiagram";

/**
 * Harita, tıklayınca yüklenir: sayfa açılışında Google'a hiçbir istek gitmez.
 * Yerinde aynı ölçüde koyu bir kart durur: ortada büyük Haritalar şeması,
 * altında "Haritayı göster". Düğmeye basınca gömü aynı kutuya, filtresiz
 * yüklenir; boyanana kadar "Harita yükleniyor…" görünür, sonra odak gömüye
 * geçer. Kutunun ölçüsü her durumda aynıdır, yerleşim kaymaz. Adres ve
 * "Google Maps'te aç" bağlantısı yandaki Ofisimiz sütunundadır; JS yoksa
 * onlar yeter.
 */
export function MapEmbed({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  /** ızgaradaki yeri (ör. lg:col-span-3); kutu ölçüleri bileşenin kendisinde */
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (loaded) frameRef.current?.focus();
  }, [loaded]);

  return (
    <div
      className={`relative h-[280px] overflow-hidden rounded-[var(--radius-card)] border border-deep/50 bg-surface sm:h-[360px] lg:h-full lg:min-h-[420px] ${className}`}
    >
      {open && (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          className="absolute inset-0 block h-full w-full"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={0}
          onLoad={() => setLoaded(true)}
        />
      )}
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-surface p-6"
          aria-live="polite"
        >
          {open ? (
            <p className="text-14 text-fg-muted">Harita yükleniyor…</p>
          ) : (
            <>
              <div className="w-1/2 max-w-[320px]" aria-hidden="true">
                <ServiceDiagram id="haritalar" size="stage" />
              </div>
              <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)}>
                Haritayı göster
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
