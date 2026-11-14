"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { Container, SectionHeading, Button } from "@/components/ui";
import { Spotlight } from "@/components/effects/Spotlight";
import { ServiceDiagram, type ServiceDiagramId } from "@/components/hizmetler/ServiceDiagram";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE_OUT_EXPO } from "@/lib/motion";

type TabId = "meta" | "google";

const TABS: { id: TabId; label: string }[] = [
  { id: "meta", label: "Meta Reklamları" },
  { id: "google", label: "Google Reklamları" },
];

const services: Record<TabId, { title: string; desc: string; diagram: ServiceDiagramId }[]> = {
  meta: [
    {
      title: "Instagram Reklam Yönetimi",
      desc: "Hedef kitlenize görsel ve video reklamlarla ulaşıyoruz. Doğru kitleye, doğru mesajla.",
      diagram: "instagram",
    },
    {
      title: "Facebook Reklam Yönetimi",
      desc: "Geniş Facebook ağında işletmenizi potansiyel müşterilerinizin önüne çıkarıyoruz.",
      diagram: "facebook",
    },
    {
      title: "Retargeting",
      desc: "Sitenizi ziyaret edip ayrılanları geri kazanıyoruz. İlgilenen kitleyi kaybetmiyoruz.",
      diagram: "retargeting",
    },
  ],
  google: [
    {
      title: "Google Arama Reklamları",
      desc: "Sizi arayan müşterinin karşısına, aradığı anda çıkıyoruz. Doğru anahtar kelime, boşa gitmeyen bütçe.",
      diagram: "arama",
    },
    {
      title: "Google Haritalar & İşletme Profili",
      desc: "Yakınınızda arayanlar sizi bulsun. Profilinizi kuruyor, düzenli tutuyor ve haritalarda görünürlüğünüzü artırıyoruz.",
      diagram: "haritalar",
    },
    {
      title: "Performance Max",
      desc: "Arama, YouTube, Gmail ve Haritalar'da tek kampanyayla görünün. Google'ın tüm ağını hedefinize göre çalıştırıyoruz.",
      diagram: "pmax",
    },
    {
      title: "YouTube Reklamları",
      desc: "Video reklamlarla markanızı doğru kitleye izletiyoruz. Ölçülebilir erişim, ölçülebilir etki.",
      diagram: "youtube",
    },
    {
      title: "Google Alışveriş Reklamları",
      desc: "E-ticaret ürünlerinizi fiyatı ve görseliyle arama sonuçlarında öne çıkarıyoruz.",
      diagram: "alisveris",
    },
  ],
};

/**
 * Şema yerleşimi (adım 2 kararı: sahne). lg ve üstünde listenin yanında,
 * etkin satırın şemasını gösteren sabit bir sahne; 1024 altında şema numara
 * ve başlıkla aynı satırda, sağda, küçük. Aynı anda yalnızca etkin satırın
 * şeması oynar: fare/odak olan cihazda etkin satır (ilk satır varsayılan,
 * fare listeden çıkınca son etkin kalır), dokunmatikte okuma çizgisi
 * bandındaki satır. Etkin satırın numarası gök mavisi, başlığı tam
 * parlaklıkta (effects.css ".svc-row").
 */
const PHONE_BAND = "-45% 0px -45% 0px" as const;

const extras = ["Web sitesi", "İçerik & Reels üretimi", "Sosyal medya yönetimi"];

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const row = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** `/#hizmetler-google` opens this section on the Google tab. The footer now
 *  links to /hizmetler#hizmetler-google, but links shared before that still
 *  land here, so the hash is kept. */
const GOOGLE_HASH = "#hizmetler-google";

