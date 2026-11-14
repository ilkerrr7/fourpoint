/**
 * Media slot registry. One place to drop in real photography/video —
 * set `src` (and `poster` for video) and everything else (aspect ratio,
 * lazy-loading, LCP priority) is already wired up by <MediaSlot />.
 * Leave `src` unset and the slot renders a placeholder instead of a
 * fake screenshot or stock photo.
 */

export interface MediaSlotConfig {
  type: "video" | "image";
  src?: string;
  poster?: string;
  alt: string;
  /** e.g. "4/5", "21/9" — reserves space so there is no layout shift. */
  aspectRatio: string;
  /** True for an above-the-fold slot: skips lazy-loading (LCP). */
  priority?: boolean;
}

// Boş: ana sayfadaki ara görselin yerini canlı konsol aldı (EngineConsole).
// Yeni bir fotoğraf/video eklenecekse buraya bir slot tanımlanır.
export const mediaSlots: Record<string, MediaSlotConfig> = {};
