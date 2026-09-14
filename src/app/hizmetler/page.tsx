import type { Metadata } from "next";
import { Container, SectionHeading, Card, Badge, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Instagram ve Facebook reklam yönetimi, retargeting, raporlama ve analiz hizmetlerimiz.",
};

const SERVICES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
      </svg>
    ),
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
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
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
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
      </svg>
    ),
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
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
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
    <>
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
      <section className="py-12 md:py-20 bg-surface/50" aria-label="Hizmet detayları">
        <Container>
          <div className="space-y-12 md:space-y-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Service info */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                    {service.icon}
                  </div>
                  <h2
                    className="font-heading text-2xl md:text-3xl font-bold text-fg mb-4"
                    id={`service-${index}`}
                  >
                    {service.title}
                  </h2>
                  <p className="text-fg-muted text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-fg-muted text-sm"
                      >
                        <svg
                          className="w-5 h-5 text-accent shrink-0 mt-0.5"
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

                {/* Decorative card */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Card variant="elevated" className="p-8 md:p-12">
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-3xl bg-accent/10 text-accent mx-auto mb-4 flex items-center justify-center">
                          {service.icon}
                        </div>
                        <p className="text-fg-subtle text-sm font-heading">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink text-center" aria-label="İletişim çağrısı">
        <Container>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-fg mb-4">
            Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?
          </h2>
          <p className="text-fg-muted text-lg mb-8 max-w-xl mx-auto">
            Ücretsiz keşif görüşmesinde işletmenizi tanıyalım ve size uygun çözümü birlikte belirleyelim.
          </p>
          <Button variant="primary" size="lg" href="/iletisim">
            Ücretsiz Görüşme Al
          </Button>
        </Container>
      </section>
    </>
  );
}