export function Services() {
  const [tab, setTab] = useState<TabId>("meta");
  // etkin satır: sekme değişince ilk satır
  const [active, setActive] = useState(0);
  const hoverable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const wide = useMediaQuery("(min-width: 1024px)");
  // vurgu kaynağı: fare/odak ya da sahne görünürken React durumu; dokunmatik
  // telefonda satırın kendi şeması (CSS :has, okuma bandı)
  const emphasizeByState = hoverable || wide;
  const baseId = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ meta: null, google: null });

  // sekme değişince etkin satır ilk satıra döner (şema yerleşimleri)
  const selectTab = (id: TabId) => {
    setTab(id);
    setActive(0);
  };

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === GOOGLE_HASH) selectTab("google");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Roving tabindex: arrows move between tabs, Home/End jump; the tab that
  // receives focus is selected (automatic activation, WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = TABS[next].id;
    selectTab(id);
    tabRefs.current[id]?.focus();
  };

  const tabId = (id: TabId) => `${baseId}-tab-${id}`;
  const panelId = (id: TabId) => `${baseId}-panel-${id}`;

  return (
    <section id="hizmetler" className="py-section border-t border-deep">
      <Container>
        <SectionHeading
          badge="Hizmetler"
          title="İşletmeniz için ne yapıyoruz?"
          description="Dijital pazarlama hedeflerinize ulaşmak için etkili ve şeffaf çözümler sunuyoruz."
          align="left"
        />

        {/* anchor for /#hizmetler-google: always in the DOM, whichever tab is open */}
        <div id="hizmetler-google" aria-hidden="true" />

        {/* 375px: both tabs fit side by side (tighter padding + tracking below sm) */}
        <div
          role="tablist"
          aria-label="Reklam platformu"
          className="mt-10 md:mt-12 flex items-center gap-2"
        >
          {TABS.map((t, i) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el;
                }}
                type="button"
                role="tab"
                id={tabId(t.id)}
                aria-selected={selected}
                aria-controls={panelId(t.id)}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`h-11 md:h-10 px-3 sm:px-5 rounded-[var(--radius-button)] border text-12 sm:text-14 font-medium uppercase tracking-[0.08em] sm:tracking-[0.12em] whitespace-nowrap transition-[color,background-color,border-color] duration-150 ease-out ${
                  selected
                    ? "bg-fg text-ink border-fg"
                    : "bg-transparent text-fg-muted border-deep hover:text-fg hover:border-fg/50"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* key=tab remounts the list on a switch so the rows stagger in again */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
          <motion.div
            key={tab}
            role="tabpanel"
            id={panelId(tab)}
            aria-labelledby={tabId(tab)}
            tabIndex={0}
            className="mt-8 md:mt-10 border-t border-deep lg:col-span-7"
            variants={rowContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services[tab].map((service, index) => {
              const isActive = active === index;
              return (
                <motion.a
                  key={service.title}
                  // The tab ids match the section ids on /hizmetler, so a card
                  // lands on the group it belongs to rather than the page top.
                  href={`/hizmetler#hizmetler-${tab}`}
                  variants={row}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  data-active={emphasizeByState && isActive ? "on" : undefined}
                  // 1024 altı: [numara / başlık | şema], açıklama ve ok tam genişlikte altta
                  className="svc-row group relative isolate overflow-hidden grid grid-cols-[minmax(0,1fr)_5.5rem] items-start gap-x-4 gap-y-3 py-8 border-b border-deep lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-10"
                >
                  <Spotlight edge="bottom" />
                  <span className="svc-num col-start-1 row-start-1 font-heading text-14 text-fg-subtle transition-colors duration-200 lg:col-span-1 lg:row-start-auto">
                    0{index + 1}
                  </span>
                  <div className="col-start-2 row-start-1 row-span-2 w-full self-center lg:hidden">
                    <ServiceDiagram
                      id={service.diagram}
                      size="small"
                      active={hoverable ? isActive : true}
                      margin={hoverable ? undefined : PHONE_BAND}
                    />
                  </div>
                  <h3 className="svc-title col-start-1 row-start-2 text-fg-muted transition-colors duration-200 lg:col-span-5 lg:col-start-auto lg:row-start-auto">
                    {service.title}
                  </h3>
                  <p className="col-span-2 row-start-3 text-fg-muted text-16 leading-relaxed transition-colors duration-200 group-hover:text-fg lg:col-span-5 lg:row-start-auto">
                    {service.desc}
                  </p>
                  <span
                    className="col-span-2 row-start-4 justify-self-start text-fg-subtle transition-[color,transform] duration-200 ease-out group-hover:text-primary group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 lg:col-span-1 lg:row-start-auto lg:justify-self-end"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* sahne: etkin satırın şeması; hepsi aynı hücrede, yalnızca etkin olan görünür ve oynar.
              Kart diliyle aynı çerçeve: 8px köşe, --cizgi kenar, dolgu yok. */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32 lg:mt-10 lg:pt-10" aria-hidden="true">
            <div className="grid rounded-[var(--radius-card)] border border-deep p-10">
              {services[tab].map((service, index) => (
                <div
                  key={service.title}
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ease-out ${active === index ? "opacity-100" : "opacity-0"}`}
                >
                  <ServiceDiagram id={service.diagram} size="stage" active={active === index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What the ads need around them: one thin strip, independent of the tabs */}
        <motion.div
          id="web-icerik"
          className="mt-8 md:mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8 py-6 border-b border-deep"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <p className="font-heading text-18 font-medium text-fg">
              Reklamın çalışması için gerekenleri de yapıyoruz.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Ek hizmetler">
              {extras.map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center h-8 px-3 rounded-[var(--radius-badge)] border border-deep bg-surface text-12 text-fg-muted tracking-wide whitespace-nowrap"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <Button href="/iletisim" variant="secondary" size="sm" className="self-start md:self-auto shrink-0">
            Detay için görüşelim
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
