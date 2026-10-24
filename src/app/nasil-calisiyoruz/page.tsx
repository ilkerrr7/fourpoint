import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, SectionHeading, Badge, Button } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Nasıl Çalışıyoruz: Üç Adımda Reklam Yönetimi",
  description:
    "Ücretsiz keşif görüşmesi, strateji ve kurulum, sürekli optimizasyon ve raporlama. Onayınız olmadan reklam açmıyoruz; her adımı önceden bilirsiniz.",
  path: "/nasil-calisiyoruz",
});

const STEPS = [
  {
    number: 1,
    title: "Keşif Görüşmesi",
    description:
      "İşinizi, müşterinizi ve beklentinizi anlıyoruz. Bu görüşme ücretsiz ve bağlayıcı değil.",
    details: [
      "İşletmenizin hedef kitlesini birlikte tanımlıyoruz",
      "Daha önce yapılan reklam çalışmalarını değerlendiriyoruz",
      "Beklentilerinizi ve bütçe aralığınızı konuşuyoruz",
      "Sizin için uygun olup olmadığımızı dürüstçe değerlendiriyoruz",
    ],
  },
  {
    number: 2,
    title: "Strateji ve Kurulum",
    description:
      "Hedef kitle analizi, reklam stratejisi ve kreatif planlamayı birlikte oluşturuyoruz.",
    details: [
      "Reklam hesabınızı sizin adınıza açıyoruz — hesap her zaman sizin",
      "Hedef kitle segmentasyonu ve kanal stratejisi belirliyoruz",
      "Reklam kreatiflerini ve metinlerini planlıyoruz",
      "Onayınız olmadan reklam açmıyoruz",
    ],
  },
  {
    number: 3,
    title: "Optimizasyon ve Raporlama",
    description:
      "Reklamları sürekli izliyor, optimize ediyor ve size düzenli, anlaşılır raporlar sunuyoruz.",
    details: [
      "Kampanyaları veri odaklı optimize ediyoruz",
      "A/B testleriyle en iyi performansı arıyoruz",
      "Düzenli raporlarla ne olduğunu net anlatıyoruz",
      "Stratejiyi sonuçlara göre birlikte güncelliyoruz",
    ],
  },
];

export default function NasilCalisiyoruzPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd([{ name: "Nasıl Çalışıyoruz", path: "/nasil-calisiyoruz" }])} />
      {/* Header */}
      <section className="py-16 md:py-24 bg-ink" aria-labelledby="nasil-heading">
        <Container>
          <SectionHeading
            as="h1"
            headingId="nasil-heading"
            badge="Süreç"
            title="Nasıl çalışıyoruz?"
            description="Üç adımda net bir süreç. Sürpriz yok, gizli adım yok. Her şeyi önceden konuşuruz."
          />
        </Container>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-20 bg-surface/50" aria-label="Çalışma adımları">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            {STEPS.map((step) => (
              <div key={step.number} className="relative">
                {/* Step number + title */}
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-[var(--radius-button)] bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="font-heading text-22 font-semibold text-primary">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-fg mb-3">
                      {step.title}
                    </h2>
                    <p className="text-fg-muted text-18 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-fg-muted text-14"
                        >
                          <svg
                            className="w-5 h-5 text-primary shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Connecting line */}
                {step.number < STEPS.length && (
                  <div className="absolute left-7 top-[4.5rem] w-px h-[calc(100%-2rem)] bg-deep/40" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink text-center" aria-label="İlk adım">
        <Container>
          <Badge>İlk Adım</Badge>
          <h2 className="text-fg mt-4 mb-4">
            İlk adımı birlikte atalım.
          </h2>
          <p className="text-fg-muted text-18 mb-8 max-w-xl mx-auto">
            Ücretsiz keşif görüşmesinde işletmenizi tanıyalım. Bağlayıcı değil, sadece bir sohbet.
          </p>
          <Button variant="primary" size="lg" href="/iletisim">
            Ücretsiz Görüşme Al
          </Button>
        </Container>
      </section>
    </PageTransition>
  );
}
