/** Genel iletişim (mailto ve metinlerde kullanılır) */
export const SITE_EMAIL = "info@kavencoffee.net";

/** Marka adı (başlık ve meta etiketleri) */
export const SITE_NAME = "KAVEN Kahve";

/**
 * Kanonik site adresi (SEO, Open Graph).
 * Üretimde `VITE_SITE_URL` ile özelleştirin; yoksa varsayılan kullanılır.
 */
export const SITE_URL = (() => {
  const raw = typeof import.meta !== "undefined" ? import.meta.env?.VITE_SITE_URL : undefined;
  const s = typeof raw === "string" && raw.trim() ? raw.trim() : "https://kavencoffee.net";
  return s.replace(/\/$/, "");
})();

export function mailtoHref(subject: string, body: string): string {
  const q = new URLSearchParams();
  q.set("subject", subject);
  q.set("body", body);
  return `mailto:${SITE_EMAIL}?${q.toString()}`;
}
