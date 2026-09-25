"use client";

import { motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";

const steps = [
  {
    title: "Keşif Görüşmesi",
    desc: "İşinizi, müşterinizi ve beklentinizi anlıyoruz. Bu görüşme ücretsiz ve bağlayıcı değil.",
  },
  {
    title: "Strateji ve Kurulum",
    desc: "Hedef kitle analizi, reklam stratejisi ve kreatif planlamayı birlikte oluşturuyoruz. Onayınız olmadan reklam açmıyoruz.",
  },
  {
    title: "Optimizasyon ve Raporlama",
    desc: "Reklamları sürekli izliyor, optimize ediyor ve size düzenli, anlaşılır raporlar sunuyoruz.",
  },
];

const stepContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const stepItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function Process() {
  return (
    <section className="py-section bg-surface border-t border-deep">
      <Container>
        <SectionHeading badge="Süreç" title="Nasıl çalışıyoruz?" description="Üç adımda net bir süreç. Sürpriz yok, gizli adım yok." />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto mt-16 md:mt-20"
          variants={stepContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={stepItem}>
              <span className="font-heading text-48 text-fg-subtle">0{index + 1}</span>
              <h3 className="font-heading text-22 font-medium mt-4 mb-3 text-fg">
                {step.title}
              </h3>
              <p className="text-fg-muted text-16 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
