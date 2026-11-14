"use client";

import { motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui";
import { ProcessRoute, RouteStep } from "@/components/effects/ProcessRoute";
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

        {/* Süreç rotası (effects.css "Process route"): adımlar tek bir hatla
            bağlı, düğümler sırayla yanar. Metin canlanması eskisi gibi
            (stagger) — varyantlar RouteStep üzerinden içeriğe iner. */}
        <motion.div
          className="max-w-5xl mx-auto mt-16 md:mt-20"
          variants={stepContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ProcessRoute>
            {steps.map((step, index) => (
              <RouteStep key={step.title} index={index}>
                <motion.div variants={stepItem}>
                  <span className="font-heading text-48 text-fg-subtle">0{index + 1}</span>
                  <h3 className="mt-4 mb-3 text-fg">
                    {step.title}
                  </h3>
                  <p className="text-fg-muted text-16 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </RouteStep>
            ))}
          </ProcessRoute>
        </motion.div>
      </Container>
    </section>
  );
}
