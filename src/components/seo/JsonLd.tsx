import { serializeJsonLd } from "@/lib/schema";

/**
 * Bir JSON-LD bloğunu <script type="application/ld+json"> olarak basar.
 * Sunucu bileşeni; veri yalnızca kendi kodumuzdan gelir, kullanıcı girdisi
 * taşımaz. "<" kaçışı serializeJsonLd içinde yapılır, böylece bir metinde
 * "</script>" geçse bile etiket kapanmaz.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
