import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { blogPosts, blogCategories } from "../data/blogPosts";
import { PageTransition } from "../components/PageTransition";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import beanoLogo from "../../imports/beano-removebg-preview.png";

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredPosts = selectedCategory === "Tümü"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <PageTransition>
      <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
        {/* Background Beano */}
        <motion.div
          className="absolute right-[10%] top-[10%] w-48 h-48 opacity-[0.015]"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <div className="max-w-[var(--container-max)] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full mb-6 border border-[var(--border)]">
              <BookOpen className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="text-sm text-[var(--espresso)] font-medium">Kahve Blogu</span>
            </div>
            <h1 className="mb-4">Kahve Hikayeleri ve Rehberler</h1>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto" style={{ fontSize: "18px", lineHeight: "var(--leading-relaxed)" }}>
              Kahve dünyasından en güncel haberler, demleme rehberleri ve ipuçları.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full border transition-all ${
                    selectedCategory === category
                      ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                      : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/30"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                    {category}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Posts - Only shown when "Tümü" selected */}
          {selectedCategory === "Tümü" && featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="mb-6 flex items-center gap-2">
                <span>Öne Çıkan Makaleler</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                  >
                    <motion.article
                      className="group bg-white rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)] hover:border-[var(--espresso)]/20"
                      style={{ boxShadow: "var(--shadow-sm)" }}
                      whileHover={{ y: -8, boxShadow: "var(--shadow-xl)" }}
                    >
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-[var(--cream)]">
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-[var(--gold)] text-white text-xs rounded-full font-medium">
                            Öne Çıkan
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                          <span className="px-3 py-1 bg-[var(--cream)] rounded-full border border-[var(--border)]">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" strokeWidth={1.5} />
                            {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" strokeWidth={1.5} />
                            {post.readTime}
                          </div>
                        </div>

                        <h3 className="text-[var(--espresso)] group-hover:text-[var(--gold)] transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-[var(--gold)] pt-2">
                          <span className="text-sm font-medium">Devamını Oku</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-6">
              {selectedCategory === "Tümü" ? "Tüm Makaleler" : selectedCategory}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)] hover:border-[var(--espresso)]/20 h-full flex flex-col"
                    style={{ boxShadow: "var(--shadow-sm)" }}
                    whileHover={{ y: -6, boxShadow: "var(--shadow-lg)" }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--cream)]">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      {post.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-[var(--gold)] text-white text-xs rounded-full font-medium">
                            Öne Çıkan
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                        <span className="px-2.5 py-0.5 bg-[var(--cream)] rounded-full border border-[var(--border)]">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" strokeWidth={1.5} />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-[var(--espresso)] group-hover:text-[var(--gold)] transition-colors" style={{ fontSize: "18px" }}>
                        {post.title}
                      </h3>

                      <p className="text-[var(--muted-foreground)] flex-1" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                        {post.excerpt.length > 120 ? `${post.excerpt.slice(0, 120)}…` : post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {post.author.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[var(--gold)]">
                          <span className="text-xs font-medium">Oku</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[var(--muted-foreground)]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[var(--espresso)]">Makale Bulunamadı</h3>
                <p className="text-[var(--muted-foreground)]">
                  Bu kategoride henüz makale yok.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
