"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, officeAddressLine, officeMapsUrl, formatPhone } from "@/lib/site-config";

// Absolute paths, so every one of these works from any page. The three
// service anchors point at /hizmetler, where each group is a real section
// with its own copy; AR-GE lives only on the home page.
const FOOTER_SERVICES = [
  { label: "Meta Reklamları", href: "/hizmetler#hizmetler-meta" },
  { label: "Google Reklamları", href: "/hizmetler#hizmetler-google" },
  { label: "Web & İçerik", href: "/hizmetler#web-icerik" },
  { label: "AR-GE", href: "/#ar-ge" },
];

const FOOTER_COMPANY = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Nasıl Çalışıyoruz", href: "/nasil-calisiyoruz" },
  { label: "İletişim", href: "/iletisim" },
];

const FOOTER_LEGAL = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export default function Footer() {
  const openCookieBanner = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-banner"));
    }
  };

  // Build social links from siteConfig — only show links that have a URL
  const socialLinks = Object.entries(siteConfig.social)
    .filter(([, href]) => href.length > 0)
    .map(([key, href]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      href,
      icon: SOCIAL_ICONS[key],
    }));

  return (
    <footer className="bg-surface border-t border-deep/30" id="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 py-12 md:py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand + Contact */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group min-h-11">
              <Image
                src="/logo.svg"
                alt="Four Point Medya"
                width={28}
                height={28}
                className="h-7 w-7 text-fg"
              />
              <span className="font-heading text-18 font-medium text-fg tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-14 text-fg-muted leading-relaxed max-w-xs">
              İşletmenizin dijital reklamlarını doğru hedef kitleye,
              doğru bütçeyle ulaştırıyoruz.
            </p>
            <address className="not-italic space-y-2 text-14 text-fg-subtle">
              <p className="font-medium text-fg">{siteConfig.displayName}</p>
              <p>
                <span className="sr-only">Ofis: </span>
                <a
                  href={officeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block leading-relaxed hover:text-fg transition-colors"
                  title="Google Maps'te aç"
                >
                  {officeAddressLine}
                </a>
              </p>
              {siteConfig.contact.phone && (
                <p>
                  <span className="sr-only">Telefon: </span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="inline-flex min-h-11 items-center md:min-h-0 hover:text-fg transition-colors">
                    {formatPhone(siteConfig.contact.phone)}
                  </a>
                </p>
              )}
              <p>
                <span className="sr-only">E-posta: </span>
                <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex min-h-11 items-center md:min-h-0 hover:text-fg transition-colors">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-heading text-14 font-semibold text-fg uppercase tracking-wider mb-4">
              Hizmetler
            </h3>
            <ul className="md:space-y-2.5">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center md:min-h-0 text-14 text-fg-muted hover:text-fg transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-heading text-14 font-semibold text-fg uppercase tracking-wider mb-4">
              Şirket
            </h3>
            <ul className="md:space-y-2.5">
              {FOOTER_COMPANY.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center md:min-h-0 text-14 text-fg-muted hover:text-fg transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-heading text-14 font-semibold text-fg uppercase tracking-wider mb-4">
              Yasal
            </h3>
            <ul className="md:space-y-2.5">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center md:min-h-0 text-14 text-fg-muted hover:text-fg transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieBanner}
                  className="inline-flex min-h-11 items-center md:min-h-0 text-14 text-fg-muted hover:text-fg transition-colors duration-200"
                >
                  Çerez Tercihleri
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Ticari künye — site-config'teki legal.showInFooter açılınca görünür */}
        {/* TODO: MERSİS no — şirket kuruluşu tamamlanınca site-config legal.mersisNo doldurulup showInFooter açılacak */}
        {siteConfig.legal.showInFooter && (
          <div className="border-t border-deep/30 py-5">
            <p className="text-12 text-fg-subtle leading-relaxed">
              <span className="text-fg-muted">{siteConfig.companyName}</span>
              {siteConfig.contact.address && (
                <>
                  <span aria-hidden="true"> · </span>
                  <span>Merkez: {siteConfig.contact.address}</span>
                </>
              )}
              {siteConfig.contact.phone && (
                <>
                  <span aria-hidden="true"> · </span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-fg transition-colors">
                    Tel: {formatPhone(siteConfig.contact.phone)}
                  </a>
                </>
              )}
              {siteConfig.legal.mersisNo && (
                <>
                  <span aria-hidden="true"> · </span>
                  <span>MERSİS No: {siteConfig.legal.mersisNo}</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-deep/30 py-6 sm:flex-row">
          <p className="text-12 text-fg-subtle">
            © {new Date().getFullYear()} {siteConfig.companyName} Tüm hakları saklıdır.
          </p>

          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-button)] text-fg-subtle hover:text-fg hover:bg-elevated transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
