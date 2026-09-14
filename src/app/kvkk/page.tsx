import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "Fourpoint Kişisel Verilerin Korunması Kanunu Aydınlatma Metni.",
};

export default function KVKKPage() {
  return (
    <section className="py-16 md:py-24 bg-ink" aria-labelledby="kvkk-heading">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert prose-slate">
          <h1 id="kvkk-heading" className="font-heading text-3xl md:text-4xl font-bold text-fg mb-8">
            KVKK Aydınlatma Metni
          </h1>

          {/* TODO: Hukuki metin buraya eklenecek. Aşağıdaki yapı örnek iskelet. */}
          <div className="space-y-6 text-fg-muted leading-relaxed">
            <p>
              {/* TODO: Şirket unvanı */}
              <strong className="text-fg">FP Medya A.Ş.</strong> olarak kişisel verilerinizin
              6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;na uygun olarak işlenmesine
              büyük önem veriyoruz.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              1. Veri Sorumlusu
            </h2>
            <p>
              {/* TODO: Şirket adresi ve iletişim bilgileri */}
              Veri sorumlusu: FP Medya A.Ş.
              <br />
              Adres: [TODO: Şirket adresi]
              <br />
              E-posta: [TODO: E-posta adresi]
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              2. İşlenen Kişisel Veriler
            </h2>
            <p>
              İletişim formumuz aracılığıyla ad, soyad, e-posta adresi, telefon numarası,
              işletme adı ve mesaj içeriği bilgileriniz toplanmaktadır.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              3. Kişisel Verilerin İşlenme Amacı
            </h2>
            <p>
              Toplanan kişisel verileriniz; iletişim taleplerinizin yanıtlanması,
              hizmet tekliflerinin hazırlanması ve yasal yükümlülüklerin yerine
              getirilmesi amacıyla işlenmektedir.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              4. Kişisel Verilerin Aktarılması
            </h2>
            <p>
              {/* TODO: Detaylar hukuk danışmanıyla belirlenecek */}
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmamaktadır.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              5. Haklarınız
            </h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
              işlenmediğini öğrenme, düzeltilmesini isteme, silinmesini veya yok
              edilmesini isteme haklarınız mevcuttur.
            </p>

            <p className="text-fg-subtle text-sm mt-12">
              {/* TODO: Son güncelleme tarihi */}
              Son güncelleme: [TODO: Tarih]
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
