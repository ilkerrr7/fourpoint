import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı KVKK kapsamında hangi kişisel verilerinizin hangi amaçla işlendiği, kimlerle paylaşıldığı ve haklarınız: FOUR POINT MEDYA A.Ş. aydınlatma metni.",
  path: "/kvkk",
});

export default function KVKKPage() {
  return (
    <PageTransition>
    <section className="py-16 md:py-24 bg-ink" aria-labelledby="kvkk-heading">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert prose-slate">
          <h1 id="kvkk-heading" className="font-heading text-28 md:text-36 font-bold text-fg mb-8">
            KVKK Aydınlatma Metni
          </h1>

          {/* TODO: Hukuki metin hukuk danışmanıyla son haline getirilecek. Aşağıdaki yapı örnek iskelet. */}
          <div className="space-y-6 text-fg-muted leading-relaxed">
            <p>
              <strong className="text-fg">{siteConfig.companyName}</strong> olarak kişisel verilerinizin
              6698 sayılı Kişisel Verilerin Korunması Kanunu’na uygun olarak işlenmesine
              büyük önem veriyoruz.
            </p>

            <h2 className="font-heading text-22 font-semibold text-fg mt-8">
              1. Veri Sorumlusu
            </h2>
            <p>
              Veri sorumlusu: {siteConfig.companyName}
              <br />
              {siteConfig.contact.address ? (
                <>
                  Adres: {siteConfig.contact.address}
                  <br />
                </>
              ) : (
                <>
                  Adres: {/* TODO: Şirket adresi eklenecek */}
                  <br />
                </>
              )}
              E-posta: {siteConfig.contact.email}
            </p>

            <h2 className="font-heading text-22 font-semibold text-fg mt-8">
              2. İşlenen Kişisel Veriler
            </h2>
            <p>
              İletişim formumuz aracılığıyla ad, soyad, e-posta adresi, telefon numarası,
              işletme adı ve mesaj içeriği bilgileriniz toplanmaktadır.
            </p>

            <h2 className="font-heading text-22 font-semibold text-fg mt-8">
              3. Kişisel Verilerin İşlenme Amacı
            </h2>
            <p>
              Toplanan kişisel verileriniz; iletişim taleplerinizin yanıtlanması,
              hizmet tekliflerinin hazırlanması ve yasal yükümlülüklerin yerine
              getirilmesi amacıyla işlenmektedir.
            </p>

            <h2 className="font-heading text-22 font-semibold text-fg mt-8">
              4. Kişisel Verilerin Aktarılması
            </h2>
            <p>
              {/* TODO: Detaylar hukuk danışmanıyla belirlenecek */}
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmamaktadır.
            </p>

            <h2 className="font-heading text-22 font-semibold text-fg mt-8">
              5. Haklarınız
            </h2>
            <p>
              KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
              işlenmediğini öğrenme, düzeltilmesini isteme, silinmesini veya yok
              edilmesini isteme haklarınız mevcuttur.
            </p>

            <p className="text-fg-subtle text-14 mt-12">
              {/* TODO: Son güncelleme tarihi hukuk danışmanı onayından sonra girilecek */}
            </p>
          </div>
        </div>
      </Container>
    </section>
    </PageTransition>
  );
}
