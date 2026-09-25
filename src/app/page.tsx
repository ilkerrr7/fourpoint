import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/home/Hero";
import { PainPoints } from "@/components/home/PainPoints";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Differentiators } from "@/components/home/Differentiators";
import { PricingLogic } from "@/components/home/PricingLogic";
import { FAQ } from "@/components/home/FAQ";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <PainPoints />
      <Services />
      <Process />
      <Differentiators />
      <PricingLogic />
      <FAQ />
      <ClosingCTA />
    </PageTransition>
  );
}
