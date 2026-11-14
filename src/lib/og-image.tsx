import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Sayfa başına paylaşım görseli (Open Graph / Twitter), Next'in
 * `opengraph-image.tsx` dosya kuralıyla üretilir: derleme anında bir kez
 * çizilir ve önbelleklenir. Marka siyahı zemin, başlığın arkasında gece
 * mavisi havuz (hero'daki gibi), logo, üst etiket ve Poppins başlık.
 * `public/media/og-image.png` dosya kuralı olmayan rotalar için yedek kalır.
 *
 * Poppins: next/font'un indirdiği dosyalar woff2'dir ve ImageResponse
 * (satori) bunu okuyamaz; bu yüzden yazı tipi derleme anında Google
 * Fonts'tan yalnızca kullanılan karakterlerle (text=) TTF olarak alınır.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#0A0A0A";
const CREAM = "#F4F1EA";
const MUTED = "#A39F97";
const SKY = "#38BDF8";
const ELECTRIC = "#0A84FF";
const NIGHT = "#0A1D30";

const logoData = await readFile(join(process.cwd(), "public/logo.svg"), "base64");
const logoSrc = `data:image/svg+xml;base64,${logoData}`;

async function poppins(weight: 500 | 600, text: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&text=${encodeURIComponent(text)}`,
    // eski bir tarayıcı kimliği: Google Fonts woff2 yerine TTF/woff verir
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0" } },
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error("Poppins yazı tipi alınamadı (OG görseli)");
  return fetch(url).then((r) => r.arrayBuffer());
}

export async function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const brand = "Four Point Medya";
  const domain = "fourpointmedya.com";
  // Türkçe büyük harf yalnızca Türkçe etikette (İ/ı doğru kalsın); marka adı
  // İngilizce "Point" içerdiği için düz büyük harf ("FOUR POINT MEDYA")
  const eyebrowUpper = eyebrow.toLocaleUpperCase("tr-TR");
  const brandUpper = brand.toUpperCase();
  const [semibold, medium] = await Promise.all([
    poppins(600, title),
    poppins(500, eyebrowUpper + brandUpper + domain),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `radial-gradient(circle at 30% 60%, ${NIGHT} 0%, ${INK} 62%)`,
          color: CREAM,
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse JSX, next/image yok */}
          <img src={logoSrc} width={56} height={56} alt="" />
          <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "0.22em" }}>
            {brandUpper}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: SKY, fontSize: 22, fontWeight: 500, letterSpacing: "0.3em" }}>
            <div style={{ width: 36, height: 2, background: ELECTRIC }} />
            <span>{eyebrowUpper}</span>
          </div>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.01em" }}>{title}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: MUTED, fontSize: 22, fontWeight: 500 }}>
          <span>{domain}</span>
          <div style={{ width: 160, height: 1, background: ELECTRIC, opacity: 0.6 }} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
