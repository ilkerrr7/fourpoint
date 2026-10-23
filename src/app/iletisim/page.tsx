import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, SectionHeading } from "@/components/ui";
import ContactForm from "@/components/forms/ContactForm";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteConfig, officeAddressLine, officeMapsUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "İletişim: Ücretsiz Keşif Görüşmesi",
  description:
    "Ücretsiz keşif görüşmesi için bize yazın. İşletmenizi dinleyelim, reklam ihtiyaçlarınızı birlikte değerlendirip size özel bir yol haritası çıkaralım.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return (
    <PageTransition>
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
                <h3 className="font-heading text-18 font-semibold text-fg mb-4">
                  İletişim Bilgisi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-14 font-medium text-fg">Ofis</p>
                      <a
                        href={officeMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-14 text-fg-muted leading-relaxed hover:text-fg transition-colors"
                        title="Google Maps'te aç"
                      >
                        {officeAddressLine}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-14 font-medium text-fg">E-posta</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex min-h-11 items-center md:min-h-0 text-14 text-fg-muted hover:text-fg transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info box */}
              <div className="rounded-[1rem] bg-surface border border-deep/50 p-6">
                <h3 className="font-heading text-14 font-semibold text-fg mb-3">
                  Görüşmede neler konuşacağız?
                </h3>
                <ul className="space-y-2 text-14 text-fg-muted">
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

      {/* Ofis haritası */}
      <section className="py-12 md:py-20 bg-ink" aria-labelledby="ofis-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 lg:items-stretch">
            {/* Harita — mobilde tam genişlik */}
            <div className="lg:col-span-3 overflow-hidden rounded-[1rem] border border-deep/50 bg-surface">
              <iframe
                src={siteConfig.contact.office.mapsEmbedSrc}
                title={`${siteConfig.displayName} ofis konumu — Google Maps`}
                className="block h-[280px] w-full sm:h-[360px] lg:h-full lg:min-h-[420px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Adres + e-posta */}
            <aside className="lg:col-span-2 flex flex-col justify-center">
              <h2 id="ofis-heading" className="font-heading text-28 md:text-36 font-medium text-fg leading-[1.1] mb-6">
                Ofisimiz
              </h2>
              <address className="not-italic space-y-5 text-16 text-fg-muted">
                <div>
                  <p className="text-14 font-medium text-fg mb-1">{siteConfig.displayName}</p>
                  <p className="leading-relaxed">
                    {siteConfig.contact.office.building}
                    <br />
                    {siteConfig.contact.office.street}
                    <br />
                    {siteConfig.contact.office.postalCode} {siteConfig.contact.office.district}/
                    {siteConfig.contact.office.city}
                  </p>
                  <a
                    href={officeMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-14 font-medium text-accent hover:text-fg transition-colors"
                  >
                    Google Maps&apos;te aç
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
                <div>
                  <p className="text-14 font-medium text-fg mb-1">E-posta</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex min-h-11 items-center md:min-h-0 hover:text-fg transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </address>
            </aside>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
