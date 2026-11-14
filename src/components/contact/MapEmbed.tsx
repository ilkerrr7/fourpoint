"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Arrow } from "@/components/ui";
import { ServiceDiagram } from "@/components/hizmetler/ServiceDiagram";

/**
 * Harita, tıklayınca yüklenir: sayfa açılışında Google'a hiçbir istek gitmez.
 * Yerinde aynı ölçüde koyu bir kart durur (Haritalar şeması, adres,
 * "Haritayı göster" düğmesi ve "Google Maps'te aç" bağlantısı); düğmeye
 * basınca gömü aynı kutuya, filtresiz yüklenir ve odak gömüye geçer. Kutunun
 * ölçüsü iki durumda da aynıdır, yerleşim kaymaz. JS yoksa düğme işlevsizdir,
 * bağlantı yeter.
 */
export function MapEmbed({
  src,
  title,
  mapsUrl,
  address,
  className = "",
}: {
  src: string;
  title: string;
  mapsUrl: string;
  address: string[];
  /** ızgaradaki yeri (ör. lg:col-span-3); kutu ölçüleri bileşenin kendisinde */
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (open) frameRef.current?.focus();
  }, [open]);

  return (
    <div
      className={`relative h-[280px] overflow-hidden rounded-[var(--radius-card)] border border-deep/50 bg-surface sm:h-[360px] lg:h-full lg:min-h-[420px] ${className}`}
    >
      {open ? (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          className="block h-full w-full"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={0}
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="text-14 font-medium text-fg">Ofis</p>
            <div className="w-32 shrink-0 md:w-44" aria-hidden="true">
              <ServiceDiagram id="haritalar" size="stage" />
            </div>
          </div>
          <div>
            <p className="text-14 leading-relaxed text-fg-muted">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)}>
                Haritayı göster
              </Button>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-14 font-medium text-primary transition-colors hover:text-fg"
              >
                Google Maps&apos;te aç <Arrow />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
