"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqItems = [
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

export function FAQ() {
  const { ref, isRevealed: isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-section bg-ink border-t border-deep" ref={ref}>
      <Container>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeading badge="SSS" title="Sıkça Sorulan Sorular" />

          <div className="max-w-2xl mx-auto mt-14">
            <Accordion items={faqItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
