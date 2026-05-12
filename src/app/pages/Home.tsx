import { Link } from "react-router";
import { ArrowRight, Award, Heart, Sparkles, Book, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { useRef } from "react";

export function Home() {
  const featuredProducts = products.slice(0, 3);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.6]);

  return (
    <PageTransition>
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--cream)] via-[#F0E6DB] to-[#E8DDD1]"
        style={{ paddingTop: "var(--navbar-height)", position: "relative" }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649276705773-59e693f1e2c0?w=1920')] bg-cover bg-center" />
        </div>

        {/* Decorative Elements - More Beano Characters */}
        <motion.div
          className="absolute left-[5%] top-[15%] w-28 h-28 md:w-40 md:h-40 opacity-10"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute right-[8%] top-[18%] w-20 h-20 md:w-32 md:h-32 opacity-8"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute left-[15%] bottom-[20%] w-16 h-16 md:w-24 md:h-24 opacity-12"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute right-[12%] bottom-[28%] w-24 h-24 md:w-36 md:h-36 opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -12, 0, 12, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute left-[25%] top-[30%] w-12 h-12 md:w-20 md:h-20 opacity-6"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute right-[20%] bottom-[15%] w-14 h-14 md:w-22 md:h-22 opacity-8"
          animate={{
            y: [0, 22, 0],
            rotate: [0, -18, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* Gradient Overlays for Depth */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--cream)] to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#E8DDD1] to-transparent opacity-40" />

        <motion.div
          className="relative z-10 text-center px-5 md:px-20 max-w-5xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-lg rounded-full mb-10 border border-white/40"
            style={{ boxShadow: "0 8px 32px rgba(200, 169, 106, 0.15)" }}
          >
            <motion.img
              src={beanoLogo}
              alt="Beano"
              className="w-7 h-7 object-contain"
              animate={{
                rotate: [0, 15, 0, -15, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-sm text-[var(--espresso)] font-semibold tracking-wide">Beano ile Güçlendirilmiştir</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
            className="mb-8 relative"
            style={{
              fontSize: "clamp(44px, 10vw, 96px)",
              lineHeight: "1.1",
              fontWeight: 400,
              letterSpacing: "-0.02em"
            }}
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[var(--espresso)] via-[#3D2E28] to-[var(--espresso)] bg-clip-text text-transparent">
                Kahve için
              </span>
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-[var(--gold)] via-[#D4BA7A] to-[var(--gold)] bg-clip-text text-transparent font-serif">
                Bir Sığınak
              </span>
              {/* Decorative underline */}
              <motion.div
                className="absolute -bottom-3 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: "128px", x: "-50%" }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-14 text-[var(--muted-foreground)] max-w-xl mx-auto"
            style={{ fontSize: "22px", lineHeight: "var(--leading-relaxed)", fontWeight: 400 }}
          >
            Kahveyi yaşayanlar için özenle hazırlanmıştır.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(51, 37, 32, 0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, type: "spring" }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 px-12 py-5 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-all shadow-xl font-medium"
                style={{ fontSize: "18px" }}
              >
                Kahveleri Keşfet
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/guide"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white/60 backdrop-blur-md text-[var(--espresso)] rounded-full border border-[var(--border)] hover:bg-white/80 transition-all shadow-md font-medium"
                style={{ fontSize: "18px" }}
              >
                Kahve Rehberi
                <Book className="w-5 h-5" strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-[var(--espresso)]/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="px-5 md:px-20" style={{ paddingTop: "var(--spacing-12)", paddingBottom: "var(--spacing-12)" }}>
        <div className="max-w-[var(--container-max)] mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              Öne Çıkan Seçkiler
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[var(--muted-foreground)] max-w-xl mx-auto"
              style={{ fontSize: "18px" }}
            >
              Dünyanın en iyi bölgelerinden özenle seçilmiş kahveler
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--border)] text-[var(--espresso)] rounded-full hover:bg-white transition-all"
              >
                Tüm Kahveleri Görüntüle
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-5 md:px-20 bg-white relative overflow-hidden" style={{ paddingTop: "var(--spacing-15)", paddingBottom: "var(--spacing-15)" }}>
        {/* Background Beano */}
        <motion.div
          className="absolute left-[5%] top-[15%] w-32 h-32 opacity-[0.03]"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute right-[8%] bottom-[20%] w-40 h-40 opacity-[0.03]"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -12, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <div className="max-w-[var(--container-max)] mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              KAVEN Farkı
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Kalite",
                description: "Ödüllü çiftliklerden doğrudan tedarik edilen en kaliteli çekirdekler.",
              },
              {
                icon: Heart,
                title: "Özenle Kavrulmuş",
                description: "Küçük parti kavurma ile her çekirdek tam potansiyeline ulaşır.",
              },
              {
                icon: Sparkles,
                title: "Sürdürülebilir",
                description: "Etik tedarik ve çevresel sorumluluk taahhüdü.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4 p-8 bg-[var(--cream)] rounded-[var(--radius-2xl)]"
              >
                <div className="inline-flex p-4 bg-white rounded-[var(--radius-xl)]">
                  <item.icon className="w-7 h-7 text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--espresso)]">
                  {item.title}
                </h3>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide CTA Section */}
      <section className="px-5 md:px-20 bg-white" style={{ paddingTop: "var(--spacing-12)", paddingBottom: "var(--spacing-12)" }}>
        <div className="max-w-[var(--container-max)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link to="/guide">
                <div className="p-8 bg-gradient-to-br from-[var(--cream)] to-[#E8DDD1] rounded-[var(--radius-2xl)] border border-[var(--border)] h-full transition-all" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white rounded-[var(--radius-xl)]">
                      <Book className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="mb-2 text-[var(--espresso)] group-hover:text-[var(--gold)] transition-colors">
                        Kahve Rehberi
                      </h3>
                      <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)" }}>
                        Demleme teknikleri, kahve terimleri ve uzman ipuçları
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--espresso)] group-hover:text-[var(--gold)] transition-colors" style={{ fontSize: "var(--text-small)" }}>
                    <span className="font-medium">Öğrenmeye Başla</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link to="/contact">
                <div className="p-8 bg-gradient-to-br from-[var(--espresso)] to-[#5D4A4A] text-white rounded-[var(--radius-2xl)] h-full transition-all" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white/10 rounded-[var(--radius-xl)]">
                      <Mail className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="mb-2 text-white group-hover:text-[var(--gold)] transition-colors">
                        İletişime Geçin
                      </h3>
                      <p className="text-white/80" style={{ fontSize: "var(--text-small)" }}>
                        Sorularınız için bize ulaşın
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white group-hover:text-[var(--gold)] transition-colors" style={{ fontSize: "var(--text-small)" }}>
                    <span className="font-medium">Mesaj Gönderin</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
    </PageTransition>
  );
}
