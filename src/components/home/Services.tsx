"use client";

import { Container, SectionHeading, Card } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
    title: "Instagram Reklam Yönetimi",
    desc: "Hedef kitlenize görsel ve video reklamlarla ulaşıyoruz. Doğru kitleye, doğru mesajla."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
    title: "Facebook Reklam Yönetimi",
    desc: "Geniş Facebook ağında işletmenizi potansiyel müşterilerinizin önüne çıkarıyoruz."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
    title: "Retargeting",
    desc: "Sitenizi ziyaret edip ayrılanları geri kazanıyoruz. İlgilenen kitleyi kaybetmiyoruz."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: "Raporlama ve Analiz",
    desc: "Ne harcandı, ne kazanıldı, neyi değiştirmeli — her şeyi anlaşılır raporlarla paylaşıyoruz."
  }
];

export function Services() {
  const { ref, isRevealed: isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-32 bg-surface/50">
      <Container>
        <SectionHeading 
          badge="Hizmetler" 
          title="İşletmeniz için ne yapıyoruz?" 
          description="Dijital pazarlama hedeflerinize ulaşmak için etkili ve şeffaf çözümler sunuyoruz." 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16">
          {services.map((service, index) => (
            <div key={index} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card variant="surface" hover className="h-full p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 text-fg">
                  {service.title}
                </h3>
                <p className="text-fg-muted text-sm leading-relaxed">
                  {service.desc}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
