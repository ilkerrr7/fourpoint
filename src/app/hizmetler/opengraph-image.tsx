import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Four Point Medya — Meta ve Google reklam hizmetleri";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Hizmetler", title: "Meta ve Google reklam hizmetleri" });
}
