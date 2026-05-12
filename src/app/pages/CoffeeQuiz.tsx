import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Share2, RotateCcw, Sparkles } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { ProductCard } from "../components/ProductCard";
import { products, Product } from "../data/products";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { Link } from "react-router";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    scores: { [key: string]: number };
  }[];
}

interface QuizResult {
  product: Product;
  description: string;
  match: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Kahvenizi nasıl içmeyi tercih edersiniz?",
    options: [
      { text: "Sade, sütlü veya şekerli farketmez", scores: { bright: 2, balanced: 3, bold: 2 } },
      { text: "Kesinlikle sade", scores: { bright: 3, balanced: 1, bold: 2 } },
      { text: "Süt veya krema ile", scores: { bright: 1, balanced: 3, bold: 3 } },
      { text: "Tatlı tatlandırıcılarla", scores: { bright: 2, balanced: 3, bold: 1 } },
    ]
  },
  {
    id: 2,
    question: "Hangi tat profilini tercih edersiniz?",
    options: [
      { text: "Çiçeksi ve meyvemsi", scores: { bright: 3, balanced: 1, bold: 0 } },
      { text: "Çikolatalı ve fındıklı", scores: { bright: 0, balanced: 2, bold: 3 } },
      { text: "Karamelli ve tatlı", scores: { bright: 1, balanced: 3, bold: 2 } },
      { text: "Topraklı ve baharatlı", scores: { bright: 0, balanced: 1, bold: 3 } },
    ]
  },
  {
    id: 3,
    question: "Kahve asitliği hakkında ne düşünüyorsunuz?",
    options: [
      { text: "Parlak asiditeyi severim", scores: { bright: 3, balanced: 1, bold: 0 } },
      { text: "Orta asidite tercihim", scores: { bright: 1, balanced: 3, bold: 1 } },
      { text: "Düşük asidite isterim", scores: { bright: 0, balanced: 1, bold: 3 } },
      { text: "Asidite umurumda değil", scores: { bright: 2, balanced: 2, bold: 2 } },
    ]
  },
  {
    id: 4,
    question: "Kahvenizin gövdesini nasıl istersiniz?",
    options: [
      { text: "Hafif ve çay benzeri", scores: { bright: 3, balanced: 1, bold: 0 } },
      { text: "Orta gövdeli", scores: { bright: 1, balanced: 3, bold: 1 } },
      { text: "Dolgun ve kremalı", scores: { bright: 0, balanced: 1, bold: 3 } },
      { text: "Şurup kıvamında", scores: { bright: 0, balanced: 0, bold: 3 } },
    ]
  },
  {
    id: 5,
    question: "Kahvenizi genellikle ne zaman içersiniz?",
    options: [
      { text: "Sabah, enerjik başlamak için", scores: { bright: 3, balanced: 2, bold: 1 } },
      { text: "Öğleden sonra, odaklanmak için", scores: { bright: 2, balanced: 3, bold: 2 } },
      { text: "Akşam, keyif için", scores: { bright: 1, balanced: 2, bold: 3 } },
      { text: "Gün boyu sürekli", scores: { bright: 2, balanced: 3, bold: 2 } },
    ]
  },
  {
    id: 6,
    question: "Demleme yönteminiz hangisi?",
    options: [
      { text: "Pour Over / V60", scores: { bright: 3, balanced: 2, bold: 0 } },
      { text: "Espresso", scores: { bright: 1, balanced: 2, bold: 3 } },
      { text: "French Press", scores: { bright: 0, balanced: 2, bold: 3 } },
      { text: "Filtre Kahve Makinesi", scores: { bright: 2, balanced: 3, bold: 1 } },
    ]
  },
];

const productMapping = {
  bright: "ethiopian-yirgacheffe",
  balanced: "colombia-supremo",
  bold: "sumatra-mandheling"
};

