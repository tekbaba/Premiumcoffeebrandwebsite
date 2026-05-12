import type { CSSProperties } from "react";
import { cn } from "./ui/utils";

/** Türk lirası: Cormorant (--font-price) + lining/tabular rakamlar (kayma azaltma). */
export function Price({
  amount,
  className,
  style,
}: {
  amount: number;
  className?: string;
  style?: CSSProperties;
}) {
  const formatted = amount.toLocaleString("tr-TR");
  return (
    <span
      className={cn("price-try inline-flex items-baseline gap-[0.12em] font-semibold text-[var(--espresso)]", className)}
      style={{
        fontFamily: "var(--font-price)",
        fontVariantNumeric: "lining-nums tabular-nums",
        fontFeatureSettings: '"lnum" 1, "tnum" 1',
        ...style,
      }}
      aria-label={`${amount} Türk lirası`}
    >
      <span className="price-try__symbol shrink-0 select-none leading-none" aria-hidden>
        ₺
      </span>
      <span className="price-try__digits min-w-0 leading-none tracking-tight">{formatted}</span>
    </span>
  );
}
