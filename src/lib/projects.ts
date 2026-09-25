/**
 * Proje / vaka çalışması verisi.
 *
 * Bu dosya kasıtlı olarak boş bir dizi ile başlar. Gerçek proje
 * eklenene kadar /projeler/[slug] rotası hiçbir sayfa üretmez ve
 * navigasyonda veya sitemap.ts içinde görünmez.
 *
 * Yeni bir proje eklerken:
 * - slug: URL segmenti (örn. "marka-x-lansman")
 * - services: yalnızca gerçekten sunulan hizmetlerden seçilmeli
 * - coverImage / gallery: gerçek görseller — placeholder kullanılmaz
 */

export interface Project {
  slug: string;
  title: string;
  client?: string;
  year: string;
  services: string[];
  summary: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  result?: string;
  externalUrl?: string;
}

export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
