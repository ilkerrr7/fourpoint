import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, SectionHeading, Badge, Button, Card } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Meta ve Google Reklam Hizmetleri",
  description:
    "Meta ve Google reklam yönetimi, retargeting ve anlaşılır raporlama. Four Point Medya ile reklam bütçenizin nereye gittiğini her zaman bilin.",
  path: "/hizmetler",
});

interface Service {
  title: string;
  description: string;
  details: string[];
}

interface ServiceGroup {
  /** Footer and the home page link straight to these: /hizmetler#<id> */
  id: string;
  label: string;
  title: string;
  intro: string;
  services: Service[];
}

/**
 * Two platform groups as plain stacked sections, not tabs: this is the page
 * search engines land on for both "instagram reklam" and "google reklam", so
 * both groups have to be in the HTML, and `#hizmetler-google` has to scroll
 * with no JavaScript at all. The home page keeps its tabbed summary.
 */
const GROUPS: ServiceGroup[] = [
  {
    id: "hizmetler-meta",
    label: "Meta Reklamları",
    title: "Instagram ve Facebook",
    intro:
      "Hedef kitlenizi bulup reklamınızı onların önüne çıkarıyoruz. Kreatifi test ediyor, çalışanı büyütüyoruz.",
    services: [
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
    ],
  },
  {
    id: "hizmetler-google",
    label: "Google Reklamları",
    title: "Arama, Haritalar ve YouTube",
    intro:
      "Google'da sizi arayan müşteriyi tam o anda yakalıyor, haritalarda ve YouTube'da görünürlüğünüzü artırıyoruz.",
    services: [
      {
        title: "Google Arama Ağı Reklamları",
        description:
          "Sizi arayan müşterinin karşısına tam aradığı anda çıkıyoruz. Hazır talebi yakalıyor, bütçeyi boşa giden kelimelere değil satın almaya hazır aramalara harcıyoruz.",
        details: [
          "Anahtar kelime araştırması ve niyet analizi",
          "Negatif kelime listesiyle boşa giden harcamayı kesme",
          "Başlık ve açıklama varyantlarıyla reklam metni testleri",
          "Teklif stratejisi ve bölge hedeflemesi",
          "Arama terimi raporuyla düzenli temizlik",
        ],
      },
      {
        title: "Google Haritalar ve Yerel Görünürlük",
        description:
          "“Yakınımda” diye arayan müşteri sizi bulsun. Google İşletme Profilinizi kuruyor, düzenli tutuyor ve haritalarda görünürlüğünüzü artırıyoruz.",
        details: [
          "Google İşletme Profili kurulumu ve doğrulama",
          "Kategori, hizmet ve çalışma saati düzeni",
          "Fotoğraf ve güncelleme yönetimi",
          "Yorum toplama akışı ve yanıt yönetimi",
          "Yakındaki aramalarda reklamla ilk sırada görünme",
        ],
      },
      {
        title: "Performance Max ve YouTube",
        description:
          "Arama, YouTube, Gmail, Discover ve Haritalar'da tek kampanyayla görünün. Google'ın tüm ağını hedefinize göre çalıştırıyoruz.",
        details: [
          "Performance Max kurulumu ve varlık setleri",
          "Video ve görsel kreatiflerin hazırlanması",
          "YouTube'da hedef kitle ve yerleşim seçimi",
          "Kitle sinyalleri ve dışlamalarla bütçe koruması",
        ],
      },
      {
        title: "Dönüşüm Takibi ve Raporlama",
        description:
          "Hangi aramanın müşteriye dönüştüğünü ölçmeden reklam vermiyoruz. Formu, telefonu ve WhatsApp'ı tek tek işaretliyor, maliyetini raporluyoruz.",
        details: [
          "Google Tag ve GA4 kurulumu, dönüşüm işaretlemesi",
          "Form, telefon ve WhatsApp tıklamasının ayrı ölçümü",
          "Gelişmiş dönüşümler kurulumu",
          "Anahtar kelime bazında maliyet ve dönüşüm raporu",
          "Aksiyon önerileriyle gelen aylık rapor",
        ],
      },
    ],
  },
];

