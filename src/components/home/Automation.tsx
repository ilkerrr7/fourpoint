"use client";

import { motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui";
import { StrandCompare } from "@/components/effects/StrandCompare";
import { EASE_OUT_EXPO } from "@/lib/motion";

const monitored = [
  "Bütçenin nereye aktığını, saat saat",
  "Yorulan kreatifleri, performans düşmeden önce",
  "Maliyeti anormal artan kitleleri",
  "Birbirini yiyen, aynı kişiye yarışan kampanyaları",
];

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/**
 * Automation, as the site's second "push into the page" moment — a variation
 * on the pricing stage, not a copy of it. The two strands (the system vs human
 * attention) stay put for the whole pin: the system does not tire. Only the
 * human, textual planes pass the camera beside it: the argument, what the
 * system watches, and the closing line.
 *
 * One grid serves both modes (see effects.css): in the plain layout (mobile,
 * reduced motion, no scroll timelines, kill switch) the planes sit in their
 * own grid areas; in depth mode all three share one area and overlap.
 */
export function Automation() {
  return (
    // overflow-clip, not -hidden: hidden makes this a scroll container, which
    // breaks position:sticky and scroll timelines for anything inside it.
    <section className="depth-section depth-section--split relative py-section bg-surface border-t border-deep overflow-clip">
      <div className="depth-runway">
        <div className="depth-stage">
          <Container className="depth-container relative z-10">
            <div className="auto-grid">
              <div className="depth-plane depth-plane--1 auto-p1">
                <div>
                  <SectionHeading badge="Otomasyon" title="İnsan yorulur. Sistem yorulmaz." align="left" />
                  <div className="auto-copy space-y-6 mt-10 max-w-xl">
                    <p className="text-fg-muted text-lg leading-relaxed">
                      Meta&apos;nın reklam açık artırması günün her saati çalışır. Bir
                      hesap yöneticisi ise günde iki kez bakar — iyi bir günündeyse.
                      Yorgunsa, yoğunsa, kafası başka yerdeyse gözden kaçar. Sorun
                      yeteneksizlik değil, insan olmak.
                    </p>
                    <p className="text-fg-muted text-lg leading-relaxed">
                      Avrupa&apos;daki ajans modellerini incelerken hep aynı şeyi
                      gördük: iyi ajansları kötülerinden ayıran şey daha zeki insanlar
                      değil, daha disiplinli takip. Biz de o disiplini insana değil
                      sisteme yükledik.
                    </p>
                  </div>
                </div>
              </div>

              <div className="depth-plane depth-plane--2 auto-p2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle mb-5">
                    Sistemimiz sürekli izler
                  </p>
                  <motion.ul
                    className="auto-list space-y-4"
                    variants={listContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    {monitored.map((item) => (
                      <motion.li
                        key={item}
                        variants={listItem}
                        className="flex items-start gap-3 text-fg text-base leading-relaxed border-b border-deep pb-4"
                      >
                        <span className="text-accent shrink-0 mt-1.5">—</span>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>

              {/* two cables, no labels: steady vs broken says the rest */}
              <div className="auto-aside">
                <StrandCompare />
              </div>

              <div className="depth-plane depth-plane--3 auto-p3">
                <motion.div
                  className="auto-closing-wrap pt-10 border-t border-deep max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                >
                  {/* one sentence per line; the last one, the point, at full brightness */}
                  <p className="auto-closing font-heading text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.25] text-fg text-balance">
                    <span className="block text-fg-muted">Karar insanın, takip sistemin.</span>{" "}
                    <span className="block text-fg-muted">Strateji, marka dili ve kreatif yön bizden.</span>{" "}
                    <span className="block">Gece üçte bütçeyi izleyen ise sistem.</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
