import { useId } from "react";
import { InViewGate, type GateMargin } from "@/components/effects/InViewGate";

/**
 * Hizmet şemaları: her hizmet için küçük, çizgisel, hareketli bir SVG.
 * Saf SVG + CSS (effects.css "Service diagrams"); şema başına JS yok, tek
 * ortak kapı InViewGate'tir (döngüler yalnızca ekrandayken ve `active`
 * iken; StrandCompare gibi).
 *
 * Kurallar:
 *   - Yapı sabit, ışık dolaşır: çerçeveler, satırlar, kollar döngünün hiçbir
 *     anında kaybolmaz; yalnızca ışık (koşan baş, dolan çizgi, yanan öğe)
 *     hareket eder.
 *   - Her şemada tek bir gök mavisi "yanan" öğe (--fx-line-hot); çizgiler
 *     elektrik mavisi (--fx-line); yapı çizgileri düşük alfalı krem.
 *     Koşan ışık gök mavisidir, arkasında elektrik mavisi bir kuyruk taşır.
 *   - Dolgu yok ya da tek renkli düşük alfa. Yazı, rakam, eksen, yüzde, ikon,
 *     marka logosu yok: yalnızca genel şekiller.
 *   - Statik hal (sunucu, hareketi azalt, data-fx=off, ekran dışı) bitmiş
 *     haldir: yapı tam, yanan öğe yanık, koşan ışık yok.
 *
 * Ortak çerçeve 240x160 (3:2). Sınıflar:
 *   sema-frame  yapı (krem %22)      sema-faint   yapı (krem %14)
 *   sema-mark   yapı noktası (krem)  sema-line    sönük iz (elektrik)
 *   sema-charged dolu iz (elektrik)  sema-node    düğüm (elektrik)
 *   sema-hot    yanan çizgi (gök)    sema-dot     yanan nokta (gök)
 *   sema-fill   gök %10 dolgu+çizgi  sema-glow    gök %12 hale
 *   sema-head   koşan ışık (gök)     sema-tail    ışığın kuyruğu (elektrik)
 */

export type ServiceDiagramId =
  | "instagram"
  | "facebook"
  | "retargeting"
  | "arama"
  | "haritalar"
  | "pmax"
  | "youtube"
  | "alisveris"
  | "raporlama"
  | "donusum";

export const SERVICE_DIAGRAMS: { id: ServiceDiagramId; label: string }[] = [
  { id: "instagram", label: "Instagram Reklam Yönetimi" },
  { id: "facebook", label: "Facebook Reklam Yönetimi" },
  { id: "retargeting", label: "Retargeting" },
  { id: "arama", label: "Google Arama" },
  { id: "haritalar", label: "Haritalar ve İşletme Profili" },
  { id: "pmax", label: "Performance Max" },
  { id: "youtube", label: "YouTube" },
  { id: "alisveris", label: "Alışveriş" },
  { id: "raporlama", label: "Raporlama" },
  { id: "donusum", label: "Dönüşüm Takibi" },
];

/**
 * Çizimler 240x160 tuvalde yapılır; görünüm kutusu (viewBox) çizimin kendi
 * sınırlarına kırpılır ki şema kutusunu doldursun (sahnede büyük, satırda
 * küçük). Çizgi kalınlıkları bağlama göre --sema-sw ile dengelenir
 * (effects.css: sahne 0.6, küçük 1.8), ölçekle kabalaşmaz/incelmez.
 */
const BOUNDS: Record<ServiceDiagramId, [number, number, number, number]> = {
  instagram: [76, 4, 88, 152],
  facebook: [48, 12, 144, 140],
  retargeting: [16, 26, 208, 108],
  arama: [28, 14, 184, 140],
  haritalar: [4, 4, 232, 152],
  pmax: [16, 12, 216, 136],
  youtube: [26, 14, 188, 132],
  alisveris: [24, 30, 192, 96],
  raporlama: [62, 6, 116, 148],
  donusum: [12, 14, 216, 134],
};

