@AGENTS.md

# Kalıcı etiketler

- `src/app/layout.tsx` kök metadata'sındaki `verification.other["facebook-domain-verification"]`
  Meta (Facebook) alan adı doğrulaması için KALICIDIR. Layout veya metadata düzenlemelerinde
  silinmez, taşınmaz, JS ile üretilmez; statik `<head>` içinde kalmalıdır
  (kontrol: `curl -s https://fourpointmedya.com | grep -o '<meta name="facebook-domain-verification"[^>]*>'`).
