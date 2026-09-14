"use client";

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GlowOrb } from "@/components/decorative/GlowOrb";
import { GeometricSVG } from "@/components/decorative/GeometricSVG";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const differentiators = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Şeffaf Süreç",
    description: "Reklam hesabınız sizin adınıza açılır, her adımı görürsünüz. Karanlıkta kalan bir şey olmaz.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Anlaşılır Raporlama",
    description: "Teknik jargon değil, somut sonuçlar. Ne harcandı, ne oldu, sırada ne var — net bir dille.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Bütçe Kontrolü Sizde",
    description: "Reklam bütçenizi siz belirlersiniz. Biz yönetiriz, ama harcama kararı her zaman sizin.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Sürekli Optimizasyon",
    description: "Reklamları açıp bırakmıyoruz. Veriye bakarak sürekli iyileştiriyoruz.",
  },
];

export function Differentiators() {
  const { ref, isRevealed: isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-section bg-surface/50 relative overflow-hidden" ref={ref as React.Ref<HTMLElement>}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Geometric illustration */}
          <div className={`relative hidden lg:block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <GeometricSVG className="w-full max-w-md mx-auto opacity-80" />
            <GlowOrb className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="deep" size="md" />
          </div>
          
          {/* Right: Content */}
          <div>
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Badge>Farkımız</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-4 mb-8 text-fg">Neden Fourpoint?</h2>
            </div>
            
            <div className="space-y-6">
              {differentiators.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex gap-4 items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent shrink-0 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-fg mb-1">{item.title}</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
