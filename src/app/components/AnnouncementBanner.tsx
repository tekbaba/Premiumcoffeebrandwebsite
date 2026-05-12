import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import beanoLogo from "../../imports/beano-removebg-preview.png";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-banner-dismissed", "true");
    window.dispatchEvent(new Event("kaven-announcement-dismissed"));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-40 min-h-[var(--announcement-banner-height)] overflow-hidden border-b border-[var(--espresso)]/10 bg-[var(--espresso)] text-[var(--cream)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(200,169,106,0.25),transparent_55%)]" />

          <div className="relative mx-auto flex min-h-[var(--announcement-banner-height)] max-w-[var(--container-max)] items-center gap-3 px-4 py-2 pl-3 pr-12 md:px-8 md:pr-16">
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15">
              <img src={beanoLogo} alt="" className="h-6 w-6 object-contain" aria-hidden />
              <Sparkles className="h-4 w-4 text-[var(--gold)]" strokeWidth={2} aria-hidden />
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)] md:text-xs">
                Hoş geldin hediyesi
              </p>
              <p className="truncate text-sm font-medium leading-snug md:text-[15px] md:leading-tight">
                <span className="text-white/95">İlk siparişine özel</span>{" "}
                <span className="text-[var(--gold)]">Beano anahtarlık</span>
                <span className="hidden text-white/80 sm:inline"> — sepetinde seni bekliyor.</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white md:right-5"
              aria-label="Duyuruyu kapat"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
