import { Link } from "react-router";
import { motion } from "motion/react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { Instagram, Facebook, Twitter } from "lucide-react";
import kavenLogoWhite from "../../imports/kaven_logo-2.png";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { SITE_EMAIL, mailtoHref } from "../config/site";

export function Footer() {
  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim();
    if (!email) {
      toast.error("E-posta adresinizi girin", { duration: 2500, closeButton: true });
      return;
    }
    window.location.href = mailtoHref(
      "Bülten aboneliği",
      `Merhaba,\n\nBültene katılmak istiyorum.\n\nE-posta: ${email}\n`
    );
  };

  return (
    <footer
      className="w-full overflow-x-hidden bg-[var(--espresso)] text-white px-5 md:px-20"
      style={{
        marginTop: "var(--spacing-15)",
        paddingTop: "var(--spacing-12)",
        paddingBottom: "max(var(--spacing-8), env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Newsletter Section */}
        <div className="mb-12 border-b border-white/10 pb-12">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h3 className="font-serif text-3xl text-white">Bültene Katılın</h3>
            <p className="text-white/80" style={{ fontSize: "var(--text-body)" }}>
              Yeni ürünlerimizden ve kahve makalelerinden haberdar olmak için bültenimize katılın.
            </p>
            <form
              aria-label="Bülten aboneliği"
              onSubmit={handleNewsletter}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="E-posta adresiniz"
                aria-label="Bülten için e-posta adresiniz"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
              <motion.button
                type="submit"
                className="whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 font-medium text-[var(--espresso)] transition-colors hover:bg-[#D4BA7A]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Abone Ol
              </motion.button>
            </form>
          </div>
        </div>

        {/* Main Content — Marka | Keşfet | Kurumsal | Destek */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6 lg:gap-10">
          {/* Brand */}
          <div className="min-w-0 space-y-5">
            <Link to="/" className="inline-flex items-center">
              <motion.img
                src={kavenLogoWhite}
                alt="KAVEN"
                className="h-12 w-auto max-w-[220px] object-contain object-left"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <p
              className="max-w-sm text-white/70"
              style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}
            >
              Kahve severler için bir sığınak. Özenle hazırlanmış.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <motion.img
                src={beanoLogo}
                alt="Beano"
                className="h-5 w-5 object-contain"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-xs font-medium text-white/80">Beano ile Güçlendirilmiştir</span>
            </div>
          </div>

          {/* Keşfet */}
          <div className="min-w-0">
            <h4 className="mb-4 font-serif" style={{ fontSize: "18px" }}>
              Keşfet
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-white/70 transition-colors hover:text-white"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  Tüm Kahveler
                </Link>
              </li>
              <li>
                <Link
                  to="/guide"
                  className="text-white/70 transition-colors hover:text-white"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  Kahve Rehberi
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/70 transition-colors hover:text-white"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div className="min-w-0">
            <h4 className="mb-4 font-serif text-white" style={{ fontSize: "18px" }}>
              Kurumsal
            </h4>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/kargo-takip"
                    className="text-white/70 transition-colors hover:text-white"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    Kargo takip
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-white/70 transition-colors hover:text-white"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    Sıkça sorulan sorular
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teslimat-ve-iade"
                    className="text-white/70 transition-colors hover:text-white"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    Teslimat ve iade politikası
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-white/70 transition-colors hover:text-white"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    Gizlilik politikası
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mesafeli-satis-sozlesmesi"
                    className="text-white/70 transition-colors hover:text-white"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    Mesafeli satış sözleşmesi
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="min-w-0">
            <h4 className="mb-4 font-serif" style={{ fontSize: "18px" }}>
              Destek
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 transition-colors hover:text-white"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-white/70 transition-colors hover:text-white"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-white/70 transition-colors hover:text-white"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom - Social & Copyright */}
        <div className="flex w-full flex-col items-stretch gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-white/50 md:text-left" style={{ fontSize: "12px" }}>
            © 2026 KAVEN Kahve. Beano ile güçlendirilmiştir.
          </p>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="mb-3 text-center text-sm text-white/70 md:text-right">Bizi Takip Edin</h4>
            <div className="flex items-center justify-center gap-3 md:justify-end">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram'da KAVEN (harici bağlantı)"
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-5 w-5 text-white" strokeWidth={1.5} />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook'ta KAVEN (harici bağlantı)"
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-5 w-5 text-white" strokeWidth={1.5} />
              </motion.a>
              <motion.a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok'ta KAVEN (harici bağlantı)"
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)'da KAVEN (harici bağlantı)"
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-5 w-5 text-white" strokeWidth={1.5} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
