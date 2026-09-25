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
  /** True only for the hero slot: skips lazy-loading, this is the LCP asset. */
  priority?: boolean;
}

export const mediaSlots: Record<string, MediaSlotConfig> = {
  heroMedia: {
    type: "image",
    src: "/media/hero.webp",
    aspectRatio: "4/5",
    priority: true,
    alt: "Karanlıkta süzülen soyut bir ışık huzmesi ve toz parçacıkları dokusu",
  },
  sectionBreak: {
    type: "image",
    src: "/media/break.webp",
    aspectRatio: "21/9",
    priority: false,
    alt: "Ufuk boyunca yayılan soyut sis ve ışık dokusu",
  },
};
