import { MediaSlot } from "@/components/media/MediaSlot";

/**
 * A full-bleed visual pause between the text-dense sections around it —
 * no heading, no copy, just media (or its placeholder) at full width.
 */
export function MediaBreak() {
  return (
    <section className="bg-ink" aria-hidden="true">
      <MediaSlot slot="sectionBreak" className="w-full" />
    </section>
  );
}
