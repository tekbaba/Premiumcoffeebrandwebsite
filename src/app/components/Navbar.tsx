import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import kavenLogo from "../../imports/kaven_logo-1.png";
import { useCart } from "../contexts/CartContext";
import { CartDrawer } from "./CartDrawer";
import { SearchBar } from "./SearchBar";

function readAnnouncementOpen(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("announcement-banner-dismissed") !== "true";
}

export function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(readAnnouncementOpen);
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--announcement-offset",
      announcementOpen ? "var(--announcement-banner-height)" : "0px"
    );
  }, [announcementOpen]);

  useEffect(() => {
    const sync = () => setAnnouncementOpen(readAnnouncementOpen());
    window.addEventListener("kaven-announcement-dismissed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("kaven-announcement-dismissed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/shop", label: "Mağaza" },
    { to: "/guide", label: "Kahve Rehberi" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "Hakkımızda" },
    { to: "/contact", label: "İletişim" },
  ];

  return (
    <>
      <motion.nav
        aria-label="Birincil gezinme"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "var(--navbar-height)",
          top: "var(--announcement-offset)",
        }}
        className={`fixed left-0 right-0 z-50 transition-[top,background-color,border-color] duration-300 ${
          isScrolled
            ? "bg-[#F5EDE6]/90 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="h-full mx-auto px-5 md:px-20">
          <div className="flex items-center justify-between h-full max-w-[var(--container-max)] mx-auto gap-12">
            <Link to="/" className="flex items-center flex-shrink-0">
              <motion.img
                src={kavenLogo}
                alt="KAVEN"
                className="h-12 md:h-14"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group"
                >
                  <span className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    location.pathname === link.to
                      ? "text-[var(--espresso)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--espresso)]"
                  }`}>
                    {link.label}
                  </span>
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--espresso)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="w-80">
                <SearchBar />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <motion.button
                type="button"
                aria-label={`Sepeti aç${cartCount > 0 ? `, ${cartCount} ürün` : ""}`}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-[var(--espresso)]/5 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5 text-[var(--espresso)]" strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--gold)] text-white text-xs font-medium rounded-full flex items-center justify-center"
                      style={{ boxShadow: "var(--shadow-md)" }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                aria-label={isMobileSearchOpen ? "Aramayı kapat" : "Aramayı aç"}
                aria-expanded={isMobileSearchOpen}
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 hover:bg-[var(--espresso)]/5 rounded-lg transition-colors"
              >
                <Search className="w-6 h-6 text-[var(--espresso)]" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                aria-label={`Sepeti aç${cartCount > 0 ? `, ${cartCount} ürün` : ""}`}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-[var(--espresso)]/5 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-[var(--espresso)]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--gold)] text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-[var(--espresso)]/5 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[var(--espresso)]" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--espresso)]" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Search */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed left-0 right-0 z-40 border-b border-[var(--border)] bg-white p-4"
            style={{
              top: "calc(var(--announcement-offset) + var(--navbar-height))",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: "calc(var(--announcement-offset) + var(--navbar-height))" }}
          className="fixed inset-0 z-40 bg-[var(--cream)] md:hidden"
        >
          <div className="px-5 py-8 space-y-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Link
                  to={link.to}
                  className={`block text-base font-medium py-3 transition-colors ${
                    location.pathname === link.to
                      ? "text-[var(--espresso)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--espresso)]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
