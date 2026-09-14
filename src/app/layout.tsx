import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import MetaPixel from "@/components/meta/MetaPixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: domain adı kesinleştikten sonra metadataBase güncelle
  metadataBase: new URL("https://fourpoint.example.com"),
  title: {
    default: "Fourpoint — Meta Reklam Yönetimi",
    template: "%s | Fourpoint",
  },
  description:
    "Instagram ve Facebook reklamlarınızı doğru hedef kitleye ulaştırıyoruz. Bütçenizi verimli kullanmanız için stratejik reklam yönetimi.",
  keywords: [
    "meta reklam yönetimi",
    "instagram reklam",
    "facebook reklam",
    "dijital pazarlama ajansı",
    "sosyal medya reklamcılığı",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Fourpoint",
    title: "Fourpoint — Meta Reklam Yönetimi",
    description:
      "Instagram ve Facebook reklamlarınızı doğru hedef kitleye ulaştırıyoruz.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fourpoint — Meta Reklam Yönetimi",
    description:
      "Instagram ve Facebook reklamlarınızı doğru hedef kitleye ulaştırıyoruz.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-fg font-body">
        <MetaPixel />
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
