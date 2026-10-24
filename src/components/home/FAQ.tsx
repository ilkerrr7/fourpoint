"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { faqItems } from "@/lib/faq";

export function FAQ() {
  return (
    <section className="py-section bg-ink border-t border-deep">
      <Container>
        <SectionHeading badge="SSS" title="Sıkça Sorulan Sorular" />

        <motion.div
          className="max-w-2xl mx-auto mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </Container>
    </section>
  );
}
