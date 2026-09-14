"use client";

import { Container, SectionHeading, Card } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const painPoints = [
  {
    emoji: "💸",
    text: "Reklama para harcadım ama kime gösterildiğini bile bilmiyorum."
  },
  {
    emoji: "📉",
    text: "Ajansla çalıştım, raporları anlayamadım, sonuç da gelmedi."
  },
  {
    emoji: "🎯",
    text: "Hedefleme yanlış yapılıyor ama nasıl düzeltileceğini bilmiyorum."
  },
  {
    emoji: "🤷",
    text: "Reklam veriyorum, tıklama geliyor ama satışa dönmüyor."
  }
];

export function PainPoints() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-32 bg-ink">
      <Container>
        <SectionHeading 
          badge="Tanıdık Geldi mi?" 
          title="Bu cümleleri daha önce kurdunuz mu?" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mt-12 md:mt-16">
          {painPoints.map((point, index) => (
            <div key={index} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card variant="surface" hover className="h-full">
                <div className="flex gap-4 items-start p-6">
                  <div className="rounded-xl bg-elevated p-3 text-2xl flex-shrink-0 flex items-center justify-center">
                    {point.emoji}
                  </div>
                  <p className="text-fg-muted text-sm leading-relaxed mt-1">
                    {point.text}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
