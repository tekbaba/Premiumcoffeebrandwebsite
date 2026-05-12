import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { products } from "../data/products";
import { ArrowLeft, ShoppingCart, Coffee, Flame } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { useCart, BrewMethod } from "../contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { BrewMethodSelector } from "../components/BrewMethodSelector";
import { ProductReviews } from "../components/ProductReviews";
import { Price } from "../components/Price";
import { getSeoForProduct } from "../config/seo";

export function ProductDetail() {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const [selectedBrewMethod, setSelectedBrewMethod] = useState<BrewMethod | undefined>();
  const [selectedWeight, setSelectedWeight] = useState<"250g" | "500g" | "1kg">("250g");
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  // Get price for selected weight variant
  const selectedVariant = product?.variants.find(v => v.weight === selectedWeight);
  const displayPrice = selectedVariant?.price || product?.price || 0;

  if (!product) {
    return (
      <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="mb-4">Ürün Bulunamadı</h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--espresso)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            Mağazaya Dön
          </Link>
        </div>
      </div>
      </PageTransition>
    );
  }

  const productPath = `/product/${product.id}`;
  const metaDesc =
    product.description.length > 158
      ? `${product.description.slice(0, 155).trimEnd()}…`
      : product.description;
  const seo = getSeoForProduct(productPath, product.name);
  const productSeo = { ...seo, description: metaDesc };

  return (
    <PageTransition>
    <Helmet prioritizeSeoTags>
      <title>{productSeo.title}</title>
      <meta name="description" content={productSeo.description} />
      <link rel="canonical" href={productSeo.canonical} />
      <meta property="og:title" content={productSeo.title} />
      <meta property="og:description" content={productSeo.description} />
      <meta property="og:url" content={productSeo.canonical} />
      <meta name="twitter:title" content={productSeo.title} />
      <meta name="twitter:description" content={productSeo.description} />
    </Helmet>
    <div className="min-h-screen px-5 md:px-20" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-8))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
      <div className="max-w-[var(--container-max)] mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors"
            style={{ fontSize: "var(--text-small)" }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Mağazaya Dön
          </Link>
        </motion.div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--cream)] border border-[var(--border)] relative"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover ${!product.inStock ? 'grayscale opacity-60' : ''}`}
            />

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                <motion.div
                  className="px-8 py-4 bg-[var(--espresso)] text-white rounded-full border-2 border-white/20"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="font-medium text-lg">Stokta Yok</span>
                </motion.div>
              </div>
            )}
            {/* Beano Badge - Animated Quality Seal */}
            <motion.div
              className="absolute top-6 right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center p-3"
              style={{ boxShadow: "0 8px 32px rgba(200, 169, 106, 0.3)" }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
                y: [0, -10, 0],
              }}
              transition={{
                scale: { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                rotate: { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
              whileHover={{
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.8 }
              }}
            >
              <img
                src={beanoLogo}
                alt="Beano Onaylı"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Quality Badge Label */}
            <motion.div
              className="absolute top-28 right-4 px-3 py-1 bg-[var(--gold)] text-white rounded-full text-xs font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              Beano Onaylı
            </motion.div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Meta */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1 bg-[var(--cream)] text-[var(--espresso)] rounded-full border border-[var(--border)]" style={{ fontSize: "12px" }}>
                  {product.category}
                </span>
                <span className="text-[var(--muted-foreground)] uppercase tracking-wider" style={{ fontSize: "12px", fontWeight: 500 }}>
                  {product.origin}
                </span>
              </div>

              <h1 className="text-[var(--espresso)]">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <Price amount={displayPrice} className="font-medium" style={{ fontSize: "48px" }} />
                <span className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)" }}>
                  {selectedWeight} paket
                </span>
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-red-700">Stokta Yok</span>
                </motion.div>
              )}
            </div>

            {/* Tasting Notes */}
            <div className="space-y-3">
              <h3 className="text-[var(--espresso)]">Tat Notları</h3>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-2 bg-white border border-[var(--border)] text-[var(--espresso)] rounded-full"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Roast Level */}
            <div className="flex items-center gap-3 p-4 bg-[var(--cream)] rounded-[var(--radius-xl)]">
              <Flame className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="text-[var(--espresso)]" style={{ fontSize: "var(--text-small)" }}>
                Kavurma Seviyesi: <strong>{product.roastLevel}</strong>
              </span>
            </div>

            {/* Brew Methods */}
            <div className="space-y-3">
              <h3 className="text-[var(--espresso)]">Demleme Yöntemleri</h3>
              <div className="flex flex-wrap gap-2">
                {product.brewMethods.map((method) => (
                  <div
                    key={method}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--border)] rounded-full"
                  >
                    <Coffee className="w-4 h-4 text-[var(--gold)]" strokeWidth={1.5} />
                    <span className="text-[var(--espresso)]" style={{ fontSize: "var(--text-small)" }}>
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                {product.description}
              </p>
            </div>

            {/* Brew Method and Weight Selection */}
            {product.inStock && (
              <div className="pt-6 border-t border-[var(--border)] mt-6">
                <BrewMethodSelector
                  onSelect={setSelectedBrewMethod}
                  selectedMethod={selectedBrewMethod}
                  showWeight={true}
                  onWeightSelect={setSelectedWeight}
                  selectedWeight={selectedWeight}
                />
              </div>
            )}

            {/* CTA */}
            <div className="space-y-3 pt-4">
              <motion.button
                onClick={() => {
                  if (product.inStock) {
                    if (!selectedBrewMethod) {
                      toast.info("Demleme yöntemi seçin", {
                        duration: 2200,
                        closeButton: true
                      });
                      return;
                    }
                    addToCart(product, selectedBrewMethod, selectedWeight);
                    setShowAdded(true);
                    toast.success("Sepete eklendi", {
                      description: `${selectedWeight} · ${selectedBrewMethod}`,
                      duration: 2600,
                      closeButton: true
                    });
                    setTimeout(() => setShowAdded(false), 3000);
                  } else {
                    toast.error("Stokta yok", {
                      description: "Yakında tekrar gelir.",
                      duration: 3200,
                      closeButton: true
                    });
                  }
                }}
                disabled={!product.inStock}
                className={`w-full px-8 py-4 rounded-full flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-[var(--espresso)] text-white hover:bg-[#2A2020]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={{
                  boxShadow: product.inStock ? "var(--shadow-lg)" : "none",
                  transition: "all var(--transition-base) var(--ease-out)"
                }}
                whileHover={product.inStock ? { y: -4, boxShadow: "var(--shadow-xl)" } : {}}
                whileTap={product.inStock ? { scale: 0.98 } : {}}
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                {showAdded ? '✓ Sepete Eklendi!' : product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
              </motion.button>
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] pt-2">
              <Coffee className="w-4 h-4 text-[var(--gold)]" strokeWidth={1.5} />
              <span style={{ fontSize: "12px" }}>
                Siparişe göre taze kavrulur • 200₺ üzeri ücretsiz kargo
              </span>
            </div>
          </motion.div>
        </div>

        {/* Customer Reviews */}
        <ProductReviews productId={product.id} />

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="mb-8">İlgili Ürünler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
