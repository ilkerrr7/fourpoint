import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * `public/` altındaki bir dosyanın gerçekten var olup olmadığını söyler.
 *
 * Yalnızca sunucu bileşenlerinden çağrılır ve sayfalar statik üretildiği için
 * `next build` sırasında bir kez çalışır. Amacı şu: video dosyaları depoya
 * sonradan ekleniyor, bu yüzden bir bölüm henüz ortada olmayan bir dosyayı
 * göstermeye kalkarsa ziyaretçi bozuk bir oynatıcı görür. Dosya geldiğinde
 * bölüm bir sonraki derlemede kendiliğinden açılır; bayrak çevirmek gerekmez.
 */
export function publicDosyaVar(yol: string): boolean {
  const temiz = yol.replace(/^\/+/, "");
  // public dışına çıkan bir yol sorulursa yok say.
  if (temiz.includes("..")) return false;
  return existsSync(join(process.cwd(), "public", temiz));
}
