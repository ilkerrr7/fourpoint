import { siteConfig, officeMapsUrl } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/metadata";

/**
 * LocalBusiness JSON-LD (schema.org) — <head> içine tek script olarak basılır.
 * Boş alanlar (telefon, sosyal profiller, koordinat) şemaya hiç yazılmaz.
 */
export function localBusinessJsonLd(): string {
  const o = siteConfig.contact.office;
  const sameAs = Object.values(siteConfig.social).filter((href) => href.length > 0);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.displayName,
    legalName: siteConfig.companyName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    image: `${siteConfig.url}${OG_IMAGE.url}`,
    logo: `${siteConfig.url}/logo.svg`,
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
  };

  if (siteConfig.contact.phone) data.telephone = siteConfig.contact.phone;
  if (sameAs.length > 0) data.sameAs = sameAs;

  // "<" kaçışı: JSON-LD inline <script> içinde "</script>" enjeksiyonunu engeller.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
