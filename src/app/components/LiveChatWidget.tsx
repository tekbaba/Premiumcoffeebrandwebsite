import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, HelpCircle, Clock, Mail } from "lucide-react";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { toast } from "sonner";
import { SITE_EMAIL } from "../config/site";

interface QuickQuestion {
  id: string;
  text: string;
  answer: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    id: "delivery",
    text: "Teslimat süresi ne kadar?",
    answer: "Siparişleriniz 1-3 iş günü içinde kargoya verilir. Teslimat 2-5 iş günü sürer."
  },
  {
    id: "stock",
    text: "Stokta olmayan ürünler ne zaman gelir?",
    answer: "Stokta olmayan ürünlerimiz genellikle 1-2 hafta içinde tekrar gelir. Size haber verelim mi?"
  },
  {
    id: "freshness",
    text: "Kahveler taze mi?",
    answer: "Tüm kahvelerimiz siparişe göre taze kavurulur ve maksimum tazelik için hava geçirmez ambalajda gönderilir."
  },
  {
    id: "return",
    text: "İade politikanız nedir?",
    answer: "Açılmamış ürünler 14 gün içinde iade edilebilir. Memnun kalmadıysanız bizimle iletişime geçin."
  },
];

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean; time: string }>>([
    {
      text: "Merhaba! KAVEN Kahve'ye hoş geldiniz. Size nasıl yardımcı olabilirim? ☕",
      isBot: true,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleQuickQuestion = (question: QuickQuestion) => {
    // Add user question
    const userMsg = {
      text: question.text,
      isBot: false,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // Simulate typing
    setIsTyping(true);

    // Add bot answer after delay
    setTimeout(() => {
      const botMsg = {
        text: question.answer,
        isBot: true,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getSmartResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    // Teslimat soruları
    if (lowerMessage.includes('teslimat') || lowerMessage.includes('kargo') || lowerMessage.includes('gönder')) {
      return "Siparişleriniz 1-3 iş günü içinde kargoya verilir. 200 TL üzeri alışverişlerde kargo ücretsizdir. Teslimat 2-5 iş günü sürer.";
    }

    // Fiyat soruları
    if (lowerMessage.includes('fiyat') || lowerMessage.includes('kaç para') || lowerMessage.includes('ücret')) {
      return "Kahve fiyatlarımız 710 TL ile 990 TL arasında değişmektedir. Mağazamızı ziyaret ederek tüm ürünlerimizi ve fiyatlarını görebilirsiniz.";
    }

    // Tazelik soruları
    if (lowerMessage.includes('taze') || lowerMessage.includes('kavur') || lowerMessage.includes('tarih')) {
      return "Tüm kahvelerimiz siparişe göre taze kavurulur ve kavurma tarihinden sonra 3-5 gün içinde size ulaşır. Her pakette kavurma tarihi belirtilir.";
    }

    // Öğütme soruları
    if (lowerMessage.includes('öğüt') || lowerMessage.includes('çekirdek') || lowerMessage.includes('grind')) {
      return "Kahvelerimizi çekirdek olarak ya da 10 farklı demleme metoduna göre öğütülmüş olarak sipariş edebilirsiniz: Espresso, V60, French Press, Chemex, Aeropress, Moka Pot, Kağıt Filtre, Metal Filtre, Soğuk Demleme.";
    }

    // İade soruları
    if (lowerMessage.includes('iade') || lowerMessage.includes('iptal') || lowerMessage.includes('geri')) {
      return "Açılmamış ürünleri teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Kargoya verilmeden önce siparişi iptal edebilirsiniz. Daha fazla bilgi için /faq sayfamızı ziyaret edin.";
    }

    // Ödeme soruları
    if (lowerMessage.includes('ödeme') || lowerMessage.includes('kredi') || lowerMessage.includes('kart')) {
      return "Kredi kartı, banka kartı ve havale/EFT ile ödeme kabul ediyoruz. Tüm ödemeler güvenli SSL şifrelemesi ile korunur.";
    }

    // İletişim soruları
    if (lowerMessage.includes('telefon') || lowerMessage.includes('mail') || lowerMessage.includes('iletişim') || lowerMessage.includes('ulaş')) {
      return `Bize ${SITE_EMAIL} adresinden mail atabilir veya +90 (212) 123 45 67 numaralı telefondan ulaşabilirsiniz. Hafta içi 09:00-18:00 arası hizmetinizdeyiz.`;
    }

    // SSS yönlendirme
    if (lowerMessage.includes('sss') || lowerMessage.includes('soru') || lowerMessage.includes('cevap') || lowerMessage.includes('faq')) {
      return "Sıkça sorulan sorularımızı /faq sayfamızda bulabilirsiniz. Daha fazla bilgi için bu sayfayı ziyaret edebilirsiniz.";
    }

    // Genel yanıt
    return `Mesajınız için teşekkürler! Bir temsilcimiz en kısa sürede size dönüş yapacak. Acil durumlar için ${SITE_EMAIL} adresinden bize ulaşabilirsiniz. SSS sayfamızı da kontrol edebilirsiniz: /faq`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      text: inputMessage,
      isBot: false,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    const currentMessage = inputMessage;
    setInputMessage("");

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMsg = {
        text: getSmartResponse(currentMessage),
        isBot: true,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      toast.success("Yanıt hazır", { duration: 2200, closeButton: true });
    }, 1800);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="kaven-chat-panel"
        aria-haspopup="dialog"
        aria-label={isOpen ? "Sohbeti kapat" : "Canlı desteği aç"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[var(--espresso)] to-[#5D4A4A] text-white rounded-full shadow-xl flex items-center justify-center"
        style={{ boxShadow: "0 8px 32px rgba(51, 37, 32, 0.3)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2} />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--gold)] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="kaven-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kaven-chat-title"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)]"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)", maxHeight: "600px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--espresso)] to-[#5D4A4A] text-white p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full p-2">
                    <img src={beanoLogo} alt="Beano" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 id="kaven-chat-title" className="font-medium text-white">Beano Destek</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Çevrimiçi
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-5 space-y-4 bg-[var(--cream)]/30">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                    {message.isBot && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-white rounded-full p-1">
                          <img src={beanoLogo} alt="Beano" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xs text-[var(--muted-foreground)]">Beano</span>
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white border border-[var(--border)] text-[var(--espresso)]'
                          : 'bg-[var(--espresso)] text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className={`text-xs text-[var(--muted-foreground)] mt-1 block ${message.isBot ? 'text-left' : 'text-right'}`}>
                      {message.time}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[var(--border)] p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-5 py-3 border-t border-[var(--border)] bg-white">
                <div className="text-xs text-[var(--muted-foreground)] mb-2 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" strokeWidth={1.5} />
                  <span>Hızlı Sorular</span>
                </div>
                <div className="space-y-2">
                  {quickQuestions.slice(0, 3).map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q)}
                      className="w-full text-left px-3 py-2 bg-[var(--cream)] hover:bg-[var(--espresso)]/5 rounded-lg text-xs text-[var(--espresso)] transition-colors border border-[var(--border)]"
                    >
                      <span>{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-[var(--border)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Mesajınızı yazın..."
                  aria-label="Destek mesajınız"
                  className="flex-1 px-4 py-2 bg-[var(--cream)] border border-[var(--border)] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  aria-label="Mesajı gönder"
                  className="w-10 h-10 bg-[var(--espresso)] text-white rounded-full flex items-center justify-center hover:bg-[#2A2020] transition-colors"
                >
                  <Send className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-[var(--muted-foreground)]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" strokeWidth={1.5} />
                  Genellikle 1 dk içinde yanıt
                </div>
                <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-1 hover:text-[var(--espresso)]">
                  <Mail className="w-3 h-3" strokeWidth={1.5} />
                  {SITE_EMAIL}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
