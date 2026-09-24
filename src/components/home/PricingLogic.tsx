"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pricingItems = [
  {
    title: "Ajans Ücreti",
    description: "Stratejinizi oluşturmak, reklamları yönetmek ve optimize etmek için aldığımız hizmet bedelidir. İşletmenize özel belirlenir.",
  },
  {
    title: "Reklam Bütçesi",
    description: "Meta'ya doğrudan ödediğiniz reklam harcamasıdır. Bu para bize değil, reklam platformuna gider.",
  },
  {
    title: "Neden Ayrı?",
    description: "Ajans ücreti ile reklam bütçesi farklı kalemlerdir. Biz ikisini birbirine karıştırmayız, siz de karıştırmayın.",
  },
  {
    title: "Gizli Maliyet Yok",
    description: "Kurulum ücreti, çıkış cezası, sürpriz fatura yok. Başlamadan önce her şeyi konuşuruz.",
  },
];

export function PricingLogic() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section className="py-section bg-surface border-t border-deep" ref={ref}>
      <Container>
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeading
            badge="Ücretlendirme"
            title="Neyi neden ücretlendiriyoruz?"
            description="Fiyat listesi vermiyoruz çünkü her işletmenin ihtiyacı farklı. Ama neye para ödediğinizi bilmeniz hakkınız."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-4xl mx-auto mt-16 md:mt-20 border-t border-deep md:border-t-0">
          {pricingItems.map((item, index) => (
            <div
              key={item.title}
              className={`py-8 border-b border-deep transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 120}ms` }}
            >
              <h3 className="font-heading font-medium text-lg mb-2 text-fg">{item.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