export function CoffeeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({
    bright: 0,
    balanced: 0,
    bold: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (optionIndex: number) => {
    const option = questions[currentQuestion].options[optionIndex];
    setSelectedAnswer(optionIndex);

    setTimeout(() => {
      // Update scores
      const newAnswers = { ...answers };
      Object.entries(option.scores).forEach(([key, value]) => {
        newAnswers[key] += value;
      });
      setAnswers(newAnswers);

      // Move to next question or show result
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const getResult = (): QuizResult => {
    const maxScore = Math.max(...Object.values(answers));
    const winningProfile = Object.entries(answers).find(([_, score]) => score === maxScore)?.[0] || "balanced";

    const productId = productMapping[winningProfile as keyof typeof productMapping];
    const product = products.find(p => p.id === productId) || products[0];

    const descriptions = {
      bright: "Parlak ve canlı kahveler sizin tarzınız! Çiçeksi notalar ve meyve aromalarıyla dolu, enerjik sabahlar için mükemmel.",
      balanced: "Dengeli ve uyumlu kahveler tam size göre! Hem tatlılık hem de karmaşıklık arayanlar için ideal seçim.",
      bold: "Cesur ve dolgun gövdeli kahveler favoriniz! Yoğun aromalar ve derin tatlar sizi bekliyor."
    };

    return {
      product,
      description: descriptions[winningProfile as keyof typeof descriptions],
      match: Math.round((maxScore / (questions.length * 3)) * 100)
    };
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({ bright: 0, balanced: 0, bold: 0 });
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const shareResult = () => {
    const result = getResult();
    const text = `KAVEN Kahve Quiz'inde %${result.match} eşleşme ile "${result.product.name}" bana önerildi! 🎉☕`;

    if (navigator.share) {
      navigator.share({
        title: 'KAVEN Kahve Quiz Sonucum',
        text: text,
        url: window.location.href
      }).catch(() => {
        // Fallback to copying
        navigator.clipboard.writeText(text);
        toast.success("Sonuç panoya kopyalandı!");
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Sonuç panoya kopyalandı!");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const result = showResult ? getResult() : null;

  return (
    <PageTransition>
      <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
        {/* Background Beano */}
        <motion.div
          className="absolute left-[5%] top-[10%] w-40 h-40 opacity-[0.03]"
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute right-[8%] bottom-[10%] w-32 h-32 opacity-[0.03]"
          animate={{ y: [0, 25, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative z-10">
          {!showResult ? (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full mb-6 border border-[var(--border)]">
                  <Sparkles className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  <span className="text-sm text-[var(--espresso)] font-medium">Kahve Kişilik Testi</span>
                </div>
                <h1 className="mb-4">Hangi Kahve Senin İçin?</h1>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "18px" }}>
                  Birkaç basit soru ile size en uygun kahveyi keşfedin
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    Soru {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="text-sm font-medium text-[var(--espresso)]">
                    %{Math.round(progress)}
                  </span>
                </div>
                <div className="h-2 bg-[var(--cream)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--gold)] to-[#D4BA7A]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[var(--radius-2xl)] p-8 md:p-12 border border-[var(--border)]"
                  style={{ boxShadow: "var(--shadow-lg)" }}
                >
                  <h2 className="mb-8 text-[var(--espresso)] text-center">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-5 rounded-[var(--radius-xl)] border-2 text-left transition-all flex items-center justify-between group ${
                          selectedAnswer === index
                            ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                            : "bg-[var(--cream)] text-[var(--espresso)] border-[var(--border)] hover:border-[var(--gold)]"
                        }`}
                      >
                        <span className="font-medium">{option.text}</span>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                            selectedAnswer === index ? "text-white" : "text-[var(--gold)]"
                          }`}
                          strokeWidth={2}
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            /* Result */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Result Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-block mb-6"
                >
                  <div className="relative">
                    <div className="w-32 h-32 bg-white rounded-full p-6 mx-auto" style={{ boxShadow: "var(--shadow-xl)" }}>
                      <img src={beanoLogo} alt="Beano" className="w-full h-full object-contain" />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-16 h-16 bg-[var(--gold)] rounded-full flex items-center justify-center text-white font-bold"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      {result?.match}%
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  Sizin Kahveniz!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[var(--muted-foreground)] max-w-xl mx-auto"
                  style={{ fontSize: "18px", lineHeight: "var(--leading-relaxed)" }}
                >
                  {result?.description}
                </motion.p>
              </div>

              {/* Product Result */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                {result && <ProductCard product={result.product} />}
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={shareResult}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-colors"
                  style={{ boxShadow: "var(--shadow-md)" }}
                >
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                  Sonucu Paylaş
                </button>

                <button
                  onClick={restart}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-[var(--border)] text-[var(--espresso)] rounded-full hover:bg-[var(--cream)] transition-colors"
                >
                  <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
                  Tekrar Dene
                </button>

                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--gold)] text-white rounded-full hover:bg-[#D4BA7A] transition-colors"
                >
                  Tüm Kahveleri Gör
                  <ChevronRight className="w-5 h-5" strokeWidth={2} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
