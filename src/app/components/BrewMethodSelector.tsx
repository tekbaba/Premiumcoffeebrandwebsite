import { motion } from "motion/react";
import { BrewMethod } from "../contexts/CartContext";

interface BrewMethodSelectorProps {
  onSelect: (method: BrewMethod) => void;
  selectedMethod?: BrewMethod;
  showWeight?: boolean;
  onWeightSelect?: (weight: "250g" | "500g" | "1kg") => void;
  selectedWeight?: "250g" | "500g" | "1kg";
}

const brewMethods: BrewMethod[] = [
  "French Press",
  "Kağıt Filtre",
  "Çekirdek",
  "Moka Pot",
  "Espresso",
  "V60",
  "Metal Filtre",
  "Chemex",
  "Aeropress",
  "Soğuk Demleme",
];

const weights: ("250g" | "500g" | "1kg")[] = ["250g", "500g", "1kg"];

export function BrewMethodSelector({
  onSelect,
  selectedMethod,
  showWeight = false,
  onWeightSelect,
  selectedWeight
}: BrewMethodSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Coffee Weight Selection */}
      {showWeight && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--espresso)]">
            Kahve Gramajı:
          </label>
          <div className="flex flex-wrap gap-2">
            {weights.map((weight) => (
              <motion.button
                key={weight}
                onClick={() => onWeightSelect?.(weight)}
                className={`px-6 py-2 rounded-lg border-2 transition-all font-medium ${
                  selectedWeight === weight
                    ? "border-[var(--espresso)] bg-[var(--espresso)] text-white"
                    : "border-[var(--border)] bg-white text-[var(--espresso)] hover:border-[var(--espresso)]/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {weight}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Brew Method Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-[var(--espresso)]">
          Öğütme Metodu:
        </label>
        <div className="flex flex-wrap gap-2">
          {brewMethods.map((method) => (
            <motion.button
              key={method}
              onClick={() => onSelect(method)}
              className={`px-6 py-2 rounded-lg border-2 transition-all font-medium ${
                selectedMethod === method
                  ? "border-[var(--espresso)] bg-[var(--espresso)] text-white"
                  : "border-[var(--border)] bg-white text-[var(--espresso)] hover:border-[var(--espresso)]/40"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {method}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
