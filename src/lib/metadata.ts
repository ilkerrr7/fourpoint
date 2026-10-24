import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** The 1200x630 share image (public/media). */
export const OG_IMAGE = {
  url: "/media/og-image.png",
  width: 1200,
  height: 630,
  alt: "Four Point Medya — Reklamlarınız doğru insanlara ulaşsın.",
} as const;

interface PageMetaInput {
  /** Page title; the layout template appends " | Four Point Medya" unless `absolute`. */
  title: string;
  /** Unique, page-specific description (roughly 120–160 characters). */
  description: string;
  /** Route path, e.g. "/hizmetler". Resolved against metadataBase. */
  path: string;
  /** Use the title as-is (the home page). */
  absolute?: boolean;
}

/**
 * Per-page metadata: title, description, canonical URL and complete Open
 * Graph / Twitter tags. Pages must set these themselves: Next merges metadata
 * shallowly, so a page that only sets `title` would otherwise inherit the
 * layout's og:title/og:url (the home page's) on every route.
 */
export function pageMetadata({ title, description, path, absolute }: PageMetaInput): Metadata {
  const fullTitle = absolute ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
