"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FourPointMark } from "@/components/decorative/FourPointMark";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function ClosingCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-surface border-t border-deep">
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        >
          <FourPointMark className="w-16 h-16 md:w-20 md:h-20 mb-10" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-fg">
            İşletmenizin reklamlarını birlikte yönetelim.
          </h2>
          <p className="text-fg-muted text-lg mt-6 mb-10 max-w-xl mx-auto">
            Ücretsiz keşif görüşmesinde işletmenizi tanıyalım, size özel bir yol haritası çıkaralım.
          </p>
          <Button variant="primary" size="lg" href="/iletisim">
            Ücretsiz Görüşme Al
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
