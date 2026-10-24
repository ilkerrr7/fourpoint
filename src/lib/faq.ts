/**
 * Sıkça sorulan sorular: tek kaynak.
 *
 * Ana sayfadaki SSS bölümü (components/home/FAQ.tsx) ve FAQPage yapısal
 * verisi (lib/schema.ts) aynı diziden okur, böylece sayfa ile şema hiçbir
 * zaman ayrışmaz. Metni yalnızca burada değiştirin.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Google reklamı mı, Meta reklamı mı daha iyi?",
    answer: "İkisi farklı işler görür. Google, ürününüzü ya da hizmetinizi zaten arayan kişiye ulaşır; Meta ise henüz aramayan ama ilgilenebilecek kitleye. Çoğu işletme için doğru cevap ikisinin dengeli kullanımıdır. Görüşmede işinize uygun dağılımı birlikte belirleriz."
  },
  {
    question: "Google Haritalar'da üst sıralara çıkabilir miyim?",
    answer: "Haritalardaki sıralamayı Google belirler; kimse garanti veremez. Biz işletme profilinizi eksiksiz kurar, güncel tutar ve yerel reklamlarla görünürlüğünüzü artırırız."
  },
  {
    question: "Daha önce reklam verdim, sonuç alamadım. Sizinle fark ne olacak?",
    answer: "Çoğu başarısız reklam deneyiminin sebebi yanlış hedefleme ve takipsizliktir. Biz her kampanyayı veriye dayalı kurar, sürekli izler ve optimize ederiz. İlk görüşmede durumunuzu birlikte değerlendiririz."
  },
  {
    question: "Minimum bütçe ne kadar olmalı?",
    answer: "Her işletmenin durumu farklı olduğu için sabit bir minimum bütçe belirlemiyoruz. Görüşmemizde hedeflerinize uygun bir bütçe önerisi sunuyoruz."
  },
  {
    question: "Sonuçları ne zaman görürüm?",
    answer: "İlk verileri genellikle birkaç gün içinde görmeye başlarsınız. Ancak anlamlı sonuçlar için kampanyanın öğrenme sürecini tamamlaması gerekir, bu da genellikle 2-4 haftadır."
  },
  {
    question: "Reklam hesabım bana mı ait olacak?",
    answer: "Evet. Reklam hesabınız sizin adınıza açılır ve tüm erişim sizde kalır. Çalışmamız sona erse bile hesap ve veriler sizindir."
  },
  {
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer: "E-ticaret, restoran, sağlık, eğitim, emlak, güzellik ve hizmet sektörü başta olmak üzere birçok sektöre hizmet veriyoruz. Görüşmemizde sektörünüze uygun yaklaşımı birlikte belirleriz."
  },
  {
    question: "Raporları nasıl alacağım?",
    answer: "Düzenli aralıklarla anlaşılır, görsel raporlar paylaşıyoruz. Teknik jargon yerine somut sonuçları, harcamaları ve önerileri net bir dille aktarıyoruz."
  },
  {
    question: "Sözleşme süresi var mı?",
    answer: "Uzun vadeli bağlayıcı sözleşme dayatmıyoruz. Çalışma koşullarını görüşmemizde birlikte belirleriz."
  }
];
