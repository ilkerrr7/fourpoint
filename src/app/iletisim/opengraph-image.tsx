import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Four Point Medya — İletişim: ücretsiz keşif görüşmesi";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "İletişim", title: "Ücretsiz keşif görüşmesi için yazın." });
}
