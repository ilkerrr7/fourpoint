import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Four Point Medya — Nasıl çalışıyoruz: üç adımda net bir süreç";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Süreç", title: "Üç adımda net bir süreç." });
}
