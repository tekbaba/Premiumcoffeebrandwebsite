import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { blogPosts } from "../data/blogPosts";
import { PageTransition } from "../components/PageTransition";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";
import { toast } from "sonner";
import { getSeoForBlogPost } from "../config/seo";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-5">
          <div className="text-center">
            <h2 className="mb-4">Makale Bulunamadı</h2>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--espresso)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
              Bloga Dön
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link panoya kopyalandı!");
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const blogPath = `/blog/${post.slug}`;
  const excerptDesc =
    post.excerpt.length > 158 ? `${post.excerpt.slice(0, 155).trimEnd()}…` : post.excerpt;
  const blogSeo = { ...getSeoForBlogPost(blogPath, post.title), description: excerptDesc };

  return (
    <PageTransition>
      <Helmet prioritizeSeoTags>
        <title>{blogSeo.title}</title>
        <meta name="description" content={blogSeo.description} />
        <link rel="canonical" href={blogSeo.canonical} />
        <meta property="og:title" content={blogSeo.title} />
        <meta property="og:description" content={blogSeo.description} />
        <meta property="og:url" content={blogSeo.canonical} />
        <meta name="twitter:title" content={blogSeo.title} />
        <meta name="twitter:description" content={blogSeo.description} />
      </Helmet>
      <div className="min-h-screen px-5 md:px-20" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-8))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors"
              style={{ fontSize: "var(--text-small)" }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Bloga Dön
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[var(--cream)] text-[var(--espresso)] rounded-full border border-[var(--border)] text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 bg-[var(--gold)] text-white rounded-full text-sm font-medium">
                  Öne Çıkan
                </span>
              )}
            </div>

            <h1 className="mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted-foreground)] mb-6">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-[var(--espresso)]">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                {post.readTime} okuma
              </div>
              <button
                type="button"
                aria-label="Yazıyı paylaş"
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
              >
                <Share2 className="w-4 h-4" strokeWidth={1.5} />
                Paylaş
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[var(--border)] rounded-full text-xs text-[var(--espresso)]"
                >
                  <Tag className="w-3 h-3" strokeWidth={1.5} />
                  {tag}
                </div>
              ))}
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-[var(--radius-2xl)] overflow-hidden"
            style={{ boxShadow: "var(--shadow-xl)" }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none mb-16"
            style={{
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--leading-relaxed)'
            }}
          >
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="text-[var(--espresso)] mt-12 mb-4" style={{ fontSize: "var(--text-h2)" }}>
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="text-[var(--espresso)] mt-8 mb-3" style={{ fontSize: "var(--text-h3)" }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-6">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split('\n');
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 mb-6">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              );
            })}
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 pt-12 border-t border-[var(--border)]"
            >
              <h2 className="mb-8">İlgili Makaleler</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                  >
                    <motion.article
                      className="group bg-white rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)]"
                      style={{ boxShadow: "var(--shadow-sm)" }}
                      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                    >
                      <div className="relative aspect-video overflow-hidden bg-[var(--cream)]">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                          <Clock className="w-3 h-3" strokeWidth={1.5} />
                          {relatedPost.readTime}
                        </div>
                        <h4 className="text-[var(--espresso)] group-hover:text-[var(--gold)] transition-colors text-sm font-medium">
                          {relatedPost.title}
                        </h4>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
