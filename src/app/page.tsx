import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/Hero";
import { PainPoints } from "@/components/home/PainPoints";
import { Services } from "@/components/home/Services";
import { ValueStrip } from "@/components/home/ValueStrip";
import { EngineConsole } from "@/components/home/EngineConsole";
import { Automation } from "@/components/home/Automation";
import { RnD } from "@/components/home/RnD";
import { Process } from "@/components/home/Process";
import { Differentiators } from "@/components/home/Differentiators";
import { PricingLogic } from "@/components/home/PricingLogic";
import { FAQ } from "@/components/home/FAQ";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CableJoint } from "@/components/effects/CableJoint";
import { LineSection } from "@/components/effects/LineSection";
import { AmbientField } from "@/components/home/AmbientField";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/schema";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = pageMetadata({
  title: "Meta ve Google Reklam Yönetimi | Four Point Medya",
  description: siteConfig.description,
  path: "/",
  absolute: true,
});

export default function HomePage() {
  return (
    <PageTransition>
      {/* SSS bölümüyle aynı veriden üretilir, elle yazılmaz */}
      <JsonLd data={faqPageJsonLd(faqItems)} />
      {/* sayfanın arkasındaki ışık alanı: sabit, içeriğin altında, yalnızca ana sayfa */}
      <AmbientField />
      {/* Kesintisiz ışık hattı (docs/isik-hatti.md): >=1360px'te her bölümün
          yanında bir ray, bölümler arasında dirsekler. Ray üst/alt değerleri
          dirsek geometrisine bağlıdır: üst = düğüm (terminal) + 6, alt = bir
          sonraki dirseğin başlangıcı (up). 1360 altında yalnızca eski dört
          kablo çizilir. */}
      <LineSection rail={{ side: "left", top: "38%", bottom: 120, fadeTop: true }}>
        <Hero />
      </LineSection>
      <CableJoint id="hero-pain" />
      <LineSection rail={{ side: "left", top: 121, bottom: 0 }}>
        <PainPoints />
      </LineSection>
      <LineSection rail={{ side: "left", top: 0, bottom: 0 }}>
        <ValueStrip />
      </LineSection>
      <LineSection rail={{ side: "left", top: 0, bottom: 0 }}>
        <Services />
      </LineSection>
      <LineSection rail={{ side: "left", top: 0, bottom: 100 }}>
        <EngineConsole />
      </LineSection>
      <CableJoint id="break-automation" />
      <LineSection rail={{ side: "left", top: 121, bottom: 0 }}>
        <Automation />
      </LineSection>
      <LineSection rail={{ side: "left", top: 0, bottom: 120 }}>
        <RnD />
      </LineSection>
      <CableJoint id="rnd-process" />
      {/* Süreç: ray solda kalır; orta ray, adımları bağlayan yatay rotayı
          (ProcessRoute) keserdi. Başlık ortalı kalır, düğüm SSS'teki gibi
          kenar boşluğunda. */}
      <LineSection rail={{ side: "left", top: 121, bottom: 120 }}>
        <Process />
      </LineSection>
      <CableJoint id="process-differentiators" />
      <LineSection rail={{ side: "left", top: 121, bottom: 120 }}>
        <Differentiators />
      </LineSection>
      <CableJoint id="differentiators-pricing" />
      <LineSection rail={{ side: "center", top: 121, bottom: 120 }}>
        <PricingLogic />
      </LineSection>
      <CableJoint id="pricing-faq" />
      <LineSection rail={{ side: "right", top: 121, bottom: 120 }}>
        <FAQ />
      </LineSection>
      <CableJoint id="faq-closing" />
      <ClosingCTA />
    </PageTransition>
  );
}
