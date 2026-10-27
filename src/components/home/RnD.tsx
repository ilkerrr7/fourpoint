"use client";

import { motion } from "motion/react";
import { Container, SectionHeading, Card } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Durum = "Aktif" | "Sırada";

/**
 * Sıra kasıtlı: çalışan iş başta. Ölçüm altyapısı bugün sahada olan parça,
 * o yüzden tam satırlık geniş kart; kalan üçü onun altında küçük kartlar.
 * Hiçbirine tarih ya da süre vaadi yazılmaz — "Sırada" dediğimiz şey sıradadır,
 * ne zaman çıkacağı sözü vermeyiz.
 */
const projects: { title: string; status: Durum; desc: string }[] = [
  {
    title: "Ölçüm Altyapısı",
    status: "Aktif",
    desc: "Pixel ve Conversions API (CAPI) ile reklamdan gelen müşteriyi doğru ölçen kurulum.",
  },
  {
    title: "7/24 Reklam Otomasyonu",
    status: "Sırada",
    desc: "Meta ve Google'da bütçeyi, kitleyi ve kreatif performansını gece gündüz izlemek için tasarlanan sistem.",
  },
  {
    title: "Kreatif Yenileme",
    status: "Sırada",
    desc: "Performansı düşmeye başlayan kreatifleri erkenden yakalayıp yenisini hazırlayan akış.",
  },
  {
    title: "Müşteri Rapor Paneli",
    status: "Sırada",
    desc: "Harcamanızı, gelen müşteriyi ve maliyetini tek ekrandan görebileceğiniz panel.",
  },
];

// "Aktif" tek canlı madde, markanın gök mavisini o alır; "Sırada" paletin
// soluk metin rengiyle geride durur.
const DURUM_CLASS: Record<Durum, string> = {
  Aktif: "text-accent border-accent/40 bg-accent/10",
  Sırada: "text-fg-muted border-deep bg-elevated",
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
  const [aktif, ...sirada] = projects;

  return (
    <section id="ar-ge" className="py-section bg-ink border-t border-deep">
      <Container>
        <SectionHeading
          badge="AR-GE"
          title="Sistemi biz yazıyoruz."
          description="Reklamlarınızı yöneten altyapıyı kendi yazılım ekibimizle geliştiriyoruz. Sahada gördüğümüz her sorun, bir sonraki sürümün iş listesine giriyor. Her yeni modül önce kendi hesaplarımızda test edilir, sonra müşterilerimize açılır."
          align="left"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={card} className="md:col-span-3">
            <Card hover className="h-full p-6 md:p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <span className="font-heading text-14 text-fg-subtle">01</span>
                <span
                  className={`inline-flex items-center h-6 px-2.5 rounded-[var(--radius-badge)] border text-12 font-medium uppercase tracking-[0.12em] whitespace-nowrap ${DURUM_CLASS[aktif.status]}`}
                >
                  {aktif.status}
                </span>
              </div>
              <h3 className="text-fg mt-6">{aktif.title}</h3>
              <p className="text-fg-muted text-16 leading-relaxed mt-3 max-w-2xl">{aktif.desc}</p>
            </Card>
          </motion.div>

          {sirada.map((project, index) => (
            <motion.div key={project.title} variants={card} className="h-full">
              <Card hover className="h-full p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-heading text-14 text-fg-subtle">0{index + 2}</span>
                  <span
                    className={`inline-flex items-center h-6 px-2.5 rounded-[var(--radius-badge)] border text-12 font-medium uppercase tracking-[0.12em] whitespace-nowrap ${DURUM_CLASS[project.status]}`}
                  >
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