/** The work around the ads. Footer links here as /hizmetler#web-icerik. */
const SUPPORT: { title: string; description: string }[] = [
  {
    title: "Web Sitesi",
    description:
      "Reklamın indiği sayfa dönüşmüyorsa bütçe boşa gider. Hızlı açılan, telefonda düzgün görünen ve tek işi form doldurtmak olan sayfalar kuruyoruz.",
  },
  {
    title: "İçerik ve Reels Üretimi",
    description:
      "Reklamı reklam yapan şey kreatif. Çekimden kurguya, test edilecek varyantlarıyla birlikte üretiyoruz.",
  },
  {
    title: "Sosyal Medya Yönetimi",
    description:
      "Reklamla gelen kişi profilinize baktığında ikna olsun. Düzenli paylaşım, tutarlı görsel dil, mesaj yanıtlama.",
  },
];

export default function HizmetlerPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd([{ name: "Hizmetler", path: "/hizmetler" }])} />
      {/* Header */}
      <section className="py-16 md:py-24 bg-ink" aria-labelledby="hizmetler-heading">
        <Container>
          <SectionHeading
            as="h1"
            headingId="hizmetler-heading"
            badge="Hizmetler"
            title="İşletmeniz için ne yapıyoruz?"
            description="Meta ve Google'da işletmenizin reklamlarını stratejik olarak yönetiyoruz. Her adımı şeffaf, her sonucu ölçülebilir."
          />

          {/* Jump links: the two platform groups are long, so the choice is
              offered up front instead of making people scroll to find it. */}
          <nav className="mt-10 flex flex-wrap items-center gap-3" aria-label="Hizmet grupları">
            {GROUPS.map((group) => (
              <Button key={group.id} href={`#${group.id}`} variant="secondary" size="sm">
                {group.label}
              </Button>
            ))}
            <Button href="#web-icerik" variant="ghost" size="sm">
              Web &amp; İçerik
            </Button>
          </nav>
        </Container>
      </section>

      {/* Service details, one section per platform */}
      {GROUPS.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="py-section-sm bg-ink border-t border-deep"
          aria-labelledby={`${group.id}-heading`}
        >
          <Container>
            <div className="max-w-4xl space-y-5">
              <Badge>{group.label}</Badge>
              <h2
                id={`${group.id}-heading`}
                className="text-fg"
              >
                {group.title}
              </h2>
              <p className="text-fg-muted text-18 leading-relaxed max-w-2xl">{group.intro}</p>
            </div>

            <div className="max-w-4xl border-t border-deep mt-10 md:mt-12">
              {group.services.map((service, index) => (
                <div
                  key={service.title}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-14 border-b border-deep"
                >
                  <span className="md:col-span-1 font-heading text-14 text-fg-subtle">
                    0{index + 1}
                  </span>

                  <div className="md:col-span-11">
                    <h3 className="text-fg mb-4">
                      {service.title}
                    </h3>
                    <p className="text-fg-muted text-18 leading-relaxed mb-6 max-w-2xl">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-baseline gap-3 text-fg-muted text-14"
                        >
                          <span className="text-primary shrink-0" aria-hidden="true">—</span>
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
      ))}

      {/* Support services — the work the ads need around them */}
      <section
        id="web-icerik"
        className="py-section-sm bg-ink border-t border-deep"
        aria-labelledby="web-icerik-heading"
      >
        <Container>
          <div className="max-w-4xl space-y-5">
            <Badge>Destek Hizmetleri</Badge>
            <h2
              id="web-icerik-heading"
              className="text-fg"
            >
              Reklamın çalışması için gerekenler
            </h2>
            <p className="text-fg-muted text-18 leading-relaxed max-w-2xl">
              Reklam tek başına yetmiyor. İndiği sayfayı, kreatifi ve profili de biz yapıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
            {SUPPORT.map((item) => (
              <Card key={item.title} hover className="h-full p-6 md:p-8 flex flex-col">
                <h3 className="text-fg">{item.title}</h3>
                <p className="text-fg-muted text-16 leading-relaxed mt-3">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink text-center" aria-label="İletişim çağrısı">
        <Container>
          <h2 className="text-fg mb-4">
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
