"use client";

import { Container, SectionHeading } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    title: "Keşif Görüşmesi",
    desc: "İşinizi, müşterinizi ve beklentinizi anlıyoruz. Bu görüşme ücretsiz ve bağlayıcı değil."
  },
  {
    title: "Strateji ve Kurulum",
    desc: "Hedef kitle analizi, reklam stratejisi ve kreatif planlamayı birlikte oluşturuyoruz. Onayınız olmadan reklam açmıyoruz."
  },
  {
    title: "Optimizasyon ve Raporlama",
    desc: "Reklamları sürekli izliyor, optimize ediyor ve size düzenli, anlaşılır raporlar sunuyoruz."
  }
];

export function Process() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-32 bg-ink">
      <Container>
        <SectionHeading 
          badge="Süreç" 
          title="Nasıl çalışıyoruz?" 
          description="Üç adımda net bir süreç. Sürpriz yok, gizli adım yok." 
        />
        
        <div className="max-w-2xl mx-auto mt-12 md:mt-16 space-y-0">
          {steps.map((step, index) => (
            <div key={index} className={`flex transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="flex flex-col items-center mr-6">
                <div className="w-10 h-10 rounded-full border-2 border-deep flex items-center justify-center font-heading font-bold text-accent flex-shrink-0">
                  {index + 1}
                </div>
                {index !== steps.length - 1 && (
                  <div className="w-px h-full min-h-[3rem] bg-deep/50 my-2"></div>
                )}
              </div>
              <div className="pb-8 pt-1">
                <h3 className="font-heading text-xl font-semibold mb-2 text-fg">
                  {step.title}
                </h3>
                <p className="text-fg-muted text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
