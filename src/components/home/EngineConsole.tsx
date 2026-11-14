"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Container } from "@/components/ui";
import { createRadarState, drawRadar, stepRadar } from "./engine-radar";

/**
 * The visual pause between Services and Automation: a console that shows the
 * kind of signals the system is being built to watch — a radar sweep and a
 * feed that keeps ticking. It replaces the old full-bleed photo.
 *
 * Honest by construction: the feed is illustrative, says so on the console
 * ("Temsili akış"), and carries no client names or performance claims. The
 * section stays aria-hidden like the photo it replaces; the real content is
 * the Automation section right below it.
 *
 * Built to run everywhere (the reason it is canvas 2D + plain CSS, see
 * engine-radar.ts): phones, Firefox, older Safari, weak GPUs. The server HTML
 * and the reduced-motion state are a complete, filled console; motion is only
 * added on top, and only while the section is on screen.
 */

const EVENTS: readonly { tag: string; text: string }[] = [
  { tag: "Bütçe akışı", text: "Harcama plan dahilinde ilerliyor" },
  { tag: "Kreatif yorgunluğu", text: "Görsel 3 için yenileme sinyali" },
  { tag: "Maliyet", text: "Kitle C: maliyet yükseliyor" },
  { tag: "Çakışma", text: "İki kampanya aynı kitleye yarışıyor" },
  { tag: "Ölçüm", text: "Pixel ve CAPI eşleşmesi doğrulandı" },
  { tag: "Bütçe akışı", text: "Öneri: A setinden B setine kaydır" },
  { tag: "Zamanlama", text: "Akşam saatlerinde dönüşüm artıyor" },
];

/** rows on screen; one extra is rendered below the fold so it can slide out */
const ROWS = 5;
const TICK_MS = 2800;
/** the feed's clock starts at 03:00 — "gece üçte bütçeyi izleyecek olan sistem" */
const START_MINUTES = 3 * 60;
const STEP_MINUTES = 7;

function clock(seq: number): string {
  const total = (START_MINUTES + seq * STEP_MINUTES) % (24 * 60);
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function Radar({ live }: { live: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // kept across effect runs so the sweep resumes where it stopped
  const stateRef = useRef(createRadarState());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const state = stateRef.current;
    let width = 0;
    let height = 0;

    const paint = () => drawRadar(ctx, width, height, state);
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const killed = document.documentElement.dataset.fx === "off";
    let raf = 0;
    let last = 0;

    // ~30fps: a slow sweep needs no more, and it halves the work on phones
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        last = 0;
        return;
      }
      if (last && now - last < 32) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0.032;
      last = now;
      stepRadar(state, dt);
      paint();
    };

    if (live && !reduced && !killed) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [live]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export function EngineConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -8% 0px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [inView]);

  // newest first; seq is the row's identity, so React keeps the old rows and
  // mounts only the new one at the top
  const rows = Array.from({ length: ROWS + 1 }, (_, i) => {
    const seq = tick + ROWS - i;
    return { seq, ...EVENTS[seq % EVENTS.length] };
  });

  return (
    // pb-section on every width: the cable joint below starts inside this
    // section's bottom padding and must not cross the console
    <section className="border-t border-deep pt-section-sm md:pt-section pb-section" aria-hidden="true">
      <Container>
        <div
          ref={ref}
          className="engine mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-card)] border border-deep bg-surface"
          data-live={inView ? "on" : "off"}
        >
          <div className="flex h-11 items-center justify-between border-b border-deep px-4 md:px-6">
            <span className="text-12 font-medium uppercase tracking-[0.3em] text-fg-muted">FP·Engine</span>
            <span className="inline-flex items-center text-12 font-medium uppercase tracking-[0.3em] text-accent">
              <span className="status-dot status-dot--live" />
              İzliyor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* phone: a centred square. md+: the feed sets the row height and the
                radar fills its cell */}
            <div className="relative mx-auto aspect-square w-full max-w-[20rem] md:aspect-auto md:h-full md:max-w-none">
              <Radar live={inView} />
            </div>

            <div className="engine-clip border-t border-deep md:border-l md:border-t-0">
              <ul
                className="engine-feed"
                // alternating between two identical keyframes restarts the
                // slide on every tick without remounting the list
                style={tick > 0 ? { animationName: tick % 2 ? "engine-shift-a" : "engine-shift-b" } : undefined}
              >
                {rows.map((row, i) => (
                  <li
                    key={row.seq}
                    className={`engine-row ${i === 0 ? "engine-row--new" : ""} ${i === 0 && tick > 0 ? "engine-row--enter" : ""}`}
                  >
                    <span className="engine-time">{clock(row.seq)}</span>
                    <span className="min-w-0">
                      <span className="engine-tag">{row.tag}</span>
                      <span className="engine-text">{row.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="border-t border-deep px-4 py-3 text-12 text-fg-subtle md:px-6">
            Temsili akış. Gerçek hesap verisi değildir.
          </p>
        </div>
      </Container>
    </section>
  );
}
