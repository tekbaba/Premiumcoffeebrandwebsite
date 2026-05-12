import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Coffee, Clock, Droplet, Scale, Play, Pause, RotateCcw, ChevronRight } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";

interface BrewMethod {
  id: string;
  name: string;
  ratio: number;
  temp: string;
  time: string;
  grind: string;
  description: string;
}

const brewMethods: BrewMethod[] = [
  {
    id: "v60",
    name: "V60 / Pour Over",
    ratio: 16,
    temp: "92-96°C",
    time: "2.5-3 dakika",
    grind: "Orta-İnce",
    description: "Temiz ve parlak bir fincan için ideal"
  },
  {
    id: "french-press",
    name: "French Press",
    ratio: 15,
    temp: "93-96°C",
    time: "4 dakika",
    grind: "Kaba",
    description: "Dolgun gövdeli, zengin kahve"
  },
  {
    id: "espresso",
    name: "Espresso",
    ratio: 2,
    temp: "90-96°C",
    time: "25-30 saniye",
    grind: "Çok İnce",
    description: "Yoğun ve kremalı shot"
  },
  {
    id: "aeropress",
    name: "Aeropress",
    ratio: 14,
    temp: "80-92°C",
    time: "1-2 dakika",
    grind: "İnce-Orta",
    description: "Hızlı ve çok yönlü"
  },
  {
    id: "chemex",
    name: "Chemex",
    ratio: 17,
    temp: "92-96°C",
    time: "3.5-4.5 dakika",
    grind: "Orta-Kaba",
    description: "Temiz ve zarif tat profili"
  },
  {
    id: "turkish",
    name: "Türk Kahvesi",
    ratio: 10,
    temp: "Kaynama",
    time: "2-3 dakika",
    grind: "Pudra",
    description: "Geleneksel ve yoğun"
  }
];

