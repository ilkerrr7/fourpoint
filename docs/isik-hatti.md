# Kesintisiz ışık hattı — tasarım notu

Durum: kararlar alındı (2026-11-14), uygulama `isik-hatti` dalında. Açık karar kalmadı; bkz. §9.

## 1. Amaç

Ana sayfadaki dört ayrı kabloyu (CableJoint: hero→pain, console→automation,
differentiators→pricing, faq→closing) sayfanın başından sonuna uzanan tek bir
hatta çevirmek. Işık, sayfa kaydırıldıkça bu hat boyunca ilerler; kullanıcı
yukarı kaydırınca geri gelir. Hat, bölümleri birbirine bağlayan görünmez bir
iskelet gibi okunur: "tek sahne" hissi buradan gelir.

Değişmeyenler: yerel kaydırma (hiçbir şey tekerleği ya da dokunmayı ele
geçirmez), marka token'ları (--fx-line = elektrik, --fx-line-hot = gök),
effects.css başındaki dört kural, yeni bağımlılık yok, logo ve metinler aynı.

## 2. Bugün ne var

- Dört CableJoint. Her biri kendi viewBox'ında elle çizilmiş bir Bézier,
  kapsayıcının sol kenarına ya da ortasına çapalı, sıfır yükseklikli bir
  yuvada. Beş katman: halo (statik blur), base, charged, head (üç kalınlık),
  node.
- Işık: `view-timeline` + `animation-range: cover 42% cover 54%`. Yani her
  kablo, kendi kutusu ekranın belli bir bandından geçerken kendi ışığını
  koşturur. Kablolar birbirinden habersizdir; ışık bir kabloda biter, bir
  sonraki kabloda sıfırdan başlar.
- Scroll timeline yoksa: InViewOnce, kablo ekrana girince bir kez oynatır.
- Statik hal: hat dolu (charged), ışık yok, node yanık.

Eksik olan tek şey süreklilik: ışığın "bir yerden gelip bir yere gittiği"
hissi. Kablolar arasındaki boşluklarda hat yok.

## 3. Çekirdek fikir: okuma çizgisi

Işığın başı (head) her zaman ekranın sabit bir yüksekliğinde durur; örneğin
üstten %45'te. Sayfa kayarken hat bu çizginin altından geçer, çizginin
üstünde kalan kısım "dolu", altı "sönük" olur. Sürekliliği sağlayan şey
tek bir uzun path değil, bu çizgidir: ardışık parçaların her biri yalnızca
kendi kutusu okuma çizgisini keserken canlanırsa, baş hiç sıçramadan
parçadan parçaya geçer.

Bunu CSS tek başına verir:

```css
.hat-parca {
  view-timeline: --parca block;
  /* kaydırma alanını tek bir çizgiye indir: üstten %45, alttan %55 */
  view-timeline-inset: 45% 55%;
}
.hat-parca .cable-charged {
  animation: cable-charge linear both;
  animation-timeline: --parca;
  animation-range: cover;   /* kutunun üstü çizgiye değdi -> altı çizgiden çıktı */
}
```

`view-timeline-inset` ile kaydırma alanı sıfır yüksekliğe iner; `cover`
aralığı tam olarak "parçanın üstü çizgiye geldi → altı çizgiden çıktı"
olur. Parçalar dikeyde art arda dizildiği için baş tanım gereği süreklidir.
JS yok, ölçüm yok, bugünkü `42%/54%` el ayarı da kalkar.

## 4. Rota

Hat, içerikle çakışmamak için kapsayıcının dışında, sol kenar boşluğunda
koşar (ray). Yan değiştirmesi gerektiğinde bugünkü kablo eğrileri devreye
girer (dirsek). Eyebrow hizaları bugünkü koda göre:

