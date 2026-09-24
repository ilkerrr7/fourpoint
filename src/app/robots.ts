import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

  return allowIndexing
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${siteConfig.url}/sitemap.xml`,
      }
    : {
        rules: { userAgent: "*", disallow: "/" },
        sitemap: `${siteConfig.url}/sitemap.xml`,
      };
}
