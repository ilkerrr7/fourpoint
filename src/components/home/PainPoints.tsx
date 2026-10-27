"use client";

import { motion } from "motion/react";
import { Container, Badge } from "@/components/ui";
import { ReelPlayer } from "@/components/media/ReelPlayer";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { DERDI_ANLATAN } from "@/lib/reels";

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

/**
 * `reelVar`: animasyon dosyası depoda mı. Sayfa (sunucu bileşeni) derleme
 * anında bakar; dosya yokken video kartı hiç basılmaz, alıntılar tek başına
 * kalır. Dosya eklendiğinde bir sonraki derlemede kendiliğinden görünür.
 */
export function PainPoints({ reelVar = false }: { reelVar?: boolean }) {
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

        {/* Masaüstünde alıntılar solda, tek 9:16 kart sağda; telefonda kart
            alıntıların altında ve ortada kalır. */}
        <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <motion.div
            className="max-w-3xl space-y-2"
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

          {reelVar && (
            <motion.div
              className="w-full max-w-[280px] mx-auto lg:mx-0 lg:w-[320px] lg:max-w-none lg:shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              <ReelPlayer
                dosya={DERDI_ANLATAN.dosya}
                poster={DERDI_ANLATAN.poster}
                baslik={DERDI_ANLATAN.baslik}
              />
              <p className="text-12 text-fg-subtle mt-3">{DERDI_ANLATAN.not}</p>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
