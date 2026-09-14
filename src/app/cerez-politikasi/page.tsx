import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Fourpoint Çerez Politikası — Web sitemizde kullanılan çerezler hakkında bilgi.",
};

export default function CerezPolitikasiPage() {
  return (
    <section className="py-16 md:py-24 bg-ink" aria-labelledby="cerez-heading">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert prose-slate">
          <h1 id="cerez-heading" className="font-heading text-3xl md:text-4xl font-bold text-fg mb-8">
            Çerez Politikası
          </h1>

          {/* TODO: Hukuki metin buraya eklenecek */}
          <div className="space-y-6 text-fg-muted leading-relaxed">
            <p>
              Bu çerez politikası, <strong className="text-fg">Fourpoint</strong> web sitesinde
              kullanılan çerezler ve benzer teknolojiler hakkında sizi bilgilendirmek
              amacıyla hazırlanmıştır.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              Çerez Nedir?
            </h2>
            <p>
              Çerezler, web sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır.
              Web sitesinin düzgün çalışmasını sağlamak, kullanım istatistikleri toplamak
              ve reklam performansını ölçmek için kullanılır.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              Kullanılan Çerezler
            </h2>

            <h3 className="font-heading text-lg font-semibold text-fg mt-6">
              Zorunlu Çerezler
            </h3>
            <p>
              Web sitesinin temel işlevlerinin çalışması için gereklidir.
              Bu çerezler olmadan site düzgün çalışmaz.
            </p>

            <h3 className="font-heading text-lg font-semibold text-fg mt-6">
              Analitik ve Performans Çerezleri
            </h3>
            <p>
              Reklam kampanyalarının performansını ölçmek için Meta Pixel kullanıyoruz.
              Bu teknoloji, sayfa ziyaretleri ve form gönderimleri gibi eylemleri anonim
              olarak takip eder.
            </p>

            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-deep/50">
                  <th className="text-left py-2 text-fg font-semibold">Çerez</th>
                  <th className="text-left py-2 text-fg font-semibold">Sağlayıcı</th>
                  <th className="text-left py-2 text-fg font-semibold">Amaç</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                <tr className="border-b border-deep/30">
                  <td className="py-2">_fbp</td>
                  <td className="py-2">Meta</td>
                  <td className="py-2">Ziyaretçi tanımlama</td>
                </tr>
                <tr className="border-b border-deep/30">
                  <td className="py-2">_fbc</td>
                  <td className="py-2">Meta</td>
                  <td className="py-2">Reklam tıklama takibi</td>
                </tr>
              </tbody>
            </table>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              Çerezleri Yönetme
            </h2>
            <p>
              Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilir veya silebilirsiniz.
              Ancak bu durumda web sitesinin bazı özellikleri düzgün çalışmayabilir.
            </p>

            <h2 className="font-heading text-xl font-semibold text-fg mt-8">
              İletişim
            </h2>
            <p>
              {/* TODO: Gerçek iletişim bilgileri */}
              Çerez politikamız hakkında sorularınız için [TODO: e-posta adresi]
              adresine yazabilirsiniz.
            </p>

            <p className="text-fg-subtle text-sm mt-12">
              Son güncelleme: [TODO: Tarih]
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
