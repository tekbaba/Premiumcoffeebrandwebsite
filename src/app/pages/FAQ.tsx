import { motion } from "motion/react";
import { ChevronDown, HelpCircle, Coffee, Package, CreditCard, Truck } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    { id: "general", label: "Genel Sorular", icon: HelpCircle },
    { id: "coffee", label: "Kahve Hakkında", icon: Coffee },
    { id: "order", label: "Sipariş & Ödeme", icon: CreditCard },
    { id: "shipping", label: "Kargo & Teslimat", icon: Truck },
  ];

  const faqs: FAQItem[] = [
    {
      category: "general",
      question: "KAVEN nedir?",
      answer: "KAVEN, özenle seçilmiş specialty kahveleri kahve severlere ulaştıran bir online kahve platformudur. Dünya çapında kaliteli kahve çekirdeklerini Türkiye'ye getiriyor ve taze kavurulmuş olarak kapınıza kadar ulaştırıyoruz."
    },
    {
      category: "general",
      question: "Kahveleriniz taze mi?",
      answer: "Evet! Tüm kahvelerimiz sipariş üzerine kavrulur ve kavrulma tarihinden itibaren maksimum 3-5 gün içinde size ulaşır. Her paketin üzerinde kavurma tarihi belirtilir."
    },
    {
      category: "general",
      question: "Beano nedir?",
      answer: "Beano, KAVEN'in sevimli kahve çekirdeği maskotudur! Tüm kahvelerimiz Beano'nun kalite onayından geçer ve en taze, en lezzetli kahveleri size sunduğumuzdan emin oluruz."
    },
    {
      category: "coffee",
      question: "Hangi öğütme metodunu seçmeliyim?",
      answer: "Öğütme metodu, kullandığınız demleme yöntemine göre değişir. Espresso için çok ince, V60 için orta-ince, French Press için kaba öğütme önerilir. Eğer evde değirmeniniz varsa, 'Çekirdek' seçeneğini tercih edip demlemeden hemen önce öğütmenizi öneririz."
    },
    {
      category: "coffee",
      question: "Kahve çekirdeklerimi nasıl saklamalıyım?",
      answer: "Kahve çekirdeklerini hava geçirmez, opak bir kapta, serin ve kuru bir yerde saklayın. Buzdolabında saklamayın çünkü nem zararlıdır. Kavurma tarihinden sonra 2-4 hafta içinde tüketmenizi öneririz."
    },
    {
      category: "coffee",
      question: "Arabica ve Robusta arasındaki fark nedir?",
      answer: "Arabica daha yumuşak, aromatik ve karmaşık tat profiline sahipken düşük kafein içerir. Robusta ise daha güçlü, acı ve yoğun tada sahip, yüksek kafein içeriklidir. Arabica genellikle daha kaliteli ve premium kahveler için tercih edilir."
    },
    {
      category: "coffee",
      question: "250gr, 500gr veya 1kg hangi gramajı seçmeliyim?",
      answer: "250gr yaklaşık 15-20 fincan, 500gr 30-40 fincan, 1kg ise 60-80 fincan kahve yapabilir. Günde 1-2 fincan içiyorsanız 250gr bir ay yeter. Sık kahve tüketenler veya aileler için 500gr veya 1kg daha ekonomik olabilir."
    },
    {
      category: "order",
      question: "Siparişimi nasıl takip edebilirim?",
      answer: "Siparişiniz kargoya verildikten sonra, e-posta adresinize kargo takip numarası gönderilir. Bu numara ile kargo şirketinin web sitesinden paketinizi takip edebilirsiniz."
    },
    {
      category: "order",
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer: "Kredi kartı, banka kartı ve havale/EFT ile ödeme alıyoruz. Tüm ödeme işlemleri güvenli SSL sertifikası ile şifrelenir."
    },
    {
      category: "order",
      question: "Siparişimi iptal edebilir miyim?",
      answer: "Sipariş kargoya verilmeden önce iptal edebilirsiniz. Kargoya verildikten sonra iade prosedürü başlatmanız gerekir. Müşteri hizmetleri ile iletişime geçerek iptal talebinizi iletebilirsiniz."
    },
    {
      category: "order",
      question: "İade ve değişim politikanız nedir?",
      answer: "Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Ürün kullanılmamış ve orijinal ambalajında olmalıdır. İade kargo ücreti size aittir."
    },
    {
      category: "shipping",
      question: "Kargo ücreti ne kadar?",
      answer: "200 TL ve üzeri alışverişlerde kargo ücretsizdir. 200 TL altı siparişlerde kargo ücreti 30 TL'dir."
    },
    {
      category: "shipping",
      question: "Ne kadar sürede teslim alırım?",
      answer: "Siparişler aynı gün kargoya verilir (saat 14:00'e kadar verilen siparişler için). Teslimat süresi bölgenize göre 1-3 iş günü arasında değişir."
    },
    {
      category: "shipping",
      question: "Yurtdışına gönderim yapıyor musunuz?",
      answer: "Şu anda sadece Türkiye içi gönderim yapıyoruz. Uluslararası kargo seçenekleri için info@kavencoffee.net adresinden bize ulaşabilirsiniz."
    },
    {
      category: "shipping",
      question: "Teslimat adresimi değiştirebilir miyim?",
      answer: "Sipariş kargoya verilmeden önce adres değişikliği yapabilirsiniz. Kargoya verildikten sonra kargo şirketi ile iletişime geçmeniz gerekir."
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("general");

  const filteredFAQs = faqs.filter(faq => faq.category === selectedCategory);

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

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full mb-6 border border-[var(--border)]">
              <HelpCircle className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="text-sm text-[var(--espresso)] font-medium">Sıkça Sorulan Sorular</span>
            </div>
            <h1 className="mb-4">Size Nasıl Yardımcı Olabiliriz?</h1>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto" style={{ fontSize: "18px" }}>
              Aklınıza takılan sorulara burada yanıt bulabilirsiniz
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                      : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/40"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="font-medium text-sm">{cat.label}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-[var(--radius-2xl)] border border-[var(--border)] overflow-hidden"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--cream)] transition-colors"
                >
                  <h3 className="text-[var(--espresso)] pr-4" style={{ fontSize: "var(--text-h3)" }}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[var(--gold)] flex-shrink-0" strokeWidth={2} />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-8 bg-gradient-to-br from-[var(--espresso)] to-[#5D4A4A] text-white rounded-[var(--radius-2xl)] text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="mb-3 text-white">Sorunuz mu var?</h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Aradığınız cevabı bulamadınız mı? Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyar.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--gold)] text-[var(--espresso)] rounded-full hover:bg-[#D4BA7A] font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Package className="w-5 h-5" strokeWidth={1.5} />
                İletişime Geçin
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
