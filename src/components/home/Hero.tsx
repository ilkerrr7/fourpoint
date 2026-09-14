"use client";

import { Container, Badge, Button } from "@/components/ui";
import { GridBackground, GlowOrb } from "@/components/decorative";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-ink">
      <GridBackground className="absolute inset-0 z-0" />
      <GlowOrb className="absolute top-0 right-0 z-0 opacity-50" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center py-20 md:py-32">
          <div 
            className="opacity-0 mb-6"
            style={{ animation: "reveal-up 0.8s ease-out forwards", animationDelay: "100ms" }}
          >
            <Badge>Meta Reklam Yönetimi</Badge>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-fg mb-6 opacity-0"
            style={{ animation: "reveal-up 0.8s ease-out forwards", animationDelay: "200ms" }}
          >
            Reklamlarınız doğru insanlara ulaşsın, bütçeniz boşa gitmesin.
          </h1>
          
          <p 
            className="text-lg md:text-xl text-fg-muted mb-10 leading-relaxed opacity-0"
            style={{ animation: "reveal-up 0.8s ease-out forwards", animationDelay: "300ms" }}
          >
            Instagram ve Facebook reklamlarınızı stratejik yönetiyoruz. Kime, ne zaman, nasıl gösterildiğini bilmeniz için şeffaf çalışıyoruz.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
            style={{ animation: "reveal-up 0.8s ease-out forwards", animationDelay: "400ms" }}
          >
            <Button variant="primary" size="lg" href="/iletisim">
              Ücretsiz Görüşme Al
            </Button>
            <Button variant="secondary" size="lg" href="/nasil-calisiyoruz">
              Nasıl Çalışıyoruz
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
