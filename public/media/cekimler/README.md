# cekimler

Müşteriler için sahada çekilmiş gerçek Reels'ler. Yapay zekâ animasyonu buraya
girmez.

Her çekim için iki dosya:

- `<isletme>-web.mp4`
- `<isletme>-poster.jpg`

Ham kayıttan üretmek için:

```bash
scripts/web-video.sh ham-kayit.mp4 isletme-1 public/media/cekimler
```

Dosyaları ekledikten sonra kaydı `src/content/cekimler.ts` içine `izin: true`
ile yazın. İzinli ve dosyası yerinde olan çekim sayısı üçe ulaşmadan bölüm
görünmez.
