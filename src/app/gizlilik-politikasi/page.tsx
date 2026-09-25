import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Fourpoint Gizlilik Politikası — Kişisel verilerinizi nasıl koruyoruz.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-ink" aria-labelledby="gizlilik-heading">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-invert prose-slate">
            <h1 id="gizlilik-heading" className="font-heading text-3xl md:text-4xl font-bold text-fg mb-8">
              Gizlilik Politikası
            </h1>

            {/* TODO: Hukuki metin buraya eklenecek */}
            <div className="space-y-6 text-fg-muted leading-relaxed">
              <p>
                Bu gizlilik politikası, <strong className="text-fg">{siteConfig.companyName}</strong>&apos;nin
                (bundan böyle &quot;Fourpoint&quot; olarak anılacaktır) web sitesi üzerinden
                toplanan kişisel verilerin nasıl işlendiğini açıklar.
              </p>

              <h2 className="font-heading text-xl font-semibold text-fg mt-8">
                Toplanan Bilgiler
              </h2>
              <p>
                Web sitemizi ziyaret ettiğinizde ve iletişim formunu doldurduğunuzda
                ad, soyad, e-posta, telefon, işletme adı gibi bilgileriniz toplanabilir.
                Ayrıca çerezler aracılığıyla kullanım verileri kaydedilebilir.
              </p>

              <h2 className="font-heading text-xl font-semibold text-fg mt-8">
                Bilgilerin Kullanımı
              </h2>
              <p>
                Toplanan bilgiler; iletişim taleplerinize yanıt vermek, hizmet
                teklifleri hazırlamak ve web sitesi deneyimini iyileştirmek amacıyla
                kullanılır.
              </p>

              <h2 className="font-heading text-xl font-semibold text-fg mt-8">
                Üçüncü Taraf Hizmetleri
              </h2>
              <p>
                Web sitemizde Meta Pixel kullanılmaktadır. Bu teknoloji, reklam
                performansını ölçmek amacıyla anonim kullanım verileri toplar.
                Detaylar için çerez politikamızı inceleyebilirsiniz.
              </p>

              <h2 className="font-heading text-xl font-semibold text-fg mt-8">
                Veri Güvenliği
              </h2>
              <p>
                Kişisel verilerinizi korumak için endüstri standardı güvenlik
                önlemleri uyguluyoruz. Verileriniz şifreli bağlantı (SSL/TLS)
                üzerinden iletilir.
              </p>

              <h2 className="font-heading text-xl font-semibold text-fg mt-8">
                İletişim
              </h2>
              <p>
                Gizlilik politikamız hakkında sorularınız için{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                  {siteConfig.contact.email}
                </a>{" "}
                adresine yazabilirsiniz.
              </p>

              <p className="text-fg-subtle text-sm mt-12">
                {/* TODO: Son güncelleme tarihi hukuk danışmanı onayından sonra girilecek */}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
