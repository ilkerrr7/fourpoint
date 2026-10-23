import type { Metadata } from "next";
import { Inter, Big_Shoulders } from "next/font/google";
import { MotionConfig } from "motion/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import MetaPixel from "@/components/meta/MetaPixel";
import { siteConfig } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/metadata";
import { localBusinessJsonLd } from "@/lib/schema";
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

// Big Shoulders is served as two files by unicode-range: basic Latin and
// Latin Extended (ğ ş ı İ). They arrive at different times, so on a slow
// connection a word like "doğru" briefly mixed two fonts. This holds headings
// in the metric-matched fallback (globals.css, [data-fonts="pending"]) until
// BOTH files have loaded, then swaps them in one step. Nothing moves when it
// does: the fallback occupies the same boxes. Without JS the attribute is
// never set and fonts behave normally; if the font never loads, the fallback
// simply stays. Later pages in the session skip the hold (files are cached).
const FONT_SWAP_SCRIPT = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("fp-fonts"))return;d.setAttribute("data-fonts","pending");var f=document.fonts,q='700 1em "Big Shoulders"';Promise.all([f.load(q,"Aa"),f.load(q,"ğşİı")]).then(function(r){if(r[0].length&&r[1].length){d.removeAttribute("data-fonts");try{sessionStorage.setItem("fp-fonts","1")}catch(e){}}})}catch(e){document.documentElement.removeAttribute("data-fonts")}})();`;

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Meta Reklam Yönetimi`,
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
      className={`${inter.variable} ${bigShoulders.variable} h-full antialiased`}
      // data-fonts is set by FONT_SWAP_SCRIPT before hydration
      suppressHydrationWarning
    >
      <head>
        {/* A plain inline script, not next/script: it must run while the HTML
            is parsed, before the first paint. (beforeInteractive only queues
            the code for Next's runtime, ~2s later on a slow phone.) */}
        <script dangerouslySetInnerHTML={{ __html: FONT_SWAP_SCRIPT }} />
        {/* LocalBusiness şeması (schema.org) — ofis adresi ve iletişim */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessJsonLd() }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-fg font-body">
        <MotionConfig reducedMotion="user">
          <MetaPixel />
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
          <CookieBanner />
        </MotionConfig>
      </body>
    </html>
  );
}
