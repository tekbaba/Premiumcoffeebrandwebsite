import { motion, AnimatePresence } from "motion/react";
import { Book, Coffee, Droplet, Thermometer, Clock, BookOpen, Lightbulb, HelpCircle, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import coffeeSchoolImage from "../../imports/3d640de6-b3a7-4bf5-af79-6f5792b67c0c__1_.png";
import { useState } from "react";
import { Link } from "react-router";

export function Guide() {
  const [selectedCategory, setSelectedCategory] = useState<string>("brewing");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: "brewing", label: "Demleme Yöntemleri", icon: Coffee },
    { id: "terms", label: "Kahve Terimleri", icon: Book },
    { id: "types", label: "Kahve Türleri", icon: Droplet },
    { id: "tips", label: "Saklama & İpuçları", icon: Lightbulb },
    { id: "faq", label: "Sıkça Sorulanlar", icon: HelpCircle },
  ];

  const content: Record<string, any> = {
    brewing: [
      {
        title: "Pour Over (V60)",
        description: "El ile dökerek yapılan, hassas ve temiz kahve demleme yöntemi.",
        details: [
          "Su sıcaklığı: 92-96°C",
          "Öğütme: Orta-ince",
          "Demleme süresi: 2.5-3 dakika",
          "Kahve/Su oranı: 1:16"
        ],
        difficulty: "Orta"
      },
      {
        title: "French Press",
        description: "Dolgun gövdeli, zengin aromalı kahve için ideal yöntem.",
        details: [
          "Su sıcaklığı: 93-96°C",
          "Öğütme: Kaba",
          "Demleme süresi: 4 dakika",
          "Kahve/Su oranı: 1:15"
        ],
        difficulty: "Kolay"
      },
      {
        title: "Espresso",
        description: "Basınç altında hızlı demlenen, yoğun ve kremalı kahve.",
        details: [
          "Su sıcaklığı: 90-96°C",
          "Öğütme: Çok ince",
          "Demleme süresi: 25-30 saniye",
          "Basınç: 9 bar"
        ],
        difficulty: "İleri"
      },
      {
        title: "Chemex",
        description: "Temiz ve parlak bir fincan için filtre kahve yöntemi.",
        details: [
          "Su sıcaklığı: 92-96°C",
          "Öğütme: Orta-kaba",
          "Demleme süresi: 3.5-4.5 dakika",
          "Kahve/Su oranı: 1:17"
        ],
        difficulty: "Orta"
      },
      {
        title: "Aeropress",
        description: "Hızlı, temiz ve çok yönlü demleme metodu.",
        details: [
          "Su sıcaklığı: 80-92°C",
          "Öğütme: İnce-orta",
          "Demleme süresi: 1-2 dakika",
          "Basınç: Elle uygulanan"
        ],
        difficulty: "Kolay"
      },
      {
        title: "Türk Kahvesi",
        description: "Geleneksel, köpüklü ve yoğun Türk kahvesi.",
        details: [
          "Su sıcaklığı: Kaynama noktası",
          "Öğütme: Çok ince (pudra)",
          "Demleme süresi: 2-3 dakika",
          "Cezve kullanılır"
        ],
        difficulty: "Orta"
      }
    ],
    terms: [
      {
        title: "Acidity (Asidite)",
        description: "Kahvenin canlılığını ve parlaklığını veren karakteristik. Limon, elma gibi meyvemsi notalar."
      },
      {
        title: "Body (Gövde)",
        description: "Kahvenin ağızdaki hissi ve ağırlığı. Hafif, orta veya dolgun olabilir."
      },
      {
        title: "Crema",
        description: "Espresso üzerinde oluşan kahverengi köpük tabakası. Taze kahvenin göstergesi."
      },
      {
        title: "Single Origin",
        description: "Tek bir ülke, bölge veya çiftlikten gelen kahve çekirdekleri."
      },
      {
        title: "Blend (Harman)",
        description: "Farklı kökenlerden kahvelerin dengeli tat profili için karıştırılması."
      },
      {
        title: "Cupping",
        description: "Kahve tadım ve değerlendirme süreci. Profesyonel kahve test yöntemi."
      },
      {
        title: "Bloom",
        description: "Demleme başlangıcında kahvenin CO2 salarak kabardığı aşama."
      },
      {
        title: "Extraction (Ekstraksiyon)",
        description: "Suyun kahve çekirdeğinden aromaları çıkarma işlemi. İdeal: %18-22."
      },
      {
        title: "Tasting Notes",
        description: "Kahvede algılanan tat ve aroma profilleri (çikolata, meyve, çiçek vb.)"
      },
      {
        title: "Roast Level",
        description: "Kahvenin kavurma derecesi: Açık, orta, orta-koyu veya koyu."
      }
    ],
    types: [
      {
        title: "Arabica",
        description: "Dünyanın en yaygın kahve türü. Yumuşak, aromatik ve karmaşık tat profili.",
        origin: "Etiyopya kökenli",
        characteristics: ["Düşük kafein", "Yüksek asidite", "Tatlı ve meyve notaları"]
      },
      {
        title: "Robusta",
        description: "Güçlü, acı ve yoğun tat. Yüksek kafein içeriği.",
        origin: "Orta Afrika kökenli",
        characteristics: ["Yüksek kafein", "Düşük asidite", "Fındık ve çikolata notaları"]
      },
      {
        title: "Kolombiya Kahvesi",
        description: "Dengeli, orta gövdeli ve hafif asiditeye sahip. Kolombiya'nın zengin topraklarının ürünü.",
        origin: "Kolombiya",
        characteristics: ["Karamel tatlılık", "Fındık notaları", "Dengeli profil"]
      },
      {
        title: "Etiyopya Kahvesi",
        description: "Kahvenin doğduğu yer. Çiçeksi, meyvemsi ve çay benzeri aromalara sahip.",
        origin: "Etiyopya",
        characteristics: ["Çiçeksi aroma", "Narenciye notaları", "Parlak asidite"]
      },
      {
        title: "Brezilya Kahvesi",
        description: "Dünyanın en büyük kahve üreticisi. Fındık, çikolata ve karamel notaları.",
        origin: "Brezilya",
        characteristics: ["Düşük asidite", "Çikolata ve fındık", "Dolgun gövde"]
      },
      {
        title: "Kenya Kahvesi",
        description: "Parlak asidite ve meyvemsi tat profili. Şarap benzeri kompleks yapı.",
        origin: "Kenya",
        characteristics: ["Yüksek asidite", "Frenk üzümü", "Şarap benzeri"]
      },
      {
        title: "Guatemala Kahvesi",
        description: "Volkanik topraklarda yetişen, zengin ve baharatlı kahve.",
        origin: "Guatemala",
        characteristics: ["Dumanlı aroma", "Kakao notaları", "Orta-dolgun gövde"]
      },
      {
        title: "Kosta Rika Kahvesi",
        description: "Temiz, parlak ve dengeli. Tropikal meyve ve bal notaları.",
        origin: "Kosta Rika",
        characteristics: ["Parlak asidite", "Bal tatlılık", "Temiz fincan"]
      },
      {
        title: "Sumatra Kahvesi",
        description: "Toprak notaları, dolgun gövde ve düşük asidite. Benzersiz yaş işleme yöntemi.",
        origin: "Endonezya",
        characteristics: ["Toprak aroması", "Bitter çikolata", "Düşük asidite"]
      },
      {
        title: "Jamaika Blue Mountain",
        description: "Dünyanın en pahalı kahvelerinden. Yumuşak, tatlı ve dengeli.",
        origin: "Jamaika",
        characteristics: ["Çok yumuşak", "Hafif asidite", "Tatlı profil"]
      },
      {
        title: "Hawaii Kona",
        description: "Premium kalite, yumuşak ve aromatik. Hawaii'nin volkanik topraklarında yetişir.",
        origin: "Hawaii",
        characteristics: ["Hafif gövde", "Tatlı aroma", "Düşük acılık"]
      },
      {
        title: "Yemen Mocha",
        description: "Antik kahve türü. Çikolata, baharat ve meyve notaları.",
        origin: "Yemen",
        characteristics: ["Çikolata notası", "Baharatlı", "Karmaşık profil"]
      }
    ],
    tips: [
      {
        title: "Doğru Saklama",
        description: "Kahve çekirdeklerini hava geçirmez, opak bir kapta, serin ve kuru bir yerde saklayın.",
        tips: [
          "Buzdolabında saklamayın - nem zararlıdır",
          "Güneş ışığından uzak tutun",
          "Kavurma tarihinden sonra 2-4 hafta içinde tüketin",
          "Çekirdeği satın alın, demlemeden hemen önce öğütün"
        ]
      },
      {
        title: "Su Kalitesi",
        description: "İyi kahve için iyi su şarttır. Filtrelenmiş veya kaynak suyu kullanın.",
        tips: [
          "Klorlu musluk suyu kullanmayın",
          "Mineral dengesi önemli (50-150 ppm TDS)",
          "Taze, oksijen bakımından zengin su",
          "Su sıcaklığını termometre ile kontrol edin"
        ]
      },
      {
        title: "Öğütme",
        description: "Taze öğütülmüş kahve her zaman daha iyidir. Demleme yöntemine uygun öğütün.",
        tips: [
          "Burr değirmeni kullanın (bıçaklı değil)",
          "Her demleme yöntemi için farklı öğütme",
          "Öğütme hemen önce yapın",
          "Tutarlı öğütme boyutu önemli"
        ]
      },
      {
        title: "Temizlik",
        description: "Ekipmanlarınızı düzenli temizleyin. Eski kahve yağları tadı bozar.",
        tips: [
          "Her kullanımdan sonra durulayın",
          "Haftada bir detaylı temizlik",
          "Kahve yağlarını temizlemek için özel temizleyici",
          "Su haznelerini kireçten arındırın"
        ]
      }
    ],
    faq: [
      {
        question: "Kahve çekirdekleri ne kadar süre taze kalır?",
        answer: "Kavurma tarihinden itibaren 2-4 hafta içinde tüketilmesi idealdir. Hava geçirmez kapta saklanan çekirdekler 1 aya kadar tazeliğini koruyabilir, ancak en iyi aromayı ilk 2 haftada verir."
      },
      {
        question: "Kahveyi buzdolabında saklamalı mıyım?",
        answer: "Hayır. Buzdolabı kahve için uygun değildir çünkü nem, koku ve sıcaklık değişimleri kahvenin kalitesini bozar. Serin, kuru ve karanlık bir yerde, oda sıcaklığında saklayın."
      },
      {
        question: "Öğütülmüş kahve ile çekirdek arasındaki fark nedir?",
        answer: "Öğütülmüş kahve hızla aromasını kaybeder. Çekirdek halinde alıp demlemeden hemen önce öğütmek, en taze ve lezzetli kahveyi sağlar. Öğütülmüş kahve maksimum 1 hafta içinde kullanılmalıdır."
      },
      {
        question: "Hangi demleme yöntemi en iyisidir?",
        answer: "En iyi yöntem, tercih ettiğiniz tat profiline bağlıdır. French Press dolgun gövdeli, Pour Over temiz ve parlak, Espresso yoğun kahve sağlar. Farklı yöntemler deneyin ve kendinize uygun olanı bulun."
      },
      {
        question: "Kahve/su oranı ne olmalı?",
        answer: "Genel kural olarak 1:15 ile 1:17 arası (1 gram kahve : 15-17 gram su) iyi bir başlangıç noktasıdır. Kişisel tercihlerinize göre ayarlayabilirsiniz. Daha güçlü için daha fazla kahve, daha hafif için daha fazla su kullanın."
      },
      {
        question: "Su sıcaklığı neden önemli?",
        answer: "Su sıcaklığı ekstraksiyon oranını etkiler. Çok sıcak (>96°C) acı tat, çok soğuk (<88°C) ekşi ve zayıf tat verir. İdeal aralık çoğu yöntem için 92-96°C arasındadır."
      },
      {
        question: "Açık kavurma mı koyu kavurma mı daha iyidir?",
        answer: "Kişisel tercih meselesidir. Açık kavurma daha fazla köken karakteri ve asidite, koyu kavurma daha az asidite ve daha fazla kavurma karakteri (karamel, çikolata) gösterir. Her ikisini de deneyin."
      },
      {
        question: "Organik kahve neden önemli?",
        answer: "Organik kahve, kimyasal pestisit ve gübre kullanılmadan yetiştirilir. Hem çevre dostu hem de daha saf bir tat profili sunar. Ayrıca kahve çiftçilerinin sağlığını da korur."
      }
    ]
  };

  return (
    <PageTransition>
    <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
      {/* Background Beano */}
      <motion.div
        className="absolute right-[8%] top-[15%] w-40 h-40 opacity-[0.02]"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <div className="max-w-[var(--container-max)] mx-auto relative z-10">
        {/* Header with Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          {/* Hero Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white/50 backdrop-blur-md rounded-full border border-[var(--border)]"
              >
                <motion.img
                  src={beanoLogo}
                  alt="Beano"
                  className="w-6 h-6 object-contain"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="text-sm text-[var(--espresso)] font-medium">Beano'nun Kahve Okulu</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                Kahve Rehberi
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[var(--muted-foreground)] max-w-xl mx-auto lg:mx-0"
                style={{ fontSize: "18px", lineHeight: "var(--leading-relaxed)" }}
              >
                Kahve dünyasını keşfedin. Demleme teknikleri, terimler ve ipuçlarıyla mükemmel fincanı hazırlayın.
              </motion.p>
            </div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-[var(--radius-2xl)] overflow-hidden" style={{ boxShadow: "var(--shadow-xl)" }}>
                <img
                  src={coffeeSchoolImage}
                  alt="Beano'nun Kahve Okulu"
                  className="w-full h-auto object-cover"
                />
                {/* Gradient Overlay for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating Beano Decoration */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center p-4"
                style={{ boxShadow: "var(--shadow-xl)" }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src={beanoLogo}
                  alt="Beano"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                    : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/30"
                }`}
              >
                <cat.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory === "brewing" && content.brewing.map((item: any, index: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[var(--radius-2xl)] p-6 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[var(--espresso)]">{item.title}</h3>
                <span className="px-3 py-1 bg-[var(--cream)] text-[var(--espresso)] rounded-full text-xs font-medium">
                  {item.difficulty}
                </span>
              </div>
              <p className="text-[var(--muted-foreground)] mb-4" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                {item.description}
              </p>
              <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                {item.details.map((detail: string) => (
                  <div key={detail} className="flex items-center gap-2 text-[var(--muted-foreground)]" style={{ fontSize: "12px" }}>
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {selectedCategory === "terms" && content.terms.map((item: any, index: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[var(--radius-2xl)] p-6 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[var(--cream)] rounded-[var(--radius-xl)]">
                  <BookOpen className="w-4 h-4 text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--espresso)]">{item.title}</h3>
              </div>
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}

          {selectedCategory === "types" && content.types.map((item: any, index: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[var(--radius-2xl)] p-6 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <h3 className="text-[var(--espresso)] mb-2">{item.title}</h3>
              <p className="text-[var(--muted-foreground)] mb-3" style={{ fontSize: "var(--text-small)" }}>
                {item.description}
              </p>
              <p className="text-xs text-[var(--gold)] font-medium mb-3">{item.origin}</p>
              <div className="space-y-2 pt-3 border-t border-[var(--border)]">
                {item.characteristics.map((char: string) => (
                  <div key={char} className="flex items-center gap-2 text-[var(--muted-foreground)]" style={{ fontSize: "12px" }}>
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                    {char}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {selectedCategory === "tips" && content.tips.map((item: any, index: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[var(--radius-2xl)] p-6 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[var(--cream)] rounded-[var(--radius-xl)]">
                  <Lightbulb className="w-4 h-4 text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--espresso)]">{item.title}</h3>
              </div>
              <p className="text-[var(--muted-foreground)] mb-4" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                {item.description}
              </p>
              <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                {item.tips.map((tip: string) => (
                  <div key={tip} className="flex items-start gap-2 text-[var(--muted-foreground)]" style={{ fontSize: "12px" }}>
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-1.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {selectedCategory === "faq" && (
            <div className="col-span-full space-y-3">
              {content.faq.map((item: any, index: number) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[var(--cream)]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-[var(--cream)] rounded-lg flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-[var(--gold)]" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[var(--espresso)] font-medium" style={{ fontSize: "var(--text-body)" }}>
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-[var(--muted-foreground)] pl-11" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Brew Calculator Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--espresso)] to-[#5D4A4A] p-8 text-white"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-white">Demleme Hesaplayıcısı</h3>
              </div>
              <p className="text-white/80 mb-6" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                Mükemmel fincan için kahve/su oranını hesaplayın ve demleme sürenizi takip edin. Timer özelliği ile adım adım rehber.
              </p>
              <Link
                to="/brew-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--espresso)] rounded-full hover:bg-white/90 transition-colors font-medium"
              >
                Hesaplayıcıyı Aç
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>

          {/* Coffee Quiz Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--gold)] to-[#D4BA7A] p-8 text-white"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-white">Kahve Bulucu Quiz</h3>
              </div>
              <p className="text-white/90 mb-6" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                Hangi kahve sizin için? 6 soruluk eğlenceli testimizle kişiliğinize uygun kahveyi keşfedin. Sonuçları paylaşabilirsiniz!
              </p>
              <Link
                to="/coffee-quiz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--espresso)] rounded-full hover:bg-white/90 transition-colors font-medium"
              >
                Quiz'e Başla
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
