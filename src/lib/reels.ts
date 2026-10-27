/**
 * "Tanıdık geldi mi?" bölümündeki tek animasyon sahnesi.
 *
 * Dosyalar depoya ayrıca ekleniyor (scripts/web-video.sh ile üretilen web
 * sürümü ve posteri). İkisi de yerindeyken bölüm videoyu gösterir, değilken
 * alıntılar tek başına kalır — yer tutucu ya da bozuk oynatıcı görünmez.
 */
export const DERDI_ANLATAN = {
  dosya: "/media/reels/derdi-anlatan-web.mp4",
  poster: "/media/reels/derdi-anlatan-poster.jpg",
  /** Videodaki yazılar gömülü; bu yalnızca erişilebilir ad. */
  baslik: "Gece 23.00'te ne paylaşacağını düşünen işletme sahibi",
  /** Kartın altındaki küçük not. */
  not: "Gece 23.00. Tanıdık mı?",
} as const;
