"use client";

import { Container, SectionHeading } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

export function Services() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-section bg-ink border-t border-deep">
      <Container>
        <SectionHeading
          badge="Hizmetler"
          title="İşletmeniz için ne yapıyoruz?"
          description="Dijital pazarlama hedeflerinize ulaşmak için etkili ve şeffaf çözümler sunuyoruz."
          align="left"
        />

        <div className="mt-16 md:mt-20 border-t border-deep">
          {services.map((service, index) => (
            <a
              key={service.title}
              href="/hizmetler"
              className={`group grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-3 md:gap-8 py-8 md:py-10 border-b border-deep transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
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
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
