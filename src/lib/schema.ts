import { siteConfig, officeMapsUrl } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/metadata";
import type { FaqItem } from "@/lib/faq";

/**
 * schema.org yapısal verisi.
 *
 * Kural: sitede yazmayan hiçbir bilgi şemaya girmez. Telefon, açılış saati,
 * puan/yorum ve fiyat yoktur, çünkü sitede yoktur. Boş alanlar (telefon,
 * sosyal profiller) hiç yazılmaz.
 */

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** JSON-LD'yi inline <script> için güvenli metne çevirir ("<" kaçışı). */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * /hizmetler sayfasındaki hizmetler. Şemadaki teklifler bunlardan üretilir;
 * fiyat yazılmaz, sitede fiyat yoktur.
 */
const SERVICES: { name: string; description: string }[] = [
  { name: "Meta reklam yönetimi (Instagram ve Facebook)", description: "Instagram ve Facebook reklamlarının kurulumu, yönetimi ve optimizasyonu." },
  { name: "Google reklam yönetimi", description: "Google Arama, Haritalar, Performance Max ve YouTube reklamlarının yönetimi." },
  { name: "Retargeting", description: "Siteyi ziyaret edip ayrılanları geri kazanan yeniden hedefleme kampanyaları." },
  { name: "Raporlama ve analiz", description: "Harcama ve dönüşüm analitiği, aksiyon önerileriyle düzenli raporlar." },
  { name: "Web sitesi", description: "Reklamın indiği, hızlı açılan ve dönüşüm odaklı sayfalar." },
  { name: "İçerik ve Reels üretimi", description: "Reklam kreatiflerinin çekimden kurguya üretimi." },
  { name: "Sosyal medya yönetimi", description: "Düzenli paylaşım, tutarlı görsel dil ve mesaj yanıtlama." },
];

/** LocalBusiness + ProfessionalService: ofis, iletişim, uzmanlık, teklifler. */
export function organizationJsonLd(): Record<string, unknown> {
  const o = siteConfig.contact.office;
  // Yalnızca doğrulanmış hesaplar: site-config'te boş bırakılan hiç yazılmaz.
  const sameAs = Object.values(siteConfig.social).filter((href) => href.length > 0);

  const data: Record<string, unknown> = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: siteConfig.displayName,
    legalName: siteConfig.companyName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    image: `${siteConfig.url}${OG_IMAGE.url}`,
    // Google logo için raster tercih eder: 180x180 PNG (app/apple-icon.png).
    logo: `${siteConfig.url}/apple-icon.png`,
    // TODO: Ofisin Google Haritalar kaydı (Google İşletme Profili) açıldığında
    // bu arama bağlantısı yerine kaydın kendi linki yazılacak.
    hasMap: officeMapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${o.street}, ${o.building}`,
      addressLocality: o.district,
      addressRegion: o.city,
      postalCode: o.postalCode,
      addressCountry: "TR",
    },
    areaServed: { "@type": "Country", name: "Türkiye" },
    knowsAbout: [
      "Meta reklam yönetimi",
      "Instagram reklamları",
      "Facebook reklamları",
      "Google Ads",
      "Retargeting",
      "Dönüşüm API (CAPI)",
    ],
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
      url: `${siteConfig.url}/hizmetler`,
    })),
  };

  if (siteConfig.contact.phone) data.telephone = siteConfig.contact.phone;
  if (sameAs.length > 0) data.sameAs = sameAs;

  return data;
}

/** WebSite: ad, adres, dil, yayıncı. */
export function webSiteJsonLd(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.displayName,
    url: siteConfig.url,
    inLanguage: "tr-TR",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Her sayfada <head> içine basılan tek blok: organizasyon + web sitesi. */
export function siteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), webSiteJsonLd()],
  };
}

/** FAQPage: ana sayfadaki SSS verisinden programatik üretilir (lib/faq.ts). */
export function faqPageJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Rota yolu, "/hizmetler" gibi; mutlak adrese burada çevrilir. */
  path: string;
}

/** BreadcrumbList: alt sayfalarda "Ana Sayfa › Sayfa". */
export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  const trail: BreadcrumbItem[] = [{ name: "Ana Sayfa", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteConfig.url : `${siteConfig.url}${item.path}`,
    })),
  };
}
