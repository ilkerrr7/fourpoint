"use client";

import { motion } from "motion/react";
import { Container, Badge } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";

const painPoints = [
  "Reklama para harcadım ama kime gösterildiğini bile bilmiyorum.",
  "Ajansla çalıştım, raporları anlayamadım, sonuç da gelmedi.",
  "Hedefleme yanlış yapılıyor ama nasıl düzeltileceğini bilmiyorum.",
  "Reklam veriyorum, tıklama geliyor ama satışa dönmüyor.",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// The clip box gets a margin on every side: descenders (ğ ş ç y p) and the
// dot of İ sit outside the line box of an inline-block span, so a
// tight inset(0 …) end state cut them off. The wipe still starts fully clipped.
const item = {
  hidden: { clipPath: "inset(-0.15em -0.05em 100% -0.05em)", opacity: 0, y: "0.2em" },
  visible: {
    clipPath: "inset(-0.15em -0.05em -0.3em -0.05em)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export function PainPoints() {
  return (
    <section className="py-section bg-ink border-t border-deep">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <Badge>Tanıdık Geldi mi?</Badge>
        </motion.div>

        <motion.div
          className="max-w-3xl mt-10 space-y-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {painPoints.map((point) => (
            <motion.p
              key={point}
              variants={item}
              className="font-heading text-22 md:text-36 leading-[1.3] text-fg-muted"
            >
              &ldquo;{point}&rdquo;
            </motion.p>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
