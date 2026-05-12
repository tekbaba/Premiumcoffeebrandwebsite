import { motion } from "motion/react";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";

export function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
        {/* Background Beano */}
        <motion.div
          className="absolute left-[5%] bottom-[10%] w-32 h-32 opacity-[0.02]"
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
              <Shield className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="text-sm text-[var(--espresso)] font-medium">Gizlilik Politikası</span>
            </div>
            <h1 className="mb-4">Gizlilik Politikası</h1>
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
                  KAVEN olarak, kişisel bilgilerinizin gizliliğini korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda kişisel bilgilerinizi nasıl topladığımızı, kullandığımızını ve koruduğumuzu açıklar.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <Database className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    1. Topladığımız Bilgiler
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p>Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Kişisel Bilgiler:</strong> İsim, e-posta adresi, telefon numarası, teslimat adresi</li>
                    <li><strong>Ödeme Bilgileri:</strong> Kredi kartı numarası ve fatura adresi (şifreli olarak saklanır)</li>
                    <li><strong>Sipariş Bilgileri:</strong> Satın alma geçmişi, ürün tercihleri</li>
                    <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, çerezler</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <Eye className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    2. Bilgilerinizi Nasıl Kullanırız
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Siparişlerinizi işleme almak ve teslimat yapmak</li>
                    <li>Müşteri hizmetleri desteği sağlamak</li>
                    <li>Ürün ve hizmetlerimizi geliştirmek</li>
                    <li>Pazarlama iletişimleri göndermek (izninizle)</li>
                    <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                    <li>Dolandırıcılık ve kötüye kullanımı önlemek</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <Lock className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    3. Bilgi Güvenliği
                  </h2>
                </div>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Kişisel bilgilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri kullanıyoruz. Tüm hassas veriler SSL şifrelemesi ile korunur ve güvenli sunucularda saklanır. Ancak, internet üzerinden veri iletiminin %100 güvenli olmadığını unutmayın.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--cream)] rounded-lg">
                    <Mail className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h2)" }}>
                    4. Bilgi Paylaşımı
                  </h2>
                </div>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p>Kişisel bilgilerinizi asla üçüncü şahıslara satmayız. Bilgilerinizi sadece şu durumlarda paylaşabiliriz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kargo şirketleri (teslimat için gerekli bilgiler)</li>
                    <li>Ödeme işlemcileri (güvenli ödeme işlemleri için)</li>
                    <li>Yasal makamlar (yasal gereklilikler durumunda)</li>
                    <li>Hizmet sağlayıcılar (gizlilik anlaşmaları altında)</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  5. Çerezler
                </h2>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Web sitemiz, kullanıcı deneyimini geliştirmek ve site kullanımını analiz etmek için çerezler kullanır. Tarayıcı ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz, ancak bu bazı site özelliklerinin çalışmamasına neden olabilir.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  6. Haklarınız
                </h2>
                <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kişisel verilerinize erişim hakkı</li>
                    <li>Kişisel verilerinizi düzeltme hakkı</li>
                    <li>Kişisel verilerinizi silme hakkı</li>
                    <li>İşlemeyi kısıtlama hakkı</li>
                    <li>Pazarlama iletişimlerinden çıkma hakkı</li>
                  </ul>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-[var(--espresso)] mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  7. Değişiklikler
                </h2>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler yapıldığında sizi bilgilendireceğiz. Güncel politikayı düzenli olarak kontrol etmenizi öneririz.
                </p>
              </section>

              {/* Contact */}
              <section className="mt-8 p-6 bg-[var(--cream)] rounded-[var(--radius-xl)] border border-[var(--border)]">
                <h3 className="text-[var(--espresso)] mb-3" style={{ fontSize: "var(--text-h3)" }}>
                  İletişim
                </h3>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                  Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak istiyorsanız bizimle iletişime geçebilirsiniz:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-[var(--espresso)]"><strong>E-posta:</strong> <a href="mailto:info@kavencoffee.net" className="text-[var(--gold)] underline-offset-2 hover:underline">info@kavencoffee.net</a> (gizlilik talepleri)</p>
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
