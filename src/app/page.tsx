import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/home/Hero";
import { PainPoints } from "@/components/home/PainPoints";
import { Services } from "@/components/home/Services";
import { MediaBreak } from "@/components/home/MediaBreak";
import { Automation } from "@/components/home/Automation";
import { Process } from "@/components/home/Process";
import { Differentiators } from "@/components/home/Differentiators";
import { PricingLogic } from "@/components/home/PricingLogic";
import { FAQ } from "@/components/home/FAQ";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CableJoint } from "@/components/effects/CableJoint";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <CableJoint id="hero-pain" />
      <PainPoints />
      <Services />
      <MediaBreak />
      <CableJoint id="break-automation" />
      <Automation />
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
