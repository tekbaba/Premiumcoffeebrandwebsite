import type { Metric } from "web-vitals";

/**
 * Core Web Vitals ve TTFB: geliştirmede konsola yazar;
 * `VITE_METRICS_ENDPOINT` tanımlıysa JSON olarak POST eder (izleme / analitik entegrasyonu için).
 */
export function initWebVitals(): void {
  if (typeof window === "undefined") return;

  void import("web-vitals")
    .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const send = (metric: Metric) => {
        const endpoint = import.meta.env.VITE_METRICS_ENDPOINT as string | undefined;
        if (endpoint?.trim()) {
          void fetch(endpoint.trim(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...metric,
              path: window.location.pathname,
            }),
            keepalive: true,
          }).catch(() => {});
        } else if (import.meta.env.DEV) {
          console.info("[web-vitals]", metric.name, Math.round(metric.value), metric.rating ?? "");
        }
      };

      onCLS(send);
      onINP(send);
      onFCP(send);
      onLCP(send);
      onTTFB(send);
    })
    .catch(() => {});
}
