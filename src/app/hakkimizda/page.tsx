import type { Metadata } from "next";
import { Container, SectionHeading, Card, Badge, Button } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Fourpoint olarak işletmelerin dijital reklamlarını şeffaf ve veri odaklı yönetiyoruz.",
};

export default function HakkimizdaPage() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="py-16 md:py-24 bg-ink" aria-labelledby="hakkimizda-heading">
        <Container>
          <SectionHeading
            badge="Hakkımızda"
            title="İşletmelerin yanında, dürüst ve şeffaf."
            description="Fourpoint, Meta platformlarında reklam yönetimi yapan bir dijital pazarlama ajansıdır."
          />
        </Container>
      </section>

      {/* Mission / Approach */}
      <section className="py-12 md:py-20 bg-surface/50" aria-label="Yaklaşımımız">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Badge>Yaklaşımımız</Badge>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-fg mt-4 mb-6">
              Neden bu işi yapıyoruz?
            </h2>
            <div className="space-y-4 text-fg-muted text-lg leading-relaxed">
              <p>
                Birçok işletme sahibi dijital reklamlara para harcıyor ama
                sonuç alamıyor. Hedefleme yanlış yapılıyor, raporlar anlaşılmıyor,
                bütçe nereye gidiyor belli olmuyor.
              </p>
              <p>
                Fourpoint olarak bu sorunu çözmek için yola çıktık. Amacımız
                işletmelerin reklam süreçlerini şeffaf, anlaşılır ve sonuç
                odaklı yönetmek.
              </p>
              <p>
                Reklam hesabınız her zaman size ait olur. Her adımı görürsünüz.
                Raporlarımız teknik jargon yerine somut sonuçları anlatır.
                Bütçenizin nereye gittiğini her zaman bilirsiniz.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-ink" aria-label="Değerlerimiz">
        <Container>
          <SectionHeading
            badge="Değerlerimiz"
            title="Neye inanıyoruz?"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
            <Card variant="surface" hover className="p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-fg mb-2">Şeffaflık</h3>
              <p className="text-fg-muted text-sm leading-relaxed">
                Gizli kalem, sürpriz fatura, anlaşılmayan rapor olmaz.
                Her şeyi açıkça konuşuruz.
              </p>
            </Card>

            <Card variant="surface" hover className="p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-fg mb-2">Dürüstlük</h3>
              <p className="text-fg-muted text-sm leading-relaxed">
                Yapamayacağımız şeyi vaat etmeyiz. Durum ne olursa olsun,
                gerçeği söyleriz.
              </p>
            </Card>

            <Card variant="surface" hover className="p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-fg mb-2">Veri Odaklılık</h3>
              <p className="text-fg-muted text-sm leading-relaxed">
                Kararlarımızı hislere değil, verilere dayandırırız.
                Her optimizasyon ölçülebilir sonuçlara dayanır.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Team placeholder */}
      {/* TODO: Ekip tanıtımı ilerleyen dönemde eklenebilir */}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-surface/50 text-center" aria-label="İletişim çağrısı">
        <Container>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-fg mb-4">
            Tanışalım mı?
          </h2>
          <p className="text-fg-muted text-lg mb-8 max-w-xl mx-auto">
            İşletmenizi anlamak, ihtiyaçlarınızı dinlemek ve birlikte çalışıp
            çalışamayacağımızı değerlendirmek için bir görüşme yapalım.
          </p>
          <Button variant="primary" size="lg" href="/iletisim">
            Ücretsiz Görüşme Al
          </Button>
        </Container>
      </section>
    </PageTransition>
  );
}
