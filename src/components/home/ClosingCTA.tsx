"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/decorative/GlowOrb";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ClosingCTA() {
  const { ref, isRevealed: isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep/80 via-ink to-ink" />
      <GlowOrb className="absolute -top-20 -right-20" color="primary" size="lg" />
      
      <Container className="relative z-10">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-fg">
            İşletmenizin reklamlarını birlikte yönetelim.
          </h2>
          <p className="text-fg-muted text-lg mt-4 mb-8">
            Ücretsiz keşif görüşmesinde işletmenizi tanıyalım, size özel bir yol haritası çıkaralım.
          </p>
          <Button variant="primary" size="lg" href="/iletisim">
            Ücretsiz Görüşme Al
          </Button>
        </div>
      </Container>
    </section>
  );
}
