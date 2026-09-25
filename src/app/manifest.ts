import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Served at /manifest.webmanifest (Next.js file convention). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Meta Reklam Yönetimi`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: "tr",
    start_url: "/",
    display: "browser",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
