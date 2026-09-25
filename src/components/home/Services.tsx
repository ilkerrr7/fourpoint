"use client";

import { motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";

const services = [
  {
    title: "Instagram Reklam Yönetimi",
    desc: "Hedef kitlenize görsel ve video reklamlarla ulaşıyoruz. Doğru kitleye, doğru mesajla.",
  },
  {
    title: "Facebook Reklam Yönetimi",
    desc: "Geniş Facebook ağında işletmenizi potansiyel müşterilerinizin önüne çıkarıyoruz.",
  },
  {
    title: "Retargeting",
    desc: "Sitenizi ziyaret edip ayrılanları geri kazanıyoruz. İlgilenen kitleyi kaybetmiyoruz.",
  },
  {
    title: "Raporlama ve Analiz",
    desc: "Ne harcandı, ne kazanıldı, neyi değiştirmeli — her şeyi anlaşılır raporlarla paylaşıyoruz.",
  },
];

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const row = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function Services() {
  return (
    <section className="py-section bg-ink border-t border-deep">
      <Container>
        <SectionHeading
          badge="Hizmetler"
          title="İşletmeniz için ne yapıyoruz?"
          description="Dijital pazarlama hedeflerinize ulaşmak için etkili ve şeffaf çözümler sunuyoruz."
          align="left"
        />

        <motion.div
          className="mt-16 md:mt-20 border-t border-deep"
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href="/hizmetler"
              variants={row}
              className="group grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-3 md:gap-8 py-8 md:py-10 border-b border-deep"
            >
              <span className="md:col-span-1 font-heading text-sm text-fg-subtle">
                0{index + 1}
              </span>
              <h3 className="md:col-span-5 font-heading text-2xl md:text-3xl text-fg transition-colors duration-300 group-hover:text-fg-muted">
                {service.title}
              </h3>
              <p className="md:col-span-5 text-fg-muted text-base leading-relaxed">
                {service.desc}
              </p>
              <span
                className="md:col-span-1 justify-self-start md:justify-self-end text-fg-subtle transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
