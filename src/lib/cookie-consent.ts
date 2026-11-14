/**
 * Çerez onayı tek yerde: localStorage anahtarı, okuma ve değişiklik aboneliği.
 * CookieBanner yazar, MetaPixel okur; ikisi de useSyncExternalStore ile
 * bağlanır, böylece effect içinde setState gerekmez (React Compiler kuralı)
 * ve sunucu HTML'i her zaman "onay yok" durumuyla çıkar.
 */

export const COOKIE_CONSENT_KEY = "fp-cookie-consent";
const CHANGE_EVENT = "cookie-consent-changed";

export type CookieConsent = "accepted" | "rejected" | null;

export function readCookieConsent(): CookieConsent {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(value: Exclude<CookieConsent, null>): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeCookieConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  // başka bir sekmede verilen karar
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export const getServerCookieConsent = (): CookieConsent => null;
