"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pricingItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 17V7" />
      </svg>
    ),
    title: "Ajans Ücreti",
    description: "Stratejinizi oluşturmak, reklamları yönetmek ve optimize etmek için aldığımız hizmet bedelidir. İşletmenize özel belirlenir.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
    title: "Reklam Bütçesi",
    description: "Meta'ya doğrudan ödediğiniz reklam harcamasıdır. Bu para bize değil, reklam platformuna gider.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5" />
        <path d="M8 3H3v5" />
        <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
        <path d="m15 9 6-6" />
      </svg>
    ),
    title: "Neden Ayrı?",
    description: "Ajans ücreti ile reklam bütçesi farklı kalemlerdir. Biz ikisini birbirine karıştırmayız, siz de karıştırmayın.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
    title: "Gizli Maliyet Yok",
    description: "Kurulum ücreti, çıkış cezası, sürpriz fatura yok. Başlamadan önce her şeyi konuşuruz.",
  },
];

export function PricingLogic() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section className="py-section bg-ink" ref={ref}>
      <Container>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeading
            badge="Ücretlendirme"
            title="Neyi neden ücretlendiriyoruz?"
            description="Fiyat listesi vermiyoruz çünkü her işletmenin ihtiyacı farklı. Ama neye para ödediğinizi bilmeniz hakkınız."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
          {pricingItems.map((item, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <Card variant="surface" hover className="p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-fg">{item.title}</h3>
                <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
