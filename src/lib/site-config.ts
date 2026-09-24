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
    "Instagram ve Facebook reklamlarınızı doğru hedef kitleye ulaştırıyoruz. Bütçenizi verimli kullanmanız için stratejik reklam yönetimi.",

  keywords,

  contact: {
    email: "info@fourpointmedya.com",

    /** Fiziksel adres (KVKK, yasal metinler için) */
    address: "Zühre Sokak No:18 Daire:3, Kağıthane/İstanbul",
  },

  social: {
    instagram: "https://instagram.com/fourpointmedya", // TODO: Gerçek profil onaylandığında güncelle
    facebook: "https://facebook.com/fourpointmedya", // TODO: Gerçek profil onaylandığında güncelle
    linkedin: "", // TODO: LinkedIn profili oluşturulduğunda ekle
  },
} as const;

/** Kolaylık tip çıkarımı */
export type SiteConfig = typeof siteConfig;
