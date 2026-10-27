"use client";

import { motion } from "motion/react";
import { Container, Badge } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { referanslar, YORUM_SINIRI } from "@/content/referanslar";

const serit = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const ad = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const kart = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/**
 * Referans bandı: izin verilmiş işletmelerin adları tek satırlık bir şeritte,
 * altında en fazla üç yorum kartı.
 *
 * İki kural bu bölümü yönetir. Biri: yalnızca `izin: true` kayıtlar görünür.
 * Diğeri: izinli kayıt üçten azsa bölüm hiç basılmaz — yarım bir referans
 * bandı, hiç olmamasından daha kötü okunur. İçerik `content/referanslar.ts`
 * dosyasında; burada uydurma veri tutulmaz.
 */
export function Referanslar() {
  const izinliler = referanslar.filter((r) => r.izin);

  if (izinliler.length < 3) return null;

  const yorumlar = izinliler
    .filter((r) => r.yorum && r.yorum.length <= YORUM_SINIRI)
    .slice(0, 3);

  return (
    <section className="py-section bg-ink border-t border-deep" aria-labelledby="referanslar-baslik">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <Badge>Çalıştığımız İşletmeler</Badge>
          <h2 id="referanslar-baslik" className="text-fg mt-5 max-w-3xl">
            Sözümüzü değil, müşterimizi dinleyin.
          </h2>
        </motion.div>

        {/* Adlar tek satırda kalır; sığmadığı dar ekranda satır kırmak yerine
            yatay kayar, böylece şerit her genişlikte tek çizgi olarak okunur. */}
        <motion.ul
          className="mt-10 md:mt-12 flex items-center gap-x-8 md:gap-x-12 overflow-x-auto whitespace-nowrap border-y border-deep py-5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          variants={serit}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          aria-label="Çalıştığımız işletmeler"
        >
          {izinliler.map((referans) => (
            <motion.li
              key={referans.isletme}
              variants={ad}
              className="text-16 font-medium text-fg-muted shrink-0"
            >
              {referans.isletme}
            </motion.li>
          ))}
        </motion.ul>

        {yorumlar.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12"
            variants={serit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {yorumlar.map((referans) => (
              <motion.figure
                key={referans.isletme}
                variants={kart}
                className="h-full flex flex-col rounded-[var(--radius-card)] border border-deep bg-surface p-6 md:p-8"
              >
                <blockquote className="text-fg text-16 leading-relaxed">
                  &ldquo;{referans.yorum}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-deep text-14">
                  <span className="block font-medium text-fg">{referans.isletme}</span>
                  {(referans.kisi || referans.unvan) && (
                    <span className="block text-fg-muted mt-1">
                      {[referans.kisi, referans.unvan].filter(Boolean).join(", ")}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
