import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Coffee, CreditCard, MapPin, Package, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "../components/PageTransition";
import { Price } from "../components/Price";
import { useCart } from "../contexts/CartContext";

type Step = 1 | 2 | 3;

export function CheckoutDemo() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paidTotal, setPaidTotal] = useState(0);

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      navigate("/shop", { replace: true });
      toast.info("Sepet boş", {
        description: "Önce mağazadan ürün ekleyin.",
        duration: 2600,
        closeButton: true,
      });
    }
  }, [cart.length, navigate, step]);

  const runDemoPayment = () => {
    setSubmitting(true);
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    window.setTimeout(() => {
      setPaidTotal(total);
      setOrderId(`KVN-${Date.now().toString(36).toUpperCase().slice(-8)}`);
      clearCart();
      setSubmitting(false);
      setStep(3);
      toast.success("Demo ödeme tamamlandı", {
        description: "Gerçek tahsilat yapılmadı.",
        duration: 3200,
        closeButton: true,
      });
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) {
    return null;
  }

  return (
    <PageTransition>
      <div
        className="min-h-screen px-5 md:px-20"
        style={{
          paddingTop: "calc(var(--navbar-height) + var(--spacing-12))",
          paddingBottom: "var(--spacing-12)",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--espresso)]"
              style={{ fontSize: "var(--text-small)" }}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Mağazaya dön
            </Link>
          </div>

          <div className="mb-6 rounded-[var(--radius-xl)] border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
            <span className="inline-flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
              Demo ödeme
            </span>
            <p className="mt-1 text-xs text-amber-900/80">
              Bu akış yalnızca deneme amaçlıdır. Kart bilgisi sunucuya gitmez, gerçek tahsilat yapılmaz.
            </p>
          </div>

          {/* Step indicator */}
          <div className="mb-10 flex items-center justify-center gap-2">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    step >= n ? "bg-[var(--espresso)] text-white" : "bg-[var(--cream)] text-[var(--muted-foreground)] border border-[var(--border)]"
                  }`}
                >
                  {n === 3 ? <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> : n}
                </div>
                {n < 3 && <div className={`h-0.5 w-8 md:w-14 ${step > n ? "bg-[var(--espresso)]" : "bg-[var(--border)]"}`} />}
              </div>
            ))}
          </div>
          <p className="mb-8 text-center text-xs text-[var(--muted-foreground)]">
            {step === 1 && "Sipariş özeti"}
            {step === 2 && "Teslimat ve ödeme (demo)"}
            {step === 3 && "Tamamlandı"}
          </p>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-white p-6 md:p-8"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <h1 className="mb-2 text-[var(--espresso)]">Sipariş özeti</h1>
                <p className="mb-6 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)" }}>
                  Aşağıdaki ürünler demo ödemeye dahil edilecek.
                </p>
                <ul className="mb-6 space-y-3">
                  {cart.map((item) => (
                    <li
                      key={`${item.product.id}-${item.brewMethod}-${item.weight}`}
                      className="flex gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--cream)]/50 p-3"
                    >
                      <img
                        src={item.product.image}
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-[var(--espresso)]">{item.product.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                          <Coffee className="h-3 w-3 text-[var(--gold)]" strokeWidth={1.5} />
                          {item.weight} · {item.brewMethod} · ×{item.quantity}
                        </p>
                        <Price amount={item.price * item.quantity} className="mt-1" style={{ fontSize: "14px" }} />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mb-6 flex justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-[var(--muted-foreground)]">Toplam</span>
                  <Price amount={cartTotal} className="text-lg" style={{ fontSize: "18px" }} />
                </div>
                <motion.button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full rounded-full bg-[var(--espresso)] py-4 font-medium text-white transition-colors hover:bg-[#2A2020]"
                  style={{ boxShadow: "var(--shadow-md)" }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Devam et
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-white p-6 md:p-8"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <h1 className="mb-6 text-[var(--espresso)]">Teslimat ve ödeme</h1>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--espresso)]">
                      <MapPin className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.5} />
                      Adres (demo)
                    </label>
                    <input
                      readOnly
                      defaultValue="Beşiktaş, İstanbul — Demo adres"
                      className="w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--cream)] px-4 py-3 text-sm text-[var(--espresso)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--espresso)]">
                      <CreditCard className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.5} />
                      Kart (demo)
                    </label>
                    <input
                      readOnly
                      defaultValue="4242 4242 4242 4242 — sahte"
                      className="w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--cream)] px-4 py-3 text-sm text-[var(--espresso)]"
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                  Gerçek bir ödeme ağ geçidi bağlanmadı; &quot;Demo ödemeyi tamamla&quot; yalnızca animasyon gösterir.
                </p>
                <motion.button
                  type="button"
                  disabled={submitting}
                  onClick={runDemoPayment}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--espresso)] py-4 font-medium text-white transition-colors hover:bg-[#2A2020] disabled:opacity-70"
                  style={{ boxShadow: "var(--shadow-md)" }}
                  whileHover={submitting ? {} : { y: -2 }}
                  whileTap={submitting ? {} : { scale: 0.98 }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                      İşleniyor…
                    </>
                  ) : (
                    <>
                      <Package className="h-5 w-5" strokeWidth={1.5} />
                      Demo ödemeyi tamamla — <Price amount={cartTotal} className="text-white" style={{ fontSize: "15px" }} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {step === 3 && orderId && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-white p-8 text-center"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600"
                >
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
                </motion.div>
                <h1 className="mb-2 text-[var(--espresso)]">Teşekkürler!</h1>
                <p className="mb-6 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)" }}>
                  Demo siparişiniz kaydedildi. Sipariş no: <strong className="text-[var(--espresso)]">{orderId}</strong>
                </p>
                <div className="mb-8 flex justify-center">
                  <Price amount={paidTotal} style={{ fontSize: "18px" }} />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--espresso)] transition-colors hover:bg-[var(--cream)]"
                  >
                    Alışverişe devam
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--espresso)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2A2020]"
                  >
                    Ana sayfa
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
