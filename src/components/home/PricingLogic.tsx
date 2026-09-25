"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_OUT_EXPO } from "@/lib/motion";

const pricingItems = [
  {
    title: "Ajans Ücreti",
    description: "Stratejinizi oluşturmak, reklamları yönetmek ve optimize etmek için aldığımız hizmet bedelidir. İşletmenize özel belirlenir.",
  },
  {
    title: "Reklam Bütçesi",
    description: "Meta'ya doğrudan ödediğiniz reklam harcamasıdır. Bu para bize değil, reklam platformuna gider.",
  },
  {
    title: "Neden Ayrı?",
    description: "Ajans ücreti ile reklam bütçesi farklı kalemlerdir. Biz ikisini birbirine karıştırmayız, siz de karıştırmayın.",
  },
  {
    title: "Gizli Maliyet Yok",
    description: "Kurulum ücreti, çıkış cezası, sürpriz fatura yok. Başlamadan önce her şeyi konuşuruz.",
  },
];

const itemContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function PricingLogic() {
  return (
    <section className="py-section bg-surface border-t border-deep">
      <Container>
        <SectionHeading
          badge="Ücretlendirme"
          title="Neyi neden ücretlendiriyoruz?"
          description="Fiyat listesi vermiyoruz çünkü her işletmenin ihtiyacı farklı. Ama neye para ödediğinizi bilmeniz hakkınız."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-4xl mx-auto mt-16 md:mt-20 border-t border-deep md:border-t-0"
          variants={itemContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pricingItems.map((pricingItem) => (
            <motion.div
              key={pricingItem.title}
              variants={item}
              className="py-8 border-b border-deep"
            >
              <h3 className="font-heading font-medium text-lg mb-2 text-fg">{pricingItem.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{pricingItem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