| Bölüm | Eyebrow | Hat |
|---|---|---|
| Hero | sol | ray, hero eyebrow'unun altından karanlıktan doğar |
| Tanıdık Geldi mi? | sol | ray (düğüm: eyebrow) |
| Şerit + Hizmetler | sol | ray |
| Konsol | — | ray, konsolun solundan geçer (konsol kapsayıcıdan 100px içeride; 25px kuralı kendiliğinden sağlanır) |
| Otomasyon | sol | ray (düğüm) |
| AR-GE | sol | ray (düğüm) |
| Süreç | orta | dirsek: sol → orta (yeni), orta ray |
| Neden Four Point? | sol | dirsek: orta → sol (yeni), sol ray |
| Ücretlendirme | orta | dirsek: sol → orta (bugünkü differentiators→pricing), orta ray |
| SSS | orta | dirsek: orta → sağ (yeni), sağ ray |
| Kapanış | orta | dirsek: sağ → orta (bugünkü faq→closing, sağdan gelen hareket korunur), işaretin üstünde biter |

Karar: faq→closing dirseğinin sağdan gelen hareketi korunur. Bunun için SSS
boyunca ray sağ kenarda koşar; Ücretlendirme'nin orta rayından sağa bir
dirsekle geçilir. Yedi dirsek, dördü bugünkü geometri, üçü yeni.

Karar: ray yalnızca 1280px ve üstünde. Bu genişlikte kapsayıcı tam 1280px'e
oturduğu için geometri sabittir: içerik 1216px, sol ray içerik kenarının 24px
dışında (x = −24), orta ray x = 608, sağ ray x = 1240. 1280'de ray ekranın
8px içinde kalır. 1280 altında ray yok ve bugünkü dört kablo aynen çalışır
(aynı geometri, aynı zamanlama, aynı yedek yol).

## 5. Anatomi

Tek bileşen: `LightLine`, sayfaya `main` içinde bölüm sınırlarına göre
yerleşen parçalar üretir. İki parça türü:

- **Ray** (`LightRail`): bölüm boyunca dikey düz çizgi. Yüksekliği bölümün
  yüksekliği (ölçüm yok: parça bölümün `relative` çocuğu, `top:0;
  bottom:0`). SVG değil, iki `div`: base (sönük iz) ve charged (dolu kısım).
  Charged kısım `transform: scaleY()` ile `transform-origin: top` üzerinden
  büyür; yalnızca transform, kompozitörde. `height` ya da `clip-path`
  animasyonu kullanılmaz (her karede layout/boya). Renk ve kalınlık bugünkü
  cable-base / cable-charged değerleriyle aynı.
- **Dirsek** (`LightCurve`): bugünkü CableJoint'in kendisi. Geometri
  tablosu korunur; yalnızca start/end noktaları raya oturacak şekilde
  (x=0 ya da orta) yeniden ayarlanır. Işık başı üç kalınlıkta, halo statik.

Düğümler (cable-node) dirseklerin bittiği yerde, eyebrow hizasında, rayın
üstünde. Karar: baş geçince yanar ve yanık kalır (`both` dolgusu; geri
kaydırmada zaman çizelgesi geri sardığı için tekrar söner, bu doğal). Dirsek
geometrisi hat modunda formülle üretilir: yan değişiyorsa iki ray arasında S
eğrisi, aynı yandaysa rayın sağına doğru bir çıkıntı (bugünkü hero→pain ve
console→automation hissi). Bugünkü dört kablonun kendi path'leri 1280
altında olduğu gibi kalır.

Katman sırası: hat içerik altında (z-index 0, bölüm arkaplanları saydam
olduğu için görünür; opak bölümlerde — Otomasyon, Süreç, Ücretlendirme,
Kapanış — ray o bölümün `relative` çocuğu olduğu için zeminin üstünde kalır).
Ambient alanla ilişki: hat alanın üstünde, metnin altında.

## 6. Zaman çizelgesi ayrıntıları

- Karar: okuma çizgisi üstten %45. Her parça kendi `view-timeline`'ına
  sahip; inset `45% 55%`. Baş hızı
  parçanın uzunluğuna göre değişir: ray yavaş (bölüm boyunca), dirsek hızlı
  (kısa kutu). Bu istenen etki: ışık düz yolda sakin, dönüşte canlı.
- Dirseklerde yol uzunluğu kutu yüksekliğinden büyük olduğu için head
  `stroke-dashoffset` ile (bugünkü gibi), raylarda `scaleY` ile ilerler.
  İkisi de `linear`, süreklilik korunur.
- Geri kaydırma: zaman çizelgesi tersine okunur, hat sönerek geri çekilir.
  Ek kod yok.
