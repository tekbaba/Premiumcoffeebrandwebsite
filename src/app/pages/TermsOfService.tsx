import { motion } from "motion/react";
import { FileText, CheckCircle, XCircle, AlertCircle, Scale } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";

export function TermsOfService() {
  return (
    <PageTransition>
      <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
        {/* Background Beano */}
        <motion.div
          className="absolute right-[5%] top-[8%] w-32 h-32 opacity-[0.02]"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full mb-6 border border-[var(--border)]">
              <FileText className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="text-sm text-[var(--espresso)] font-medium">Kullanım Koşulları</span>
            </div>
            <h1 className="mb-4">Kullanım Koşulları</h1>
            <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)" }}>
              Son güncelleme: 7 Mayıs 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[var(--radius-2xl)] p-8 md:p-12 border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <div className="prose prose-lg max-w-none space-y-8">
              {/* Introduction */}
              <section>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  KAVEN web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayın.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <Scale className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    1. Genel Koşullar
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p>KAVEN web sitesi ve hizmetleri, bu kullanım koşullarına tabidir. Sitemizi kullanarak:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>18 yaşında veya daha büyük olduğunuzu beyan edersiniz</li>
                    <li>Verdiğiniz bilgilerin doğru ve güncel olduğunu garanti edersiniz</li>
                    <li>Hesabınızın güvenliğinden sorumlu olduğunuzu kabul edersiniz</li>
                    <li>Siteyi yasalara uygun şekilde kullanacağınızı taahhüt edersiniz</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <CheckCircle className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    2. Sipariş ve Ödeme
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p><strong>Sipariş Onayı:</strong> Siparişiniz, ödemeniz onaylandıktan sonra tamamlanmış sayılır. Stok durumuna göre siparişlerinizi iptal etme hakkımız saklıdır.</p>
                  <p><strong>Fiyatlandırma:</strong> Web sitemizdeki fiyatlar TL cinsindendir ve KDV dahildir. Fiyatlar önceden haber verilmeksizin değiştirilebilir.</p>
                  <p><strong>Ödeme Güvenliği:</strong> Tüm ödemeler güvenli SSL şifrelemesi ile korunur. Kredi kartı bilgilerinizi saklamıyoruz.</p>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <AlertCircle className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    3. Teslimat
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p><strong>Teslimat Süresi:</strong> Siparişler genellikle 1-3 iş günü içinde teslim edilir. Kargo gecikmelerinden KAVEN sorumlu değildir.</p>
                  <p><strong>Kargo Ücreti:</strong> 200 TL ve üzeri alışverişlerde kargo ücretsizdir. Altında kalan siparişler için 30 TL kargo ücreti uygulanır.</p>
                  <p><strong>Teslimat Adresi:</strong> Lütfen teslimat adresinizin doğru olduğundan emin olun. Yanlış adres nedeniyle oluşan sorunlardan müşteri sorumludur.</p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <XCircle className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    4. İptal ve İade
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p><strong>İptal Hakkı:</strong> Kargoya verilmeden önce siparişinizi ücretsiz iptal edebilirsiniz.</p>
                  <p><strong>Cayma Hakkı:</strong> Teslimattan itibaren 14 gün içinde cayma hakkınızı kullanabilirsiniz.</p>
                  <p><strong>İade Koşulları:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Ürün kullanılmamış ve orijinal ambalajında olmalıdır</li>
                    <li>İade kargo ücreti müşteriye aittir</li>
                    <li>Gıda güvenliği nedeniyle açılmış paketler iade edilemez</li>
                    <li>İade onaylandıktan sonra 10 iş günü içinde ödeme iade edilir</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  5. Fikri Mülkiyet
                </h2>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  KAVEN web sitesindeki tüm içerik, logolar, tasarımlar ve materyaller KAVEN'in mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır. İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  6. Sorumluluk Reddi
                </h2>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p>KAVEN, aşağıdaki durumlardan sorumlu değildir:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kargo şirketinden kaynaklanan gecikmeler veya hasarlar</li>
                    <li>Yanlış adres nedeniyle oluşan teslimat sorunları</li>
                    <li>Site kesintileri veya teknik hatalar</li>
                    <li>Üçüncü taraf web sitelerinin içeriği</li>
                    <li>Mücbir sebepler (doğal afetler, savaş, pandemi vb.)</li>
                  </ul>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  7. Gizlilik
                </h2>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Kişisel bilgilerinizin nasıl toplandığı ve kullanıldığı hakkında detaylı bilgi için lütfen Gizlilik Politikamızı inceleyin.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  8. Değişiklikler
                </h2>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  KAVEN, bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı tutar. Önemli değişiklikler yapıldığında kullanıcılar bilgilendirilecektir. Sitemi kullanmaya devam ederek güncel koşulları kabul etmiş sayılırsınız.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  9. Uygulanacak Hukuk
                </h2>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlık durumunda İstanbul mahkemeleri ve icra daireleri yetkilidir.
                </p>
              </section>

              {/* Contact */}
              <section className="mt-8 p-6 bg-[var(--cream)] rounded-[var(--radius-xl)] border border-[var(--border)]">
                <h3 className="text-[var(--espresso)] mb-3" style={{ fontSize: "var(--text-h3)" }}>
                  İletişim
                </h3>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Kullanım koşulları hakkında sorularınız için:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-[var(--espresso)]"><strong>E-posta:</strong> <a href="mailto:info@kavencoffee.net" className="text-[var(--gold)] underline-offset-2 hover:underline">info@kavencoffee.net</a></p>
                  <p className="text-[var(--espresso)]"><strong>Telefon:</strong> +90 (212) 123 45 67</p>
                  <p className="text-[var(--espresso)]"><strong>Adres:</strong> Beşiktaş, İstanbul, Türkiye</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
