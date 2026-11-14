import { InViewGate } from "@/components/effects/InViewGate";

/**
 * Hizmet şemaları: her hizmet için küçük, çizgisel, hareketli bir SVG.
 * Saf SVG + CSS (effects.css "Service diagrams"); şema başına JS yok, tek
 * ortak kapı InViewGate'tir (döngüler yalnızca ekrandayken, StrandCompare
 * gibi). Kablo dili: ince çizgi --fx-line (elektrik), yanan parça
 * --fx-line-hot (gök), yapı çizgileri düşük alfalı krem. Dolgu yok ya da
 * tek renkli düşük alfa. Yazı, rakam, eksen, yüzde, ikon, marka logosu yok:
 * yalnızca genel şekiller. Statik hal (sunucu, hareketi azalt, data-fx=off,
 * ekran dışı) bitmiş haldir: hat çizili, düğümler yanık.
 *
 * Ortak çerçeve 240x160 (3:2). Sınıflar:
 *   sema-frame   yapı çizgisi (krem %22)   sema-faint  yapı çizgisi (krem %10)
 *   sema-line    sönük iz (elektrik)       sema-charged dolu iz (elektrik)
 *   sema-hot     yanan çizgi (gök)         sema-dot     yanan nokta (gök)
 *   sema-fill    gök %10 dolgu + gök çizgi  sema-head    yolda koşan ışık
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

const VIEW = "0 0 240 160";

/* ---- 1. Instagram: dikey telefon, yukarı akan kartlar, biri yanık ---- */
function Instagram() {
  // on kart = iki tur; döngü beş kart (180px) kayar, her beşinci kart yanık
  const cards = Array.from({ length: 10 }, (_, k) => k);
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id="sema-ig-clip">
          <rect x="93" y="15" width="54" height="130" rx="6" />
        </clipPath>
      </defs>
      <rect className="sema-frame" x="90" y="12" width="60" height="136" rx="8" />
      <g clipPath="url(#sema-ig-clip)">
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
function Facebook() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      {FB_RING.map(([x, y], i) => (
        <g key={i}>
          <line className="sema-line" x1="120" y1="80" x2={x} y2={y} />
          <line className="sema-charged fb-spoke" x1="120" y1="80" x2={x} y2={y} pathLength={1} />
        </g>
      ))}
      {FB_LEAVES.map(([from, [x, y]], i) => (
        <g key={i}>
          <line className="sema-line" x1={FB_RING[from][0]} y1={FB_RING[from][1]} x2={x} y2={y} />
          <line
            className="sema-charged fb-branch"
            x1={FB_RING[from][0]}
            y1={FB_RING[from][1]}
            x2={x}
            y2={y}
            pathLength={1}
          />
        </g>
      ))}
      {FB_RING.map(([x, y], i) => (
        <circle key={i} className="sema-dot fb-node" cx={x} cy={y} r="2.5" />
      ))}
      {FB_LEAVES.map(([, [x, y]], i) => (
        <circle key={i} className="sema-dot fb-leaf" cx={x} cy={y} r="2" />
      ))}
      <circle className="sema-glow" cx="120" cy="80" r="9" />
      <circle className="sema-dot" cx="120" cy="80" r="3.5" />
    </svg>
  );
}

/* ---- 3. Retargeting: nokta çerçeveden çıkar, yay çizer, geri döner ---- */
const RT_PATH = "M112 78 C160 78 214 48 214 82 C214 116 160 92 112 92";
function Retargeting() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="28" y="36" width="96" height="88" rx="4" />
      <line className="sema-faint" x1="28" y1="48" x2="124" y2="48" />
      <rect className="sema-fill rt-page" x="40" y="60" width="72" height="50" rx="2" />
      <path className="sema-line" d={RT_PATH} />
      <path className="sema-charged rt-trail" d={RT_PATH} pathLength={1} />
      <path className="sema-head rt-head" d={RT_PATH} pathLength={1} />
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
function Arama() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="36" y="22" width="168" height="24" rx="12" />
      <line className="sema-hot ar-typing" x1="50" y1="34" x2="118" y2="34" />
      <rect className="sema-fill ar-band" x="36" y="56" width="168" height="22" rx="2" />
      {SEARCH_ROWS.map(([a, b], i) => (
        <g key={i} className="ar-row">
          <line className={i === 0 ? "sema-hot" : "sema-charged"} x1="46" y1={64 + i * 24} x2={46 + a} y2={64 + i * 24} />
          <line className="sema-faint" x1="46" y1={72 + i * 24} x2={46 + b} y2={72 + i * 24} />
        </g>
      ))}
    </svg>
  );
}

/* ---- 5. Haritalar: ızgara, konum iğnesi, yayılan halka ---- */
function Haritalar() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      {[60, 120, 180].map((x) => (
        <line key={x} className="sema-faint" x1={x} y1="10" x2={x} y2="150" />
      ))}
      {[50, 100].map((y) => (
        <line key={y} className="sema-faint" x1="10" y1={y} x2="230" y2={y} />
      ))}
      <path className="sema-line" d="M10 122 L88 82 L230 62" />
      <path className="sema-line" d="M152 10 L140 150" />
      <ellipse className="sema-charged hr-ring hr-ring--a" cx="120" cy="92" rx="14" ry="6" />
      <ellipse className="sema-charged hr-ring hr-ring--b" cx="120" cy="92" rx="14" ry="6" />
      <line className="sema-hot" x1="120" y1="76" x2="120" y2="90" />
      <circle className="sema-dot" cx="120" cy="92" r="1.6" />
      <circle className="sema-fill" cx="120" cy="70" r="6" />
    </svg>
  );
}