/** aynı şema sayfada birden çok kez bulunabilir: SVG id'leri örneğe özel */
interface DrawingProps {
  uid: string;
  view: string;
}

/** sönük iz + kuyruk + koşan ışık: aynı yol üç kez */
function Run({ d, name }: { d: string; name: string }) {
  return (
    <>
      <path className="sema-line" d={d} />
      <path className={`sema-tail ${name}`} d={d} pathLength={1} />
      <path className={`sema-head ${name}`} d={d} pathLength={1} />
    </>
  );
}

/* ---- 1. Instagram: dikey telefon, yukarı akan kartlar, biri yanık ---- */
function Instagram({ uid, view }: DrawingProps) {
  // on kart = iki tur; döngü beş kart (180px) kayar, her beşinci kart yanık
  const cards = Array.from({ length: 10 }, (_, k) => k);
  const clip = `sema-ig-${uid}`;
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id={clip}>
          <rect x="93" y="15" width="54" height="130" rx="6" />
        </clipPath>
      </defs>
      <rect className="sema-frame" x="90" y="12" width="60" height="136" rx="8" />
      <g clipPath={`url(#${clip})`}>
        <g className="ig-feed">
          {cards.map((k) => (
            <rect
              key={k}
              className={k % 5 === 1 ? "sema-fill" : "sema-line"}
              x="98"
              y={24 + k * 36}
              width="44"
              height="28"
              rx="2"
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ---- 2. Facebook: merkezden dışa düğüm ağı, ışık uçlara ulaşıyor ---- */
const FB_RING = [
  [120, 46],
  [149.4, 63],
  [149.4, 97],
  [120, 114],
  [90.6, 97],
  [90.6, 63],
] as const;
// [kaynak halka düğümü, uç]
const FB_LEAVES: [number, [number, number]][] = [
  [0, [93, 22]],
  [0, [147, 22]],
  [1, [161, 31]],
  [1, [183, 69]],
  [3, [136.6, 141.8]],
  [3, [103.4, 141.8]],
  [4, [78.9, 129]],
  [4, [57, 91]],
];
function Facebook({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      {FB_RING.map(([x, y], i) => (
        <Run key={i} d={`M120 80 L${x} ${y}`} name="fb-spoke" />
      ))}
      {FB_LEAVES.map(([from, [x, y]], i) => (
        <Run key={i} d={`M${FB_RING[from][0]} ${FB_RING[from][1]} L${x} ${y}`} name="fb-branch" />
      ))}
      {FB_RING.map(([x, y], i) => (
        <circle key={i} className="sema-node fb-node" cx={x} cy={y} r="2.5" />
      ))}
      {FB_LEAVES.map(([, [x, y]], i) => (
        <circle key={i} className="sema-node fb-leaf" cx={x} cy={y} r="2" />
      ))}
      <circle className="sema-glow" cx="120" cy="80" r="9" />
      <circle className="sema-dot" cx="120" cy="80" r="3.5" />
    </svg>
  );
}

/* ---- 3. Retargeting: siteden çıktı, başka bir yere gitti, geri geldi ---- */
const RT_OUT = "M124 64 C144 64 150 44 170 70";
const RT_BACK = "M178 100 C178 120 150 120 124 102";
function Retargeting({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      {/* ana site */}
      <rect className="sema-frame" x="24" y="34" width="100" height="92" rx="4" />
      <line className="sema-faint" x1="24" y1="46" x2="124" y2="46" />
      <rect className="sema-fill rt-page" x="36" y="58" width="76" height="56" rx="2" />
      {/* başka bir yer: daha küçük, daha soluk */}
      <rect className="sema-faint" x="170" y="56" width="46" height="44" rx="3" />
      <line className="sema-faint" x1="170" y1="64" x2="216" y2="64" />
      <rect className="sema-line rt-away" x="178" y="70" width="30" height="22" rx="1" />
      {/* çıkış üstten, dönüş alttan */}
      <Run d={RT_OUT} name="rt-out" />
      <Run d={RT_BACK} name="rt-back" />
    </svg>
  );
}

/* ---- 4. Google Arama: arama çubuğu, altında sonuç satırları, en üstteki yanık ---- */
const SEARCH_ROWS: [number, number][] = [
  [70, 110],
  [90, 100],
  [60, 120],
  [80, 90],
];
function Arama({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="36" y="22" width="168" height="24" rx="12" />
      <line className="sema-charged ar-typing" x1="50" y1="34" x2="118" y2="34" />
      <rect className="sema-fill ar-band" x="36" y="56" width="168" height="22" rx="2" />
      {SEARCH_ROWS.map(([a, b], i) => (
        <g key={i}>
          <line className={i === 0 ? "sema-hot" : "sema-line"} x1="46" y1={64 + i * 24} x2={46 + a} y2={64 + i * 24} />
          <line className="sema-faint" x1="46" y1={72 + i * 24} x2={46 + b} y2={72 + i * 24} />
        </g>
      ))}
    </svg>
  );
}

/* ---- 5. Haritalar: ızgara, konum iğnesi, yayılan halka ---- */
function Haritalar({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      {[60, 120, 180].map((x) => (
        <line key={x} className="sema-faint" x1={x} y1="10" x2={x} y2="150" />
      ))}
      {[50, 100].map((y) => (
        <line key={y} className="sema-faint" x1="10" y1={y} x2="230" y2={y} />
      ))}
      <path className="sema-line" d="M10 122 L88 82 L230 62" />
      <path className="sema-line" d="M152 10 L140 150" />
      <ellipse className="sema-charged hr-ring hr-ring--a" cx="120" cy="94" rx="17" ry="7" />
      <ellipse className="sema-charged hr-ring hr-ring--b" cx="120" cy="94" rx="17" ry="7" />
      <line className="sema-hot" x1="120" y1="72" x2="120" y2="92" />
      <circle className="sema-dot" cx="120" cy="94" r="1.8" />
      <circle className="sema-fill" cx="120" cy="64" r="8" />
    </svg>
  );
}

/* ---- 6. Performance Max: tek kaynaktan dört kanala ---- */
const PMAX_Y = [28, 63, 97, 132];
function Pmax({ view }: DrawingProps) {
  const branch = (y: number) => `M28 80 H72 C100 80 100 ${y} 130 ${y} H200`;
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      {PMAX_Y.map((y, i) => (
        <g key={y} className={`pm-${i}`}>
          <Run d={branch(y)} name="pm-run" />
          <rect className="sema-charged pm-out" x="204" y={y - 7} width="20" height="14" rx="2" />
        </g>
      ))}
      <circle className="sema-glow" cx="28" cy="80" r="9" />
      <circle className="sema-dot" cx="28" cy="80" r="3.5" />
    </svg>
  );
}

/* ---- 7. YouTube: yatay çerçeve, oynat üçgeni, dolan ilerleme çizgisi ---- */
function Youtube({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="36" y="22" width="168" height="96" rx="4" />
      <path className="sema-charged yt-play" d="M108 52 L138 70 L108 88 Z" />
      <line className="sema-line" x1="36" y1="134" x2="204" y2="134" />
      <line className="sema-hot yt-bar" x1="36" y1="134" x2="204" y2="134" />
      <circle className="sema-dot yt-knob" cx="36" cy="134" r="2.5" />
    </svg>
  );
}

/* ---- 8. Alışveriş: yan yana ürün kartları, biri öne çıkıyor ---- */
function Alisveris({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      {[34, 95, 156].map((x, i) => (
        <g key={x} className={`al-card al-${i}`}>
          <rect className="al-box" x={x} y="44" width="50" height="72" rx="3" />
          <rect className="sema-faint" x={x + 6} y="50" width="38" height="34" rx="1" />
          <line className="sema-line" x1={x + 6} y1="96" x2={x + 36} y2="96" />
          <line className="sema-faint" x1={x + 6} y1="106" x2={x + 24} y2="106" />
        </g>
      ))}
    </svg>
  );
}

/* ---- 9. Raporlama: tablo — solda etiket, sağa hizalı değer; üstte yanan özet satırı ---- */
const REPORT_ROWS: [number, number][] = [
  [30, 16],
  [22, 22],
  [34, 12],
  [26, 20],
  [30, 14],
  [20, 18],
];
function Raporlama({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="72" y="14" width="96" height="132" rx="3" />
      {/* özet satırı: tek yanan öğe */}
      <rect className="sema-fill" x="78" y="22" width="84" height="16" rx="2" />
      <line className="sema-hot" x1="84" y1="30" x2="112" y2="30" />
      <line className="sema-hot" x1="140" y1="30" x2="156" y2="30" />
      <line className="sema-faint" x1="72" y1="46" x2="168" y2="46" />
      {REPORT_ROWS.map(([label, value], i) => (
        <g key={i} className={`rp-row rp-${i}`}>
          <line className="sema-line" x1="84" y1={58 + i * 14} x2={84 + label} y2={58 + i * 14} />
          <line className="sema-charged" x1={156 - value} y1={58 + i * 14} x2="156" y2={58 + i * 14} />
          {i < REPORT_ROWS.length - 1 && (
            <line className="sema-faint" x1="78" y1={65 + i * 14} x2="162" y2={65 + i * 14} />
          )}
        </g>
      ))}
    </svg>
  );
}

/* ---- 10. Dönüşüm Takibi: tarayıcı ve sunucu yolları aynı noktada birleşir ---- */
const DT_UP = "M26 80 C50 80 50 42 80 42 H160 C190 42 190 80 214 80";
const DT_DOWN = "M26 80 C50 80 50 118 80 118 H160 C190 118 190 80 214 80";
function Donusum({ view }: DrawingProps) {
  return (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet">
      <Run d={DT_UP} name="dt-run" />
      <Run d={DT_DOWN} name="dt-run" />
      {/* tarayıcı: üst çubuklu pencere */}
      <rect className="sema-frame dt-box" x="96" y="24" width="48" height="36" rx="3" />
      <line className="sema-faint" x1="96" y1="33" x2="144" y2="33" />
      <circle className="sema-mark" cx="102" cy="28.5" r="1.3" />
      {/* sunucu: üst üste iki raf, her rafta bir nokta; hat rafların arasından geçer */}
      <rect className="sema-frame dt-box" x="96" y="100" width="48" height="15" rx="2" />
      <rect className="sema-frame dt-box" x="96" y="121" width="48" height="15" rx="2" />
      <circle className="sema-mark" cx="103" cy="107.5" r="1.5" />
      <circle className="sema-mark" cx="103" cy="128.5" r="1.5" />
      <circle className="sema-node" cx="26" cy="80" r="3.5" />
      <circle className="sema-glow dt-end-glow" cx="214" cy="80" r="9" />
      <circle className="sema-dot dt-end" cx="214" cy="80" r="3.5" />
    </svg>
  );
}

const DRAWINGS: Record<ServiceDiagramId, (p: DrawingProps) => React.JSX.Element> = {
  instagram: Instagram,
  facebook: Facebook,
  retargeting: Retargeting,
  arama: Arama,
  haritalar: Haritalar,
  pmax: Pmax,
  youtube: Youtube,
  alisveris: Alisveris,
  raporlama: Raporlama,
  donusum: Donusum,
};

export function ServiceDiagram({
  id,
  size = "stage",
  className = "",
  active,
  margin,
}: {
  id: ServiceDiagramId;
  /** çizgi kalınlığı dengesi: sahne (büyük) ya da satır içi (küçük) */
  size?: "stage" | "small";
  className?: string;
  /** false: ekranda olsa da hareket yok (bitmiş hal); yerleşimde yalnızca etkin satır oynar */
  active?: boolean;
  /** InViewGate rootMargin: ekranın hangi bandında "ekranda" sayılacağı */
  margin?: GateMargin;
}) {
  const Drawing = DRAWINGS[id];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const view = BOUNDS[id].join(" ");
  return (
    <InViewGate className={`sema sema--${id} sema--${size} ${className}`} active={active} margin={margin}>
      <Drawing uid={uid} view={view} />
    </InViewGate>
  );
}
