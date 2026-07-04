/**
 * Value formatters. Currency defaults to INR (India-friendly) but the symbol is
 * passed through ComputeContext so the same engine serves USD, EUR, etc.
 */
import type { ValueFormat } from "./types";

export const CURRENCIES = [
  { code: "INR", symbol: "₹", locale: "en-IN" },
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "EUR", symbol: "€", locale: "en-IE" },
  { code: "GBP", symbol: "£", locale: "en-GB" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function currencyMeta(code: CurrencyCode) {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

/** Compact, readable money. Uses grouping appropriate to the locale. */
export function formatCurrency(value: number, symbol = "₹", locale = "en-IN"): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value);
  const abs = Math.abs(rounded);
  // Whole rupees/dollars — no decimals; the fractional cent noise hurts trust.
  return `${rounded < 0 ? "-" : ""}${symbol}${new Intl.NumberFormat(locale).format(abs)}`;
}

/** Money with two decimals — used sparingly (e.g. per-share stock average). */
export function formatCurrencyPrecise(value: number, symbol = "₹", locale = "en-IN"): string {
  if (!Number.isFinite(value)) return "—";
  return `${value < 0 ? "-" : ""}${symbol}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value))}`;
}

export function formatPercent(value: number, dp = 2): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(dp)}%`;
}

export function formatNumber(value: number, locale = "en-IN"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(locale).format(Math.round(value));
}

export function formatYears(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const whole = Math.floor(value);
  const months = Math.round((value - whole) * 12);
  if (months === 0) return `${whole} yr${whole === 1 ? "" : "s"}`;
  if (whole === 0) return `${months} mo`;
  return `${whole} yr ${months} mo`;
}

export function formatMonths(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const m = Math.round(value);
  if (m < 12) return `${m} mo`;
  const y = Math.floor(m / 12);
  const rem = m % 12;
  return rem === 0 ? `${y} yr${y === 1 ? "" : "s"}` : `${y} yr ${rem} mo`;
}

/** Single entry point used by result cards, tables, and chart tooltips. */
export function formatValue(
  value: any,
  format: ValueFormat,
  symbol = "₹",
  locale = "en-IN",
): string {
  if (format === "text" || format === "duration") {
    return String(value);
  }
  
  const numValue = Number(value);
  
  switch (format) {
    case "currency":
      return formatCurrency(numValue, symbol, locale);
    case "percent":
      return formatPercent(numValue);
    case "years":
      return formatYears(numValue);
    case "months":
      return formatMonths(numValue);
    case "unit":
      if (!Number.isFinite(numValue)) return "—";
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 4 }).format(numValue);
    case "number":
    default:
      return formatNumber(numValue, locale);
  }
}
