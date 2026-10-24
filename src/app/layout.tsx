import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { MotionConfig } from "motion/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import HashScroll from "@/components/layout/HashScroll";
import MetaPixel from "@/components/meta/MetaPixel";
import { siteConfig } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/metadata";
import { siteJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";
import "./effects.css";

// Kurumsal kimlik: tek yazı ailesi. Başlık 600, gövde 400, etiket/buton 500.
// Üç ağırlık tek değişkende; globals.css --font-heading/--font-body/--font-brand
// adlarını buna bağlar. latin-ext: ğ ş ı İ ç ö ü.
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
// Kill switch for the scroll-driven effects (see effects.css): NEXT_PUBLIC_FX=off
// renders <html data-fx="off"> and every effect falls back to its static state.
const effectsOff = process.env.NEXT_PUBLIC_FX === "off";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Meta ve Google Reklam Yönetimi | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: siteConfig.name,
    title: `Meta ve Google Reklam Yönetimi | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Meta ve Google Reklam Yönetimi | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      // CSS keeps smooth scrolling for in-page anchors; this tells Next to
      // jump instantly on page navigation instead of animating the scroll.
      data-scroll-behavior="smooth"
      data-fx={effectsOff ? "off" : undefined}
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        {/* schema.org: LocalBusiness/ProfessionalService + WebSite (lib/schema.ts) */}
        <JsonLd data={siteJsonLd()} />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-fg font-body">
        <MotionConfig reducedMotion="user">
          <MetaPixel />
          <HashScroll />
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
          <CookieBanner />
        </MotionConfig>
      </body>
    </html>
  );
}
