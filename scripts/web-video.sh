#!/usr/bin/env bash
#
# Bir ham video kaydından siteye girecek iki dosyayı üretir:
#   <ad>-web.mp4     720p, hedef 2 MB altı, hızlı başlayan (faststart)
#   <ad>-poster.jpg  1. saniyeden kare, 720px genişlik, jpg kalite ~80
#
# Siteye yalnızca bu iki dosya girer; orijinal kayıt depoya konmaz
# (public/media/.gitignore orijinalleri zaten dışarıda tutar).
#
# Kullanım:
#   scripts/web-video.sh ham-kayit.mp4 isletme-1 public/media/cekimler
#   scripts/web-video.sh derdi-anlatan.mov derdi-anlatan public/media/reels
#
#   1) ham kayıt   2) çıktı adı (uzantısız)   3) hedef klasör (varsayılan: .)

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg bulunamadı. macOS'ta: brew install ffmpeg" >&2
  exit 1
fi

if [ "$#" -lt 2 ]; then
  echo "Kullanım: $0 <ham-video> <cikti-adi> [hedef-klasor]" >&2
  exit 1
fi

GIRDI="$1"
AD="$2"
HEDEF="${3:-.}"

if [ ! -f "$GIRDI" ]; then
  echo "Girdi dosyası yok: $GIRDI" >&2
  exit 1
fi

mkdir -p "$HEDEF"

VIDEO="$HEDEF/$AD-web.mp4"
POSTER="$HEDEF/$AD-poster.jpg"

echo "→ 720p web sürümü: $VIDEO"
ffmpeg -y -i "$GIRDI" \
  -vf scale=720:-2 \
  -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  "$VIDEO"

# Poster 1. saniyeden. -q:v 4, mjpeg'de ~%80 kaliteye denk gelir.
echo "→ poster (1. saniye): $POSTER"
ffmpeg -y -ss 1 -i "$GIRDI" \
  -frames:v 1 \
  -vf scale=720:-2 \
  -q:v 4 \
  "$POSTER"

BOYUT=$(wc -c < "$VIDEO" | tr -d ' ')
MB=$(( BOYUT / 1048576 ))
printf '\n%s: %s bayt (~%s MB)\n' "$VIDEO" "$BOYUT" "$MB"
printf '%s: %s bayt\n' "$POSTER" "$(wc -c < "$POSTER" | tr -d ' ')"

if [ "$BOYUT" -gt 2097152 ]; then
  echo
  echo "UYARI: web sürümü 2 MB'ın üstünde." >&2
  echo "Videoyu kısaltın ya da -crf değerini 28-30 aralığına çekip tekrar deneyin." >&2
  exit 2
fi

echo "Tamam. Siteye yalnızca bu iki dosyayı ekleyin."
