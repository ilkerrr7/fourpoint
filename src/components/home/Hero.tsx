"use client";

import { Container, Badge, Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-end bg-ink">
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <Container className="relative z-10 w-full">
        <div className="max-w-4xl pb-20 pt-32 md:pb-28 md:pt-40">
          <div
            className="opacity-0 mb-8"
            style={{ animation: "reveal-up 0.8s var(--ease-out-expo) forwards", animationDelay: "100ms" }}
          >
            <Badge>Meta Reklam Yönetimi</Badge>
          </div>

          <h1
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.98] text-fg mb-8 opacity-0"
            style={{ animation: "reveal-up 0.9s var(--ease-out-expo) forwards", animationDelay: "220ms" }}
          >
            Reklamlarınız <em className="italic text-fg-muted">doğru</em> insanlara
            ulaşsın.
          </h1>

          <p
            className="text-lg md:text-xl text-fg-muted max-w-xl leading-relaxed mb-12 opacity-0"
            style={{ animation: "reveal-up 0.9s var(--ease-out-expo) forwards", animationDelay: "380ms" }}
          >
            Instagram ve Facebook reklamlarınızı stratejik yönetiyoruz. Kime,
            ne zaman, nasıl gösterildiğini bilmeniz için şeffaf çalışıyoruz.
          </p>

          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0"
            style={{ animation: "reveal-up 0.9s var(--ease-out-expo) forwards", animationDelay: "520ms" }}
          >
            <Button variant="primary" size="lg" href="/iletisim">
              Ücretsiz Görüşme Al
            </Button>
            <Button variant="ghost" size="lg" href="/nasil-calisiyoruz">
              Nasıl Çalışıyoruz →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