- `animation` kısa yazımı timeline/range'i sıfırlar; ikisi her zaman
  sonradan yazılır (effects.css kural 4).

## 7. Kademeler

| Durum | Davranış |
|---|---|
| ≥1280px, scroll timeline, hareket serbest | Tam hat: raylar + yedi dirsek, baş okuma çizgisinde, düğümler geçişte yanar ve yanık kalır |
| ≥1280px, scroll timeline yok (Firefox, Safari 26 öncesi) | Parça parça tek seferlik: her parça okuma çizgisine girince (IntersectionObserver, `rootMargin` ile aynı %45 çizgisi) 0,9 sn'lik kendi animasyonunu bir kez oynatır ve dolu kalır; InViewOnce ile. Geri kaydırmada geri sönme yok. |
| 1024–1279px | Ray yok. Bugünkü dört kablo aynen: scroll timeline varsa kaydırmayla, yoksa InViewOnce ile tek seferlik. |
| Telefon (768 altı) | Karar: bugünkü davranış aynen kalır; raylar yok, dört kablo scroll timeline varsa kaydırmayla, yoksa InViewOnce ile tek seferlik oynar. Canlıdaki telefon animasyonu geri alınmaz. |
| Hareketi azalt, data-fx="off", veri tasarrufu, az bellek | Statik: hat baştan sona dolu, düğümler yanık, baş yok. Bugünkü korumasız hal; içerik eksilmez. |

Korumasız (sunucu) hal her zaman tam ve okunur: hat dolu çizilir.

## 8. Performans bütçesi

- Her karede yeniden boyanan yalnızca okuma çizgisini kesen 1–2 parçadır;
  diğerleri kendi aralığının dışındadır (başlangıç ya da bitiş karesinde
  sabit).
- Raylar transform ile (kompozitör), dirsekler bugünkü maliyetle (küçük
  SVG, dashoffset boyası). Sayfa boyu tek dev SVG kullanılmaz: tek büyük
  katmanın her karede invalidasyonu bugünkü dört kablonun toplamından
  pahalı olur.
- Filtre yalnızca statik haloda (bugünkü gibi), animasyonlu filtre yok.
- Ölçüm: perf.mjs (kaydırma + fare), hedef ana dala göre kare süresi farkı
  yok, stil/boya süresi +%10 içinde.

## 9. Kararlar (2026-11-14)

1. Okuma çizgisi üstten %45.
2. Ray yalnızca 1280px ve üstünde; 1024–1279 arasında ray yok, bugünkü
   kablolar kalır.
3. faq→closing dirseğinin sağdan gelen hareketi korunur (SSS boyunca sağ
   ray, Ücretlendirme'den sağa yeni bir dirsek).
4. Düğümler baş geçtikten sonra yanık kalır.
5. Telefonda raylar gizli; dirsekler statik değil, bugünkü davranış aynen
   kalır (scroll timeline varsa kaydırmayla, yoksa InViewOnce ile tek
   seferlik).

## 10. Uygulama sırası (onaydan sonra)

1. `LightRail` (bölüm sarmalayıcısında) + CableJoint'e hat modu (≥1280
   için formül geometrili ikinci çizim; bugünkü çizim 1280 altında aynen).
   Üç yeni dirsek kimliği: rnd-process, process-differentiators,
   pricing-faq (1280 altında hiç çizilmez).
2. effects.css: `view-timeline-inset` ile okuma çizgisi, ray `scaleY`,
   dirsek dashoffset, düğüm `exit` aralığı; 42%/54% kuralları silinir.
3. Yedek yol: IO ile `data-live`, parça başına bir kez.
4. Kademeler: 1280 altında ray yok ve bugünkü kablolar birebir; statik hal
   kontrolü (data-fx="off" ile görsel karşılaştırma).
5. Ölçüm: 1440 / 1280 / 1100 / 390 ekran görüntüleri ve kısa kaydırma
   kaydı, 390'da kabloların canlı siteyle aynı oynadığının ölçümü, hareketi
   azalt görüntüsü, Firefox benzetimi (şerit animasyonları kapatılarak),
   kontrast değişmez (hat metin altında ve metinden uzakta).
