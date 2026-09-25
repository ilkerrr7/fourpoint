import { Container, Badge, Button } from "@/components/ui";
import { FourPointMark } from "@/components/decorative/FourPointMark";
import "./hero.css";

/**
 * Purely typographic hero: the headline is the image. Sizing lives in
 * hero.css (container-query fitted, measured per line).
 *
 * A server component on purpose: the headline, eyebrow and CTAs are in the
 * HTML and visible on the very first paint — no hydration, no JS needed. The
 * entrance is a CSS animation (hero.css) that only moves the lines; it never
 * hides them, so a slow phone never shows an empty hero.
 */
export function Hero() {
  return (
    <section className="hero relative overflow-clip bg-ink min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)]">
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <div className="hero-mark" aria-hidden="true">
        <FourPointMark interactive={false} className="w-full h-full" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex-col justify-start pt-10 md:justify-center md:pt-8 pb-20">
          <div className="hero-fit">
            <div className="hero-rise hero-rise--eyebrow">
              <Badge>Meta Reklam Yönetimi</Badge>
            </div>

            <div className="hero-stage mt-6">
              <h1 className="hero-title font-heading font-bold text-fg">
                <span className="hero-line hero-l1">Reklamlarınız</span>
                <span className="hero-line hero-l2">
                  <em className="hero-w1 not-italic font-normal text-fg-muted">doğru</em>{" "}
                  <span className="hero-w2">insanlara</span>
                </span>
                <span className="hero-line hero-l3">ulaşsın.</span>
              </h1>

              <div className="hero-credits hero-rise hero-rise--credits mt-8">
                <p className="text-16 text-fg-muted leading-relaxed max-w-md">
                  Instagram ve Facebook reklamlarınızı stratejik yönetiyoruz. Kime, ne
                  zaman, nasıl gösterildiğini bilmeniz için şeffaf çalışıyoruz.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button variant="primary" size="md" href="/iletisim">
                    Ücretsiz Görüşme Al
                  </Button>
                  <Button variant="ghost" size="md" href="/nasil-calisiyoruz">
                    Nasıl Çalışıyoruz →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
