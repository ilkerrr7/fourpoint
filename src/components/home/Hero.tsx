"use client";

import { motion } from "motion/react";
import { Container, Badge, Button } from "@/components/ui";
import { FourPointMark } from "@/components/decorative/FourPointMark";
import { EASE_OUT_EXPO } from "@/lib/motion";
import "./hero.css";

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const line = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0, y: "0.3em" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/**
 * Purely typographic hero: the headline is the image. Sizing lives in
 * hero.css (container-query fitted, measured per line).
 */
export function Hero() {
  return (
    <section className="hero relative overflow-clip bg-ink min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)]">
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <div className="hero-mark" aria-hidden="true">
        <FourPointMark interactive={false} className="w-full h-full" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex-col justify-start pt-10 md:justify-center md:pt-8 pb-20">
          <motion.div className="hero-fit" initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <Badge>Meta Reklam Yönetimi</Badge>
            </motion.div>

            <div className="hero-stage mt-6">
              <motion.h1 className="hero-title font-heading font-bold text-fg" variants={lineContainer}>
                <motion.span variants={line} className="hero-line hero-l1">
                  Reklamlarınız
                </motion.span>
                <motion.span variants={line} className="hero-line hero-l2">
                  <em className="hero-w1 not-italic font-normal text-fg-muted">doğru</em>{" "}
                  <span className="hero-w2">insanlara</span>
                </motion.span>
                <motion.span variants={line} className="hero-line hero-l3">
                  ulaşsın.
                </motion.span>
              </motion.h1>

              <motion.div variants={fadeUp} className="hero-credits mt-8">
                <p className="text-base text-fg-muted leading-relaxed max-w-md">
                  Instagram ve Facebook reklamlarınızı stratejik yönetiyoruz. Kime, ne
                  zaman, nasıl gösterildiğini bilmeniz için şeffaf çalışıyoruz.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button variant="primary" size="md" href="/iletisim">
                    Ücretsiz Görüşme Al
                  </Button>
                  <Button variant="ghost" size="md" href="/nasil-calisiyoruz">
                    Nasıl Çalışıyoruz →
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
