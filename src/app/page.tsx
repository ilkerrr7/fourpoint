import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/Hero";
import { PainPoints } from "@/components/home/PainPoints";
import { Services } from "@/components/home/Services";
import { MediaBreak } from "@/components/home/MediaBreak";
import { Automation } from "@/components/home/Automation";
import { RnD } from "@/components/home/RnD";
import { Process } from "@/components/home/Process";
import { Differentiators } from "@/components/home/Differentiators";
import { PricingLogic } from "@/components/home/PricingLogic";
import { FAQ } from "@/components/home/FAQ";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CableJoint } from "@/components/effects/CableJoint";
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
      <Hero />
      <CableJoint id="hero-pain" />
      <PainPoints />
      <Services />
      <MediaBreak />
      <CableJoint id="break-automation" />
      <Automation />
      <RnD />
      <Process />
      <Differentiators />
      <CableJoint id="differentiators-pricing" />
      <PricingLogic />
      <FAQ />
      <CableJoint id="faq-closing" />
      <ClosingCTA />
    </PageTransition>
  );
}
