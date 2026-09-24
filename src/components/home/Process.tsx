"use client";

import { Container, SectionHeading } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    title: "Keşif Görüşmesi",
    desc: "İşinizi, müşterinizi ve beklentinizi anlıyoruz. Bu görüşme ücretsiz ve bağlayıcı değil.",
  },
  {
    title: "Strateji ve Kurulum",
    desc: "Hedef kitle analizi, reklam stratejisi ve kreatif planlamayı birlikte oluşturuyoruz. Onayınız olmadan reklam açmıyoruz.",
  },
  {
    title: "Optimizasyon ve Raporlama",
    desc: "Reklamları sürekli izliyor, optimize ediyor ve size düzenli, anlaşılır raporlar sunuyoruz.",
  },
];

export function Process() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-section bg-surface border-t border-deep">
      <Container>
        <SectionHeading badge="Süreç" title="Nasıl çalışıyoruz?" description="Üç adımda net bir süreç. Sürpriz yok, gizli adım yok." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto mt-16 md:mt-20">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 130}ms` }}
            >
              <span className="font-heading text-5xl text-fg-subtle">0{index + 1}</span>
              <h3 className="font-heading text-xl font-medium mt-4 mb-3 text-fg">
                {step.title}
              </h3>
              <p className="text-fg-muted text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
