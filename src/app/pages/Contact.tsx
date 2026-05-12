import { FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { SITE_EMAIL, mailtoHref } from "../config/site";

export function Contact() {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (!name || !email || !message) {
      toast.error("İsim, e-posta ve mesaj alanlarını doldurun", {
        duration: 2600,
        closeButton: true,
      });
      return;
    }
    window.location.href = mailtoHref(
      subject || "İletişim formu",
      `Gönderen: ${name}\nE-posta: ${email}\n\n${message}`
    );
  };

  return (
    <PageTransition>
    <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
      {/* Background Beano */}
      <motion.div
        className="absolute left-[5%] bottom-[10%] w-32 h-32 opacity-[0.02]"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4">İletişime Geçin</h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto" style={{ fontSize: "18px", lineHeight: "var(--leading-relaxed)" }}>
            Sorularınız mı var? Kahve hakkında konuşmak ister misiniz? Size yardımcı olmaktan mutluluk duyarız.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-[var(--radius-2xl)] p-8 border border-[var(--border)]" style={{ boxShadow: "var(--shadow-md)" }}>
              <h2 className="mb-6">Bize Yazın</h2>

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--espresso)] mb-2">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-[var(--radius-xl)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--espresso)] mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-[var(--radius-xl)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--espresso)] mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-[var(--radius-xl)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--espresso)] mb-2">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-[var(--radius-xl)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-all flex items-center justify-center gap-2"
                  style={{ boxShadow: "var(--shadow-md)" }}
                  whileHover={{ y: -2, boxShadow: "var(--shadow-lg)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" strokeWidth={1.5} />
                  Mesaj Gönder
                </motion.button>
                <p className="text-center text-xs text-[var(--muted-foreground)]">
                  Gönder dediğinizde e-posta uygulamanız açılır; mesaj{" "}
                  <a href={`mailto:${SITE_EMAIL}`} className="text-[var(--gold)] underline-offset-2 hover:underline">
                    {SITE_EMAIL}
                  </a>{" "}
                  adresine gider.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "E-posta",
                  content: SITE_EMAIL,
                  link: `mailto:${SITE_EMAIL}`,
                },
                {
                  icon: Phone,
                  title: "Telefon",
                  content: "+90 (212) 123 45 67",
                  link: "tel:+902121234567"
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  content: "Hızlı destek için mesaj gönderin",
                  link: "https://wa.me/902121234567"
                },
                {
                  icon: MapPin,
                  title: "Adres",
                  content: "Beşiktaş, İstanbul, Türkiye",
                  link: null
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-[var(--cream)] rounded-[var(--radius-2xl)] border border-[var(--border)]"
                >
                  <div className="p-3 bg-white rounded-[var(--radius-xl)]">
                    <item.icon className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ fontSize: "var(--text-h3)" }}>
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-[var(--muted-foreground)]">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-gradient-to-br from-[var(--espresso)] to-[#5D4A4A] text-white rounded-[var(--radius-2xl)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="mb-6 text-white">Çalışma Saatleri</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-white/80">Pazartesi - Cuma</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-white/80">Cumartesi</span>
                    <span className="font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Pazar</span>
                    <span className="font-medium">Kapalı</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