export function BrewCalculator() {
  const [selectedMethod, setSelectedMethod] = useState<BrewMethod>(brewMethods[0]);
  const [coffeeAmount, setCoffeeAmount] = useState(20);
  const [waterAmount, setWaterAmount] = useState(320);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [targetTime, setTargetTime] = useState(180); // 3 minutes default

  // Calculate water based on coffee and ratio
  const calculateWater = (coffee: number, ratio: number) => {
    return Math.round(coffee * ratio);
  };

  // Update water when coffee or method changes
  const handleCoffeeChange = (value: number) => {
    setCoffeeAmount(value);
    setWaterAmount(calculateWater(value, selectedMethod.ratio));
  };

  const handleMethodChange = (method: BrewMethod) => {
    setSelectedMethod(method);
    setWaterAmount(calculateWater(coffeeAmount, method.ratio));
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && timerSeconds < targetTime) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerSeconds >= targetTime) {
      setIsTimerRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, targetTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  const progress = (timerSeconds / targetTime) * 100;

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

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full mb-6 border border-[var(--border)]">
              <Coffee className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="text-sm text-[var(--espresso)] font-medium">Demleme Asistanı</span>
            </div>
            <h1 className="mb-4">Demleme Hesaplayıcısı</h1>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto" style={{ fontSize: "18px" }}>
              Mükemmel fincan için kahve/su oranını hesaplayın ve demleme sürenizi takip edin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Method Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <h3 className="mb-4 text-[var(--espresso)]">Demleme Yöntemi</h3>
              <div className="space-y-3">
                {brewMethods.map((method, index) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleMethodChange(method)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border transition-all text-left ${
                      selectedMethod.id === method.id
                        ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                        : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--gold)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{method.name}</span>
                      <ChevronRight className={`w-4 h-4 ${selectedMethod.id === method.id ? 'text-white' : 'text-[var(--gold)]'}`} strokeWidth={1.5} />
                    </div>
                    <p className={`text-sm ${selectedMethod.id === method.id ? 'text-white/80' : 'text-[var(--muted-foreground)]'}`}>
                      {method.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Calculator & Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Method Info */}
              <div className="bg-gradient-to-br from-[var(--espresso)] to-[#5D4A4A] text-white rounded-[var(--radius-2xl)] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h2 className="text-white mb-6">{selectedMethod.name}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-[var(--radius-xl)]">
                      <div className="text-xs text-white/70 mb-1">Oran</div>
                      <div className="font-medium">1:{selectedMethod.ratio}</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-[var(--radius-xl)]">
                      <div className="text-xs text-white/70 mb-1">Sıcaklık</div>
                      <div className="font-medium">{selectedMethod.temp}</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-[var(--radius-xl)]">
                      <div className="text-xs text-white/70 mb-1">Süre</div>
                      <div className="font-medium">{selectedMethod.time}</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-[var(--radius-xl)]">
                      <div className="text-xs text-white/70 mb-1">Öğütme</div>
                      <div className="font-medium">{selectedMethod.grind}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Calculator */}
              <div className="bg-white rounded-[var(--radius-2xl)] p-8 border border-[var(--border)]" style={{ boxShadow: "var(--shadow-md)" }}>
                <h3 className="mb-6 text-[var(--espresso)]">Miktar Hesaplayıcı</h3>

                <div className="space-y-6">
                  {/* Coffee Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Scale className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                        <label className="font-medium text-[var(--espresso)]">Kahve</label>
                      </div>
                      <span className="text-2xl font-serif text-[var(--espresso)]">{coffeeAmount}g</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="1"
                      value={coffeeAmount}
                      onChange={(e) => handleCoffeeChange(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--cream)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold)] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
                      <span>10g</span>
                      <span>60g</span>
                    </div>
                  </div>

                  {/* Water Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                        <label className="font-medium text-[var(--espresso)]">Su</label>
                      </div>
                      <span className="text-2xl font-serif text-[var(--espresso)]">{waterAmount}ml</span>
                    </div>
                    <div className="p-4 bg-[var(--cream)] rounded-[var(--radius-xl)]">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        <strong className="text-[var(--espresso)]">Oran:</strong> 1 gram kahve = {selectedMethod.ratio}ml su
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="bg-white rounded-[var(--radius-2xl)] p-8 border border-[var(--border)]" style={{ boxShadow: "var(--shadow-md)" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[var(--espresso)]">Zamanlayıcı</h3>
                  <select
                    value={targetTime}
                    onChange={(e) => {
                      setTargetTime(Number(e.target.value));
                      resetTimer();
                    }}
                    className="px-4 py-2 bg-[var(--cream)] border border-[var(--border)] rounded-full text-sm font-medium text-[var(--espresso)] cursor-pointer"
                  >
                    <option value={60}>1:00</option>
                    <option value={90}>1:30</option>
                    <option value={120}>2:00</option>
                    <option value={150}>2:30</option>
                    <option value={180}>3:00</option>
                    <option value={240}>4:00</option>
                    <option value={300}>5:00</option>
                  </select>
                </div>

                {/* Timer Display */}
                <div className="relative mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <svg className="w-48 h-48 transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="var(--cream)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="var(--gold)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: 552.92,
                            strokeDashoffset: 552.92 - (552.92 * progress) / 100
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Clock className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" strokeWidth={1.5} />
                          <div className="text-5xl font-serif text-[var(--espresso)] font-medium">
                            {formatTime(timerSeconds)}
                          </div>
                          <div className="text-sm text-[var(--muted-foreground)] mt-1">
                            / {formatTime(targetTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <motion.button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-[var(--espresso)] text-white rounded-full hover:bg-[#2A2020] transition-colors"
                      style={{ boxShadow: "var(--shadow-md)" }}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-5 h-5" strokeWidth={1.5} />
                          Duraklat
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" strokeWidth={1.5} />
                          Başlat
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={resetTimer}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-[var(--cream)] border border-[var(--border)] text-[var(--espresso)] rounded-full hover:bg-white transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </div>

                {/* Progress Message */}
                {timerSeconds >= targetTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-[var(--radius-xl)] text-center"
                  >
                    <p className="text-green-800 font-medium">✓ Demleme tamamlandı! Afiyet olsun.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
