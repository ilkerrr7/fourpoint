/**
 * Referanslar — yalnızca yazılı izin alınmış müşteriler.
 *
 * Kural: buraya uydurma yorum, örnek müşteri ya da yer tutucu veri girmez.
 * Bir kayıt ancak müşteriden yazılı izin alındıktan sonra, kendi cümlesiyle
 * eklenir. Bölüm, izinli kayıt sayısı üçten azken hiç render edilmez
 * (components/home/Referanslar.tsx), böylece yarım bir şerit görünmez.
 */
export type Referans = {
  /** Görünecek işletme adı. */
  isletme: string;
  /** "Ad Soyad" (opsiyonel). */
  kisi?: string;
  /** "Kurucu" gibi (opsiyonel). */
  unvan?: string;
  /** En fazla 160 karakter, müşterinin kendi cümlesi. */
  yorum?: string;
  /** Yazılı izin alındıysa true. İzinsiz kayıt hiçbir koşulda gösterilmez. */
  izin: boolean;
};

export const referanslar: Referans[] = [
  // İzin geldikçe buraya eklenecek. Şimdilik boş.
];

/** Yorum alanının sözleşmesi; bileşen bu sınırı aşan yorumu göstermez. */
export const YORUM_SINIRI = 160;
