"use client";

import { motion } from "motion/react";
import { Container, Badge } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";

const differentiators = [
  {
    title: "Şeffaf Süreç",
    description: "Reklam hesabınız sizin adınıza açılır, her adımı görürsünüz. Karanlıkta kalan bir şey olmaz.",
  },
  {
    title: "Anlaşılır Raporlama",
    description: "Teknik jargon değil, somut sonuçlar. Ne harcandı, ne oldu, sırada ne var — net bir dille.",
  },
  {
    title: "Bütçe Kontrolü Sizde",
    description: "Reklam bütçenizi siz belirlersiniz. Biz yönetiriz, ama harcama kararı her zaman sizin.",
  },
  {
    title: "Sürekli Optimizasyon",
    description: "Reklamları açıp bırakmıyoruz. Veriye bakarak sürekli iyileştiriyoruz.",
  },
];

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const row = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function Differentiators() {
  return (
    <section className="py-section bg-ink border-t border-deep">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <Badge>Farkımız</Badge>
              <h2 className="font-heading text-36 md:text-48 font-medium mt-5 text-fg leading-[1.1]">
                Neden Fourpoint?
              </h2>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-8 lg:col-start-6 border-t border-deep"
            variants={rowContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {differentiators.map((item) => (
              <motion.div
                key={item.title}
                variants={row}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 py-7 border-b border-deep"
              >
                <h3 className="sm:col-span-4 font-heading text-18 font-medium text-fg">{item.title}</h3>
                <p className="sm:col-span-8 text-fg-muted text-14 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
