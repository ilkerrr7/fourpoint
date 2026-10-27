"use client";

import { motion } from "motion/react";
import { Container, Badge, Button } from "@/components/ui";
import { ReelPlayer } from "@/components/media/ReelPlayer";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { Cekim } from "@/content/cekimler";

const izgara = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const kart = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/**
 * Çekim vitrini: müşteriler için sahada çekilmiş gerçek Reels'ler.
 *
 * Buraya animasyon girmez; bölümün tek işi satılan şeyi, yani çekimin
 * kendisini göstermek. Listeyi sayfa süzer: yalnızca `izin: true` olan ve
 * dosyası gerçekten depoda bulunan çekimler gelir, üçten azsa bölüm hiç
 * basılmaz.
 *
 * Masaüstünde beşli ızgara, telefonda kenara taşan ve kart kart duran yatay
 * şerit (scroll-snap). Oynatma kuralları ReelPlayer'da.
 */
export function CekimVitrini({ cekimler }: { cekimler: Cekim[] }) {
  if (cekimler.length < 3) return null;

  return (
    <section className="py-section bg-ink border-t border-deep" aria-labelledby="cekimler-baslik">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <Badge>İşimiz</Badge>
          <h2 id="cekimler-baslik" className="text-fg mt-5 max-w-3xl">
            Bir günlük çekim, bir aylık içerik.
          </h2>
          <p className="text-fg-muted text-18 leading-relaxed mt-5 max-w-2xl">
            Telefonunuzdaki görüntüyle bizim çektiğimiz arasındaki fark ışıkta, lenste ve kurguda.
          </p>
        </motion.div>

        {/* Telefonda şerit kenara taşar (-mx-4 px-4), kartlar scroll-snap ile
            tek tek durur; md'den itibaren beşli ızgaraya döner. */}
        <motion.ul
          className="mt-10 md:mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:mx-0 md:px-0"
          variants={izgara}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cekimler.map((cekim) => (
            <motion.li
              key={cekim.dosya}
              variants={kart}
              className="snap-start shrink-0 w-[62%] min-[480px]:w-[46%] md:w-auto md:shrink"
            >
              <ReelPlayer
                dosya={`/media/cekimler/${cekim.dosya}`}
                poster={`/media/cekimler/${cekim.poster}`}
                baslik={cekim.isletme}
              />
              <p className="text-14 font-medium text-fg mt-3">{cekim.isletme}</p>
              <p className="text-12 text-fg-subtle mt-1">Sahada çekim, Four Point</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <Button href="/iletisim#contact-form" variant="secondary" size="md">
            Çekim için görüşelim
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
