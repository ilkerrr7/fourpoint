"use client";

import { Container, Badge } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const painPoints = [
  "Reklama para harcadım ama kime gösterildiğini bile bilmiyorum.",
  "Ajansla çalıştım, raporları anlayamadım, sonuç da gelmedi.",
  "Hedefleme yanlış yapılıyor ama nasıl düzeltileceğini bilmiyorum.",
  "Reklam veriyorum, tıklama geliyor ama satışa dönmüyor.",
];

export function PainPoints() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-section bg-ink border-t border-deep">
      <Container>
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Badge>Tanıdık Geldi mi?</Badge>
        </div>

        <div className="max-w-3xl mt-10 space-y-2">
          {painPoints.map((point, index) => (
            <p
              key={point}
              className={`font-heading text-2xl md:text-4xl leading-[1.3] text-fg-muted transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              &ldquo;{point}&rdquo;
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
