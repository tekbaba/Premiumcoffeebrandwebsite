import { motion } from "motion/react";
import { Heart, Globe, Award } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";

export function About() {
  return (
    <PageTransition>
    <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
      {/* Background Beano - very subtle */}
      <motion.div
        className="absolute right-[3%] top-[5%] w-32 h-32 opacity-[0.02]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="mb-6">Hikayemiz</h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto" style={{ fontSize: "20px", lineHeight: "var(--leading-relaxed)" }}>
            Kahveye olan tutkumuz ve kaliteye olan bağlılığımız.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center"
        >
          <div className="aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)]" style={{ boxShadow: "var(--shadow-lg)" }}>
            <img
              src="https://images.unsplash.com/photo-1649276705773-59e693f1e2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Kahve demleme"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2>Başlangıç</h2>
            <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
              <p>
                KAVEN, kahvenin sadece bir sabah ritüelinden daha fazlası olduğu fikriyle doğdu. Bir deneyim, bir huzur anı, gününüzde bir sığınak.
              </p>
              <p>
                2020'de kurulan şirketimiz, dünyanın en kaliteli çekirdeklerini tedarik ediyor ve bunları mükemmeliyete kavuruyor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Beano Section - Hero Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[var(--espresso)] via-[#4A3A3A] to-[#5D4A4A] text-white rounded-[var(--radius-2xl)] p-12 md:p-20 mb-20 relative overflow-hidden"
          style={{ minHeight: "400px" }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl" />

          {/* Floating Beano Characters */}
          <motion.div
            className="absolute right-[5%] top-[10%] w-20 h-20 opacity-20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
          </motion.div>

          <motion.div
            className="absolute left-[8%] bottom-[15%] w-16 h-16 opacity-15"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
          </motion.div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Beano Image */}
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-[var(--radius-2xl)] p-8 md:p-12 flex items-center justify-center" style={{ boxShadow: "var(--shadow-xl)" }}>
                    {beanoLogo ? (
                      <img
                        src={beanoLogo}
                        alt="Beano"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          console.error('Beano logo failed to load:', beanoLogo);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
                        Beano
                      </div>
                    )}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[var(--gold)]/20 rounded-[var(--radius-2xl)] blur-2xl -z-10" />
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-white">Beano ile Tanışın</h2>
                <p className="text-white/90" style={{ fontSize: "18px", lineHeight: "var(--leading-relaxed)" }}>
                  Maskotumuz Beano, KAVEN'ın kalbini temsil ediyor. Samimi, ulaşılabilir ve kalite konusunda tutkulu.
                </p>
                <p className="text-white/80" style={{ fontSize: "16px", lineHeight: "var(--leading-relaxed)" }}>
                  Her kahve çekirdeğinin mükemmel şekilde kavurulduğundan, her fincanın sevgiyle hazırlandığından emin oluyor.
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <motion.img
                    src={beanoLogo}
                    alt=""
                    className="w-5 h-5"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <span className="text-sm text-white/90 font-medium">Beano Garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-center mb-12">Değerlerimiz</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Kalite",
                description: "Ödüllü çiftliklerden en yüksek kaliteli çekirdekler.",
              },
              {
                icon: Heart,
                title: "Özenle Kavrulmuş",
                description: "Küçük parti kavurma ile her çekirdeğin tam potansiyeli.",
              },
              {
                icon: Globe,
                title: "Küresel Tedarik",
                description: "Adil fiyatlar ve sürdürülebilir uygulamalar.",
              },
              {
                icon: Globe,
                title: "Topluluk",
                description: "Kahve severlerin bir araya geldiği özel bir topluluk.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-[var(--radius-2xl)] border border-[var(--border)]"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="inline-flex p-3 bg-[var(--cream)] rounded-[var(--radius-xl)] mb-4">
                  <value.icon className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[var(--espresso)]">{value.title}</h3>
                <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-relaxed)" }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6 order-2 lg:order-1">
            <h2>Misyonumuz</h2>
            <div className="space-y-4 text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)" }}>
              <p>
                Kahve severler için bir sığınak yaratmak. Kalitenin, topluluğun ve zanaatın bir araya geldiği bir yer.
              </p>
              <p>
                Doğrudan ticaret, sürdürülebilir uygulamalar ve mükemmellik taahhüdü ile hem çiftçilere hem de kahve severlere saygı gösteriyoruz.
              </p>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)] order-1 lg:order-2" style={{ boxShadow: "var(--shadow-lg)" }}>
            <img
              src="https://images.unsplash.com/photo-1775476792778-c86bfd29ba12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Kahve kavurma"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
