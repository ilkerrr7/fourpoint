import type { Metadata } from "next";
import { Container, Badge, Button, Arrow } from "@/components/ui";
import { FourPointMark } from "@/components/decorative/FourPointMark";
import { AmbientField } from "@/components/home/AmbientField";
import "@/components/home/hero.css";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa bulunamadı. Ana sayfadan devam edebilir ya da bize doğrudan yazabilirsiniz.",
  // replaces the layout's "index, follow", so the page does not carry two
  // contradicting robots tags next to the noindex Next injects for 404s
  robots: { index: false, follow: true },
};

/**
 * 404 — rendered inside the root layout, so the header and footer stay and
 * the visitor is never stranded. Next adds `robots: noindex` automatically.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-clip min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)]">
      {/* ana sayfanın dili: arkada ışık alanı, hero'nun vinyeti ve işareti,
          metin ilk boyamada görünür, giriş yalnızca hareket (hero.css) */}
      <AmbientField mode="page" />
      <div className="vignette" aria-hidden="true" />
      <div
        className="absolute pointer-events-none opacity-[0.08] w-[min(70vw,90svh)] aspect-square -right-[12%] top-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <FourPointMark interactive={false} className="w-full h-full" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex-col justify-center py-20">
          <div className="hero-rise hero-rise--eyebrow">
            <Badge>404</Badge>
          </div>
          <h1 className="hero-line hero-l1 mt-6 text-fg max-w-3xl !whitespace-normal">
            Aradığınız sayfa bulunamadı.
          </h1>
          <div className="hero-rise hero-rise--credits">
            <p className="mt-6 max-w-xl text-18 text-fg-muted leading-relaxed">
              Bağlantı eskimiş ya da adres yanlış yazılmış olabilir. Ana sayfadan
              devam edebilir ya da bize doğrudan yazabilirsiniz.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button variant="primary" size="md" href="/">
                Ana sayfaya dön
              </Button>
              <Button variant="ghost" size="md" href="/iletisim">
                Bize yazın <Arrow />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
