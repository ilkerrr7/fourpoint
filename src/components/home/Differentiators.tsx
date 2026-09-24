"use client";

import { Container, Badge } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const differentiators = [
  {
    title: "Şeffaf Süreç",
    description: "Reklam hesabınız sizin adınıza açılır, her adımı görürsünüz. Karanlıkta kalan bir şey olmaz.",
  },
  {
    title: "Anlaşılır Raporlama",
    description: "Teknik jargon değil, somut sonuçlar. Ne harcandı, ne oldu, sırada ne var — net bir dille.",
  },
  {
    title: "Bütçe Kontrolü Sizde",
    description: "Reklam bütçenizi siz belirlersiniz. Biz yönetiriz, ama harcama kararı her zaman sizin.",
  },
  {
    title: "Sürekli Optimizasyon",
    description: "Reklamları açıp bırakmıyoruz. Veriye bakarak sürekli iyileştiriyoruz.",
  },
];

export function Differentiators() {
  const { ref, isRevealed: isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-section bg-ink border-t border-deep" ref={ref as React.Ref<HTMLElement>}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <Badge>Farkımız</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-medium mt-5 text-fg leading-[1.1]">
                Neden Fourpoint?
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-6 border-t border-deep">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 py-7 border-b border-deep transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="sm:col-span-4 font-heading text-lg font-medium text-fg">{item.title}</h3>
                <p className="sm:col-span-8 text-fg-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
