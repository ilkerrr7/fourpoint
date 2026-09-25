import type { Metadata } from "next";
import { Container, SectionHeading, Button } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Instagram ve Facebook reklam yönetimi, retargeting, raporlama ve analiz hizmetlerimiz.",
};

const SERVICES = [
  {
    title: "Instagram Reklam Yönetimi",
    description:
      "Hedef kitlenize görsel ve video reklamlarla ulaşıyoruz. Hikaye, Reels ve akış reklamlarını stratejik olarak yönetiyoruz.",
    details: [
      "Hedef kitle araştırması ve segmentasyon",
      "Reklam kreatif planlaması",
      "A/B testleri ile sürekli iyileştirme",
      "Hikaye, Reels ve akış formatlarında reklam",
      "Performans takibi ve optimizasyon",
    ],
  },
  {
    title: "Facebook Reklam Yönetimi",
    description:
      "Geniş Facebook ağında işletmenizi potansiyel müşterilerinizin önüne çıkarıyoruz. Doğru formatta, doğru kitleye.",
    details: [
      "Detaylı demografik ve ilgi alanı hedeflemesi",
      "Lookalike (benzer hedef kitle) oluşturma",
      "Lead generation kampanyaları",
      "Katalog ve dinamik ürün reklamları",
      "Dönüşüm optimizasyonu",
    ],
  },
  {
    title: "Retargeting (Yeniden Hedefleme)",
    description:
      "Sitenizi ziyaret edip ayrılanları geri kazanıyoruz. İlgilenen kitleyi tekrar yakalıyoruz.",
    details: [
      "Web sitesi ziyaretçi takibi",
      "Sepet terk eden kullanıcı kampanyaları",
      "Dinamik ürün retargeting",
      "Özel hedef kitle oluşturma",
      "Çapraz platform retargeting",
    ],
  },
  {
    title: "Raporlama ve Analiz",
    description:
      "Ne harcandı, ne kazanıldı, neyi değiştirmeli — her şeyi anlaşılır raporlarla paylaşıyoruz.",
    details: [
      "Düzenli performans raporları",
      "Harcama ve dönüşüm analitiği",
      "Hedef kitle davranış analizi",
      "Kampanya karşılaştırma raporları",
      "Aksiyon önerileri ile birlikte sunulan veriler",
    ],
  },
];

export default function HizmetlerPage() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="py-16 md:py-24 bg-ink" aria-labelledby="hizmetler-heading">
        <Container>
          <SectionHeading
            badge="Hizmetler"
            title="İşletmeniz için ne yapıyoruz?"
            description="Meta platformlarında işletmenizin reklamlarını stratejik olarak yönetiyoruz. Her adımı şeffaf, her sonucu ölçülebilir."
          />
        </Container>
      </section>

      {/* Service details */}
      <section className="py-section-sm bg-ink" aria-label="Hizmet detayları">
        <Container>
          <div className="max-w-4xl border-t border-deep">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-14 border-b border-deep"
              >
                <span className="md:col-span-1 font-heading text-14 text-fg-subtle">
                  0{index + 1}
                </span>

                <div className="md:col-span-11">
                  <h2
                    className="font-heading text-22 md:text-28 font-medium text-fg mb-4"
                    id={`service-${index}`}
                  >
                    {service.title}
                  </h2>
                  <p className="text-fg-muted text-18 leading-relaxed mb-6 max-w-2xl">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-baseline gap-3 text-fg-muted text-14"
                      >
                        <span className="text-accent shrink-0" aria-hidden="true">—</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink text-center" aria-label="İletişim çağrısı">
        <Container>
          <h2 className="font-heading text-22 md:text-28 font-bold text-fg mb-4">
            Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?
          </h2>
          <p className="text-fg-muted text-18 mb-8 max-w-xl mx-auto">
            Ücretsiz keşif görüşmesinde işletmenizi tanıyalım ve size uygun çözümü birlikte belirleyelim.
          </p>
          <Button variant="primary" size="lg" href="/iletisim">
            Ücretsiz Görüşme Al
          </Button>
        </Container>
      </section>
    </PageTransition>
  );
}
