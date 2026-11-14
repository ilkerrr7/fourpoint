"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container, SectionHeading, Card } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Status = "Aktif" | "Geliştiriliyor" | "Yakında";

const projects: { title: string; status: Status; desc: string }[] = [
  {
    title: "7/24 Reklam Otomasyonu",
    status: "Geliştiriliyor",
    desc: "Meta ve Google'da bütçeyi, kitleyi ve kreatif performansını gece gündüz izlemek için tasarlanan sistem.",
  },
  {
    title: "Kreatif Yenileme",
    status: "Geliştiriliyor",
    desc: "Performansı düşmeye başlayan kreatifleri erkenden yakalayıp yenisini hazırlayan akış.",
  },
  {
    title: "Ölçüm Altyapısı",
    status: "Aktif",
    desc: "Pixel ve Conversions API (CAPI) ile reklamdan gelen müşteriyi doğru ölçen kurulum.",
  },
  {
    title: "Müşteri Rapor Paneli",
    status: "Yakında",
    desc: "Harcamanızı, gelen müşteriyi ve maliyetini tek ekrandan görebileceğiniz panel.",
  },
];

// "Aktif" is the one live item, so it alone gets the brand sky blue (accent);
// the in-progress states stay in the neutral greys of the palette.
const STATUS_CLASS: Record<Status, string> = {
  Aktif: "text-accent border-accent/40 bg-accent/10",
  Geliştiriliyor: "text-fg-muted border-deep bg-elevated",
  Yakında: "text-fg-subtle border-deep bg-elevated/60",
};

// The dot in front of each label (effects.css): a pulse for the live item, a
// slow breath for work in progress, a hollow ring for what has not started.
const STATUS_DOT: Record<Status, string> = {
  Aktif: "status-dot--live",
  Geliştiriliyor: "status-dot--dev",
  Yakında: "status-dot--soon",
};

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function RnD() {
  // the status dots only loop while the section is on screen
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      id="ar-ge"
      className="py-section border-t border-deep"
      data-live={inView ? "on" : "off"}
    >
      <Container>
        <SectionHeading
          badge="AR-GE"
          title="Sistemi biz yazıyoruz."
          description="Reklamlarınızı yöneten altyapıyı kendi yazılım ekibimizle geliştiriyoruz. Sahada gördüğümüz her sorun, bir sonraki sürümün iş listesine giriyor."
          align="left"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-16 md:mt-20"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={card} className="h-full">
              <Card hover spotlight className="h-full p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-heading text-14 text-fg-subtle">0{index + 1}</span>
                  <span
                    className={`inline-flex items-center h-6 px-2.5 rounded-[var(--radius-badge)] border text-12 font-medium uppercase tracking-[0.12em] whitespace-nowrap ${STATUS_CLASS[project.status]}`}
                  >
                    <span className={`status-dot ${STATUS_DOT[project.status]}`} aria-hidden="true" />
                    {project.status}
                  </span>
                </div>
                <h3 className="text-fg mt-6">{project.title}</h3>
                <p className="text-fg-muted text-16 leading-relaxed mt-3">{project.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
