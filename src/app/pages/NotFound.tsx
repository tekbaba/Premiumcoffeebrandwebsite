import { Link } from "react-router";
import { Home } from "lucide-react";
import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";

export function NotFound() {
  return (
    <PageTransition>
    <div className="min-h-screen flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-md"
      >
        <motion.div
          className="relative inline-flex p-8 bg-[var(--cream)] rounded-full"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <motion.img
            src={beanoLogo}
            alt="Beano"
            className="w-20 h-20 object-contain"
            animate={{
              rotate: [0, -15, 15, -15, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Confused expression indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--gold)] rounded-full flex items-center justify-center text-white text-xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ?
          </motion.div>
        </motion.div>

        <h1 className="text-[var(--espresso)]" style={{ fontSize: "96px" }}>
          404
        </h1>

        <div className="space-y-3">
          <h2 className="text-[var(--espresso)]">Sayfa Bulunamadı</h2>
          <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)" }}>
            Bu sayfa kahve molasına çıktı ve geri dönmedi.
          </p>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-all shadow-lg"
          >
            <Home className="w-5 h-5" strokeWidth={1.5} />
            Ana Sayfaya Dön
          </Link>
        </motion.div>
      </motion.div>
    </div>
    </PageTransition>
  );
}
