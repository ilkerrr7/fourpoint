/**
 * Çekim vitrini — müşteriler için sahada çekilmiş gerçek Reels'ler.
 *
 * Buraya yapay zekâ animasyonu girmez; yalnızca gerçek çekimler. Dosyalar
 * `public/media/cekimler/` altındaki web sürümleridir (scripts/web-video.sh
 * ile üretilir); orijinal kayıtlar depoya konmaz.
 *
 * Bölüm, izinli çekim sayısı üçten azken hiç render edilmez
 * (components/home/CekimVitrini.tsx).
 */
export type Cekim = {
  /** public/media/cekimler/ altındaki web sürümü, örn. "isletme-1-web.mp4". */
  dosya: string;
  /** "isletme-1-poster.jpg" */
  poster: string;
  /** Görünecek işletme adı. Videonun erişilebilir adı da budur. */
  isletme: string;
  /** Müşterinin yazılı izni varsa true. İzinsiz çekim gösterilmez. */
  izin: boolean;
};

export const cekimler: Cekim[] = [
  // İzinli müşteri çekimleri geldikçe eklenecek. Şimdilik boş.
];

/** Dosyaların bulunduğu public klasörü; varlık kontrolü de buradan yapılır. */
export const CEKIM_KLASORU = "media/cekimler";
