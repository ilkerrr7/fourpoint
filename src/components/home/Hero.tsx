"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container, Badge, Button } from "@/components/ui";
import { MediaSlot } from "@/components/media/MediaSlot";
import { EASE_OUT_EXPO } from "@/lib/motion";

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

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[92vh] bg-ink">
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end pt-32 pb-16 md:pt-40 md:pb-20 min-h-[92vh]">
          <motion.div
            className="lg:col-span-7 pb-4"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Badge>Meta Reklam Yönetimi</Badge>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[0.98] text-fg mb-8"
              variants={lineContainer}
            >
              <motion.span variants={line} style={{ display: "block" }}>
                Reklamlarınız
              </motion.span>
              <motion.span variants={line} style={{ display: "block" }}>
                <em className="italic text-fg-muted">doğru</em> insanlara
              </motion.span>
              <motion.span variants={line} style={{ display: "block" }}>
                ulaşsın.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-fg-muted max-w-xl leading-relaxed mb-12"
            >
              Instagram ve Facebook reklamlarınızı stratejik yönetiyoruz. Kime,
              ne zaman, nasıl gösterildiğini bilmeniz için şeffaf çalışıyoruz.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button variant="primary" size="lg" href="/iletisim">
                Ücretsiz Görüşme Al
              </Button>
              <Button variant="ghost" size="lg" href="/nasil-calisiyoruz">
                Nasıl Çalışıyoruz →
              </Button>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5">
            <motion.div style={{ y: mediaY }}>
              <MediaSlot slot="heroMedia" className="w-full rounded-[2px]" revealDelay={0.6} />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
