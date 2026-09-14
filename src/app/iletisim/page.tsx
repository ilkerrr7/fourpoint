import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Ücretsiz keşif görüşmesi için bizimle iletişime geçin. İşletmenizin reklam ihtiyaçlarını birlikte değerlendirelim.",
};

export default function IletisimPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-ink" aria-labelledby="iletisim-heading">
        <Container>
          <SectionHeading
            badge="İletişim"
            title="Ücretsiz keşif görüşmesi için yazın."
            description="Formu doldurun, en kısa sürede sizinle iletişime geçelim. Bağlayıcı değil, sadece bir tanışma."
          />
        </Container>
      </section>

      {/* Form + Contact Info */}
      <section className="py-12 md:py-20 bg-surface/50" aria-label="İletişim formu">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form — wider */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Contact info sidebar */}
            <aside className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-heading text-lg font-semibold text-fg mb-4">
                  Diğer İletişim Yolları
                </h3>
                <div className="space-y-4">
                  {/* TODO: Gerçek iletişim bilgileri eklenecek */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-fg">E-posta</p>
                      {/* TODO: Gerçek e-posta */}
                      <p className="text-sm text-fg-muted">info@fourpoint.example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-fg">Telefon</p>
                      {/* TODO: Gerçek telefon */}
                      <p className="text-sm text-fg-muted">+90 (5XX) XXX XX XX</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info box */}
              <div className="rounded-[1rem] bg-surface border border-deep/50 p-6">
                <h3 className="font-heading text-sm font-semibold text-fg mb-3">
                  Görüşmede neler konuşacağız?
                </h3>
                <ul className="space-y-2 text-sm text-fg-muted">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    İşletmenizin hedef kitlesini tanımlama
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Mevcut reklam durumunuzu değerlendirme
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Bütçe ve beklenti konuşması
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Birlikte çalışma uyumunu değerlendirme
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
