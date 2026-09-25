"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FourPointMark } from "@/components/decorative/FourPointMark";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ClosingCTA() {
  const { ref, isRevealed: isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-surface border-t border-deep" ref={ref}>
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <Container className="relative z-10">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <FourPointMark className="w-16 h-16 md:w-20 md:h-20 mb-10" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-fg">
            İşletmenizin reklamlarını birlikte yönetelim.
          </h2>
          <p className="text-fg-muted text-lg mt-6 mb-10 max-w-xl mx-auto">
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
