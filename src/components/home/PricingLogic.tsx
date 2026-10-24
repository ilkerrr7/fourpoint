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
    description: "Meta veya Google'a doğrudan ödediğiniz reklam harcamasıdır. Bu para bize değil, reklam platformuna gider.",
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

function ItemGrid({ items, className = "" }: { items: typeof pricingItems; className?: string }) {
  return (
    <motion.div
      className={`depth-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-4xl mx-auto ${className}`}
      variants={itemContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((pricingItem) => (
        <motion.div key={pricingItem.title} variants={item} className="depth-item py-8 border-b border-deep">
          <h3 className="depth-item-title mb-2 text-fg">{pricingItem.title}</h3>
          <p className="depth-item-body text-fg-muted text-14 leading-relaxed">{pricingItem.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Pricing, as one of the site's two "push into the page" moments.
 *
 * Markup is a plain section — heading, then the four items in two rows — and
 * stays exactly that on mobile, with reduced motion, without scroll timelines,
 * or with the kill switch. On wide screens effects.css turns it into a sticky
 * stage that the scroll position dollies through: the heading plane passes the
 * camera, the two line items arrive ("Ajans Ücreti" and "Reklam Bütçesi",
 * which are kept apart on purpose), then the reassurances. Behind them two
 * ghost words drift apart as you go deeper and never meet, which is the point
 * of the section. All content stays in the DOM, in reading order, and
 * accessible at every scroll position (planes fade, they are never hidden).
 */
export function PricingLogic() {
  return (
    <section className="depth-section py-section bg-surface border-t border-deep">
      <div className="depth-runway">
        <div className="depth-stage">
          <div className="depth-ghosts" aria-hidden="true">
            <span className="depth-ghost depth-ghost--a">Ajans</span>
            <span className="depth-ghost depth-ghost--b">Bütçe</span>
          </div>

          <div className="depth-plane depth-plane--1">
            <Container>
              <SectionHeading
                badge="Ücretlendirme"
                title="Neyi neden ücretlendiriyoruz?"
                description="Fiyat listesi vermiyoruz çünkü her işletmenin ihtiyacı farklı. Ama neye para ödediğinizi bilmeniz hakkınız."
              />
            </Container>
          </div>

          <div className="depth-plane depth-plane--2">
            <Container>
              <ItemGrid
                items={pricingItems.slice(0, 2)}
                className="mt-16 md:mt-20 border-t border-deep md:border-t-0"
              />
            </Container>
          </div>

          <div className="depth-plane depth-plane--3">
            <Container>
              <ItemGrid items={pricingItems.slice(2)} />
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
