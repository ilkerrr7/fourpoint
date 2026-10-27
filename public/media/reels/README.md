# reels

"Tanıdık geldi mi?" bölümündeki animasyon sahnesi.

Beklenen dosyalar:

- `derdi-anlatan-web.mp4`
- `derdi-anlatan-poster.jpg`

Ham kayıttan üretmek için:

```bash
scripts/web-video.sh ham-kayit.mp4 derdi-anlatan public/media/reels
```

İkisi de yerindeyken video kartı kendiliğinden görünür; biri eksikken bölüm
alıntılarla devam eder, bozuk oynatıcı çıkmaz.
