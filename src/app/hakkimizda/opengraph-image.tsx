import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Four Point Medya — İşletmelerin yanında, dürüst ve şeffaf.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Hakkımızda", title: "İşletmelerin yanında, dürüst ve şeffaf." });
}
