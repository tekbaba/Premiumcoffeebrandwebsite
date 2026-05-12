import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag, Trash2, Coffee } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router";
import { Price } from "./Price";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, cartCount, cartTotal, addToCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col"
            style={{ boxShadow: "var(--shadow-xl)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[var(--espresso)]" strokeWidth={1.5} />
                <h2 className="text-[var(--espresso)]">Sepetim</h2>
                <span className="px-2.5 py-0.5 bg-[var(--gold)] text-white text-sm rounded-full font-medium">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--cream)] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--espresso)]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-24 h-24 bg-[var(--cream)] rounded-full flex items-center justify-center mb-6"
                  >
                    <ShoppingBag className="w-12 h-12 text-[var(--muted-foreground)]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="mb-2 text-[var(--espresso)]">Sepetiniz Boş</h3>
                  <p className="text-[var(--muted-foreground)] mb-6" style={{ fontSize: "var(--text-small)" }}>
                    Kahve koleksiyonumuzu keşfedin
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="px-6 py-3 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-colors"
                  >
                    Mağazaya Git
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 bg-[var(--cream)] rounded-[var(--radius-xl)] border border-[var(--border)]"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={onClose}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-[var(--radius-xl)]"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={onClose}
                          className="hover:text-[var(--gold)] transition-colors"
                        >
                          <h4 className="font-medium text-[var(--espresso)] mb-1 truncate">
                            {item.product.name}
                          </h4>
                        </Link>
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="w-3 h-3 text-[var(--gold)]" strokeWidth={1.5} />
                          <p className="text-[var(--espresso)] font-medium" style={{ fontSize: "11px" }}>
                            {item.weight} • {item.brewMethod}
                          </p>
                        </div>
                        <p className="text-[var(--muted-foreground)] mb-3" style={{ fontSize: "10px" }}>
                          {item.product.origin} • Öğütme: {item.grindSize}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  removeFromCart(item.product.id, item.brewMethod, item.weight);
                                  for (let i = 0; i < item.quantity - 1; i++) {
                                    addToCart(item.product, item.brewMethod, item.weight);
                                  }
                                } else {
                                  removeFromCart(item.product.id, item.brewMethod, item.weight);
                                }
                              }}
                              className="w-7 h-7 bg-white border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--espresso)] hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" strokeWidth={2} />
                            </button>
                            <span className="w-8 text-center font-medium text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item.product, item.brewMethod, item.weight)}
                              className="w-7 h-7 bg-white border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--espresso)] hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" strokeWidth={2} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <Price amount={item.price * item.quantity} style={{ fontSize: "15px" }} />
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.brewMethod, item.weight)}
                        className="flex-shrink-0 w-8 h-8 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-red-500" strokeWidth={1.5} />
                      </button>
                    </motion.div>
                  ))}

                  {/* Clear Cart */}
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Sepeti Temizle
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Total & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-[var(--border)] p-6 space-y-4 bg-[var(--cream)]">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[var(--muted-foreground)]">Ara Toplam</span>
                  <Price amount={cartTotal} style={{ fontSize: "16px" }} />
                </div>

                {/* Free Shipping Notice */}
                {cartTotal < 200 ? (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800">
                      <strong>
                        <Price amount={Math.max(0, 200 - cartTotal)} className="text-amber-950" style={{ fontSize: "12px" }} />
                      </strong>{" "}
                      daha ekleyin, ücretsiz kargo kazanın!
                    </p>
                    <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(cartTotal / 200) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      ✓ Ücretsiz kargo kazandınız!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-all font-medium"
                  style={{ boxShadow: "var(--shadow-md)" }}
                  onClick={() => {
                    onClose();
                    navigate("/checkout");
                  }}
                >
                  Ödemeye Geç — <Price amount={cartTotal} className="text-white" style={{ fontSize: "16px" }} />
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full py-3 text-[var(--espresso)] hover:text-[var(--gold)] transition-colors text-sm font-medium"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
