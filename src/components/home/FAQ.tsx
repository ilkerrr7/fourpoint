"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const faqItems = [
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

export function FAQ() {
  return (
    <section className="py-section bg-ink border-t border-deep">
      <Container>
        <SectionHeading badge="SSS" title="Sıkça Sorulan Sorular" />

        <motion.div
          className="max-w-2xl mx-auto mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </Container>
    </section>
  );
}
