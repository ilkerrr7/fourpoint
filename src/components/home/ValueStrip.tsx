import { InViewGate } from "@/components/effects/InViewGate";

/**
 * A slow line of the promises made further down the page ("Neden Four
 * Point?", "Ücretlendirme"), running between the pain points and the
 * services. Decorative repetition, so the whole strip is aria-hidden
 * (InViewGate) and the real statements stay in their own sections.
 *
 * Motion lives in effects.css and only runs on screen. The static state
 * (reduced motion, kill switch, before hydration) is the same line, at rest.
 */

const items = [
  "Şeffaf süreç",
  "Anlaşılır raporlama",
  "Bütçe kontrolü sizde",
  "Sürekli optimizasyon",
  "Pixel ve CAPI ölçümü",
  "Gizli maliyet yok",
];

/** Four copies: the track moves by exactly one, so the loop is seamless and a
    very wide screen never sees the end of the line. */
const COPIES = [0, 1, 2, 3];

export function ValueStrip() {
  return (
    <InViewGate className="value-strip">
      <div className="value-track">
        {COPIES.map((copy) => (
          <ul key={copy} className="value-group">
            {items.map((item) => (
              <li key={item} className="value-item">
                <span className="value-rule" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </InViewGate>
  );
}
