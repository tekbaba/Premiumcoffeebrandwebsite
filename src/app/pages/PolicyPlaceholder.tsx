import { Link } from "react-router";
import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";

interface PolicyPlaceholderProps {
  title: string;
}

/** Yasal / bilgi sayfası: yalnızca başlık; metin eklenmeyecek (footer’dan erişim). */
export function PolicyPlaceholder({ title }: PolicyPlaceholderProps) {
  return (
    <PageTransition>
      <div
        className="min-h-screen px-5 md:px-20"
        style={{
          paddingTop: "calc(var(--navbar-height) + var(--spacing-12))",
          paddingBottom: "var(--spacing-12)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-2xl">
          <Link
            to="/"
            className="inline-flex text-[var(--muted-foreground)] transition-colors hover:text-[var(--espresso)]"
            style={{ fontSize: "var(--text-small)" }}
          >
            ← Ana sayfa
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-[var(--espresso)]"
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </PageTransition>
  );
}

export function KargoTakipPage() {
  return <PolicyPlaceholder title="Kargo Takip" />;
}

export function TeslimatVeIadePage() {
  return <PolicyPlaceholder title="Teslimat ve İade Politikası" />;
}

export function MesafeliSatisSozlesmesiPage() {
  return <PolicyPlaceholder title="Mesafeli Satış Sözleşmesi" />;
}