/* ---- 6. Performance Max: tek kaynaktan dört kanala ---- */
const PMAX_Y = [28, 63, 97, 132];
function Pmax() {
  const branch = (y: number) => `M28 80 H72 C100 80 100 ${y} 130 ${y} H200`;
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      {PMAX_Y.map((y, i) => (
        <g key={y}>
          <path className="sema-line" d={branch(y)} />
          <path className={`sema-charged pm-branch pm-${i}`} d={branch(y)} pathLength={1} />
          <path className={`sema-head pm-head pm-${i}`} d={branch(y)} pathLength={1} />
          <rect className={`sema-fill pm-out pm-${i}`} x="204" y={y - 7} width="20" height="14" rx="2" />
        </g>
      ))}
      <circle className="sema-glow" cx="28" cy="80" r="9" />
      <circle className="sema-dot" cx="28" cy="80" r="3.5" />
    </svg>
  );
}

/* ---- 7. YouTube: yatay çerçeve, oynat üçgeni, dolan ilerleme çizgisi ---- */
function Youtube() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="36" y="22" width="168" height="96" rx="4" />
      <path className="sema-fill yt-play" d="M108 52 L138 70 L108 88 Z" />
      <line className="sema-line" x1="36" y1="134" x2="204" y2="134" />
      <line className="sema-hot yt-bar" x1="36" y1="134" x2="204" y2="134" />
      <circle className="sema-dot yt-knob" cx="36" cy="134" r="2.5" />
    </svg>
  );
}

/* ---- 8. Alışveriş: yan yana ürün kartları, biri öne çıkıyor ---- */
function Alisveris() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      {[34, 95, 156].map((x, i) => (
        <g key={x} className={`al-card al-${i}`}>
          <rect className="sema-line al-box" x={x} y="44" width="50" height="72" rx="3" />
          <rect className="sema-faint al-img" x={x + 6} y="50" width="38" height="34" rx="1" />
          <line className="sema-charged" x1={x + 6} y1="96" x2={x + 36} y2="96" />
          <line className="sema-faint" x1={x + 6} y1="106" x2={x + 24} y2="106" />
        </g>
      ))}
    </svg>
  );
}

/* ---- 9. Raporlama: sayfa çerçevesi, satırlar sırayla çiziliyor ---- */
const REPORT_ROWS = [72, 56, 66, 48, 70, 40];
function Raporlama() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      <rect className="sema-frame" x="72" y="14" width="96" height="132" rx="3" />
      <line className="sema-hot" x1="84" y1="30" x2="124" y2="30" />
      <line className="sema-faint" x1="84" y1="38" x2="104" y2="38" />
      <line className="sema-faint" x1="72" y1="46" x2="168" y2="46" />
      {REPORT_ROWS.map((w, i) => (
        <line
          key={i}
          className={`sema-charged rp-row rp-${i}`}
          x1="84"
          y1={60 + i * 14}
          x2={84 + w}
          y2={60 + i * 14}
          pathLength={1}
        />
      ))}
    </svg>
  );
}

/* ---- 10. Dönüşüm Takibi: iki paralel yol (tarayıcı, sunucu), aynı noktada birleşir ---- */
const DT_UP = "M26 80 C50 80 50 44 80 44 H160 C190 44 190 80 214 80";
const DT_DOWN = "M26 80 C50 80 50 116 80 116 H160 C190 116 190 80 214 80";
function Donusum() {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      <path className="sema-line" d={DT_UP} />
      <path className="sema-line" d={DT_DOWN} />
      <path className="sema-charged dt-trail" d={DT_UP} pathLength={1} />
      <path className="sema-charged dt-trail" d={DT_DOWN} pathLength={1} />
      <path className="sema-head dt-head" d={DT_UP} pathLength={1} />
      <path className="sema-head dt-head" d={DT_DOWN} pathLength={1} />
      {/* tarayıcı: üst çubuklu çerçeve; sunucu: iki raflı çerçeve */}
      <rect className="sema-frame" x="104" y="32" width="32" height="24" rx="2" />
      <line className="sema-faint" x1="104" y1="38" x2="136" y2="38" />
      <rect className="sema-frame" x="104" y="104" width="32" height="24" rx="2" />
      <line className="sema-faint" x1="104" y1="112" x2="136" y2="112" />
      <line className="sema-faint" x1="104" y1="120" x2="136" y2="120" />
      <circle className="sema-glow" cx="26" cy="80" r="9" />
      <circle className="sema-dot" cx="26" cy="80" r="3.5" />
      <circle className="sema-glow dt-end-glow" cx="214" cy="80" r="9" />
      <circle className="sema-dot dt-end" cx="214" cy="80" r="3.5" />
    </svg>
  );
}

const DRAWINGS: Record<ServiceDiagramId, () => React.JSX.Element> = {
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

export function ServiceDiagram({ id, className = "" }: { id: ServiceDiagramId; className?: string }) {
  const Drawing = DRAWINGS[id];
  return (
    <InViewGate className={`sema sema--${id} ${className}`}>
      <Drawing />
    </InViewGate>
  );
}
