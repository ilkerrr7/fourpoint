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

export function Automation() {
  return (
    // overflow-clip, not -hidden: hidden makes this a scroll container, which
    // breaks position:sticky and scroll timelines for anything inside it.
    <section className="relative py-section bg-surface border-t border-deep overflow-clip">
      <Container className="relative z-10">
        <SectionHeading badge="Otomasyon" title="İnsan yorulur. Sistem yorulmaz." align="left" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-14 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
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

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle mb-5">
                Sistemimiz sürekli izler
              </p>
              <motion.ul
                className="space-y-4"
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
          <StrandCompare />
        </div>

        <motion.div
          className="mt-16 pt-10 border-t border-deep max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.25] text-fg">
            Karar insanın, takip sistemin. Strateji, marka dili ve kreatif
            yön bizden. Gece üçte bütçeyi izleyen ise sistem.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
