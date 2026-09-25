import type { Metadata } from "next";
import { Inter, Big_Shoulders } from "next/font/google";
import { MotionConfig } from "motion/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { Curtain } from "@/components/layout/Curtain";
import MetaPixel from "@/components/meta/MetaPixel";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";
import "./effects.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  // Big Shoulders is one family with an optical-size axis (10–72). Without
  // this it locks to opsz 14, the text cut; with it, font-optical-sizing:auto
  // (the browser default) picks the Display cut on large headings.
  axes: ["opsz"],
  variable: "--font-heading",
  display: "swap",
  // next/font has no metrics for this family (it only knows the old split
  // "Big Shoulders Display/Text" names), so its automatic fallback fails and
  // emits no fallback at all. The metric-matched fallback is hand-built in
  // globals.css instead. Names are passed through verbatim, so the quotes are
  // needed, and they must be single quotes: Turbopack inlines the list into a
  // double-quoted JS string (double quotes here break the build).
  adjustFontFallback: false,
  fallback: ["'Big Shoulders Fallback'", "sans-serif"],
});

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
// Kill switch for the scroll-driven effects (see effects.css): NEXT_PUBLIC_FX=off
// renders <html data-fx="off"> and every effect falls back to its static state.
const effectsOff = process.env.NEXT_PUBLIC_FX === "off";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Meta Reklam Yönetimi`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Meta Reklam Yönetimi`,
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Meta Reklam Yönetimi`,
    description: siteConfig.description,
    images: ["/og-image.png"],
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
      data-fx={effectsOff ? "off" : undefined}
      className={`${inter.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-fg font-body">
        <MotionConfig reducedMotion="user">
          <MetaPixel />
          <Curtain />
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
          <CookieBanner />
        </MotionConfig>
      </body>
    </html>
  );
}
