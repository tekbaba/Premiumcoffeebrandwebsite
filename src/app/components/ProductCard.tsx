import { Link } from "react-router";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "../data/products";
import { motion, AnimatePresence } from "motion/react";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlist } from "../contexts/WishlistContext";
import { Price } from "./Price";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showAdded, setShowAdded] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) {
      toast.error("Stokta yok", {
        description: "Yakında tekrar gelir.",
        duration: 2800,
        closeButton: true
      });
      return;
    }

    // Redirect to product detail page for brew method selection
    toast.info("Demleme için ürün sayfasına gidin", {
      duration: 2200,
      closeButton: true
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Favorilerden çıkarıldı", {
        duration: 2000,
        closeButton: true
      });
    } else {
      addToWishlist(product);
      toast.success("Favorilere eklendi", {
        duration: 2000,
        closeButton: true
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className="group bg-white rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)] hover:border-[var(--espresso)]/20 relative"
        style={{
          boxShadow: "var(--shadow-sm)",
          transition: "all var(--transition-base) var(--ease-out)"
        }}
        whileHover={{
          y: -8,
          boxShadow: "var(--shadow-xl)"
        }}
      >
        {/* Image - 4:3 aspect ratio */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
          <motion.img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover ${!product.inStock ? 'grayscale opacity-60' : ''}`}
            whileHover={{ scale: product.inStock ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="px-6 py-3 bg-[var(--espresso)] text-white rounded-full border-2 border-white/20"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="font-medium text-sm">Stokta Yok</span>
              </motion.div>
            </motion.div>
          )}

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm z-10 border transition-colors ${
              inWishlist
                ? 'bg-red-500 border-red-600 text-white'
                : 'bg-white/90 border-white/20 text-[var(--espresso)] hover:bg-red-50 hover:border-red-200'
            }`}
            style={{
              boxShadow: "var(--shadow-md)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
              strokeWidth={1.5}
            />
          </motion.button>

          {/* Beano Badge - floating and animated */}
          <motion.div
            className="absolute top-3 right-3 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center p-2"
            style={{
              boxShadow: "var(--shadow-lg)",
            }}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
              y: [0, -8, 0],
            }}
            transition={{
              scale: { delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              rotate: { delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { delay: 0.3, duration: 0.3 },
              y: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }
            }}
            whileHover={{
              scale: 1.15,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >
            <img
              src={beanoLogo}
              alt="Beano Onaylı"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Added to Cart Notification */}
          <AnimatePresence>
            {showAdded && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-[var(--gold)]/90 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-white text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingCart className="w-12 h-12 mx-auto mb-2" strokeWidth={1.5} />
                  </motion.div>
                  <p className="font-medium">Sepete Eklendi!</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content - consistent padding */}
        <div className="p-6 space-y-3">
          {/* Origin & Name */}
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1 font-medium">
              {product.origin}
            </p>
            <h3 className="text-[var(--espresso)] group-hover:text-[var(--gold)]"
              style={{
                fontSize: "var(--text-h3)",
                transition: "color var(--transition-base) var(--ease-out)"
              }}
            >
              {product.name}
            </h3>
          </div>

          {/* Tasting Notes - consistent badge style */}
          <div className="flex flex-wrap gap-2">
            {product.tastingNotes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-[var(--cream)] text-[var(--espresso)] rounded-full border border-[var(--border)]"
                style={{ fontSize: "12px" }}
              >
                {note}
              </span>
            ))}
          </div>

          {/* Price & CTA - aligned */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <Price amount={product.price} style={{ fontSize: "28px" }} />
              {!product.inStock && (
                <p className="text-xs text-red-600 mt-1">Tükendi</p>
              )}
            </div>
            <motion.button
              className={`p-3 rounded-full transition-all ${
                product.inStock
                  ? 'bg-[var(--espresso)] text-white hover:bg-[#2A2020]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{
                transition: "background-color var(--transition-base) var(--ease-out)"
              }}
              whileHover={product.inStock ? { scale: 1.08 } : {}}
              whileTap={product.inStock ? { scale: 0.95 } : {}}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
