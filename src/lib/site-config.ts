/**
 * Merkezi site yapılandırması.
 * Tüm iletişim bilgileri, sosyal medya linkleri ve şirket bilgileri
 * tek bu dosyadan okunur. Hiçbir bileşende elle yazılmış iletişim
 * bilgisi bulunmamalıdır.
 */

/** SEO anahtar kelimeler — as const dışında, Next.js Metadata string[] bekliyor */
const keywords: string[] = [
  "meta reklam yönetimi",
  "instagram reklam",
  "facebook reklam",
  "dijital pazarlama ajansı",
  "sosyal medya reklamcılığı",
  "fourpoint medya",
];

export const siteConfig = {
  /** Site adı (başlıklarda, OG etiketlerinde) */
  name: "Fourpoint",

  /** Canlı URL */
  url: "https://fourpointmedya.com",

  /** Şirket resmi unvanı */
  companyName: "FOUR POINT MEDYA A.Ş.",

  /** Site açıklaması — meta description, OG vb. */
  description:
    "Instagram, Facebook ve Google reklamlarınızı şeffaf ölçümle yönetiyoruz. Kaç müşteri geldi, nereden geldi, kaça geldi; hepsini görürsünüz.",

  keywords,

  /** Footer ve LocalBusiness şemasında görünen marka adı */
  displayName: "Four Point Medya",

  contact: {
    email: "info@fourpointmedya.com",

    /**
     * Telefon. Boşken footer'da ve şemada hiç gösterilmez; dolduğunda
     * E.164 biçiminde yazılmalı (örn. "+905XXXXXXXXX"), footer tel: linkini
     * ve okunur biçimi bundan türetir.
     */
    phone: "",

    /** Ofis adresi (footer, iletişim sayfası, LocalBusiness şeması) */
    office: {
      /** Bina / plaza adı */
      building: "Plaza Cubes, Tarihi Bomonti Bira Fabrikası",
      street: "Merkez Mah. Silahşör Cad. Birahane Sk. No:42",
      postalCode: "34384",
      district: "Şişli",
      city: "İstanbul",
      /** Google Maps'te yeni sekmede açılan arama */
      mapsQuery: "Plaza Cubes Bomonti Bira Fabrikası Şişli",
      /** İletişim sayfasındaki harita iframe'i */
      mapsEmbedSrc:
        "https://maps.google.com/maps?q=Plaza+Cubes+Bomonti+Bira+Fabrikası,+Birahane+Sk.+No:42,+Şişli,+İstanbul&output=embed",
    },

    /** Sicil (merkez) adresi — KVKK ve yasal metinler için */
    address: "Zühre Sokak No:18 Daire:3, Kağıthane/İstanbul",
  },

  /**
   * Footer'daki ticari künye. `showInFooter` false iken hiçbiri render
   * edilmez; true yapıldığında unvan, sicil adresi, telefon ve MERSİS
   * (dolu olanlar) footer'ın alt şeridinde gösterilir.
   */
  legal: {
    showInFooter: false,
    mersisNo: "",
  },

  social: {
    instagram: "https://instagram.com/fourpointmedya", // TODO: Gerçek profil onaylandığında güncelle
    facebook: "https://facebook.com/fourpointmedya", // TODO: Gerçek profil onaylandığında güncelle
    linkedin: "", // TODO: LinkedIn profili oluşturulduğunda ekle
  },
} as const;

/** Kolaylık tip çıkarımı */
export type SiteConfig = typeof siteConfig;

/** Ofis adresi, tek satır (footer, iletişim sayfası). */
export const officeAddressLine = (() => {
  const o = siteConfig.contact.office;
  return `${o.building}, ${o.street}, ${o.postalCode} ${o.district}/${o.city}`;
})();

/** Ofisi Google Maps'te arama olarak açan link (yeni sekme için). */
export const officeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.contact.office.mapsQuery,
)}`;

/**
 * Telefonu okunur biçime çevirir: "+905359132748" → "0535 913 27 48".
 * Tanınmayan biçimler olduğu gibi döner.
 */
export function formatPhone(e164: string): string {
  const m = /^\+90(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(e164);
  return m ? `0${m[1]} ${m[2]} ${m[3]} ${m[4]}` : e164;
}
