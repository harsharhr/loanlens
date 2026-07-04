/**
 * The registry is the single source of truth. Pages, navigation, search, related
 * links and the sitemap all read from here. To add a calculator: create a config
 * in ./definitions, import it, and add it to CALCULATORS — nothing else.
 */
import type { CalculatorConfig, CategoryMeta, CalculatorCategory } from "./types";

import { compoundInterest } from "./definitions/compound-interest";
import { sip } from "./definitions/sip";
import { cagr } from "./definitions/cagr";
import { loan } from "./definitions/loan";
import { amortization } from "./definitions/amortization";
import { mortgage } from "./definitions/mortgage";
import { apy } from "./definitions/apy";
import { simpleInterest } from "./definitions/simple-interest";
import { retirement } from "./definitions/retirement";
import { savingsGoal } from "./definitions/savings-goal";
import { loanPayoff } from "./definitions/loan-payoff";
import { stockAverage } from "./definitions/stock-average";
import { homeLoan } from "./definitions/home-loan";
import { carLoan } from "./definitions/car-loan";
import { personalLoan } from "./definitions/personal-loan";
import { incomeTax } from "./definitions/income-tax";
import { gst } from "./definitions/gst";
import { fd } from "./definitions/fd";
import { rd } from "./definitions/rd";
import { ppf } from "./definitions/ppf";
import { epf } from "./definitions/epf";
import { hra } from "./definitions/hra";
import { gratuity } from "./definitions/gratuity";

export const CALCULATORS: CalculatorConfig[] = [
  incomeTax,
  homeLoan,
  sip,
  ppf,
  epf,
  fd,
  rd,
  carLoan,
  personalLoan,
  gst,
  hra,
  gratuity,
  compoundInterest,
  cagr,
  loan,
  amortization,
  mortgage,
  apy,
  simpleInterest,
  retirement,
  savingsGoal,
  loanPayoff,
  stockAverage,
];

export const CATEGORIES: CategoryMeta[] = [
  { id: "investing", label: "Investing", description: "Model mutual fund SIPs, step-ups, and long-term compounding." },
  { id: "loans", label: "Loans & EMI", description: "Compare Home, Car, and Personal loan EMIs and prepayments." },
  { id: "tax", label: "Tax & Compliance", description: "Navigate old vs new tax regimes, HRA exemptions, and GST slabs." },
  { id: "savings", label: "Savings", description: "Calculate maturity for FDs, RDs, PPF, and EPF accounts." },
  { id: "retirement", label: "Retirement", description: "Project your corpus and plan your retirement withdrawals." },
  { id: "personal-finance", label: "Personal Finance", description: "Calculate gratuity, stock averages, and other daily math." },
];

const BY_SLUG = new Map(CALCULATORS.map((c) => [c.slug, c]));

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return BY_SLUG.get(slug);
}

export function allSlugs(): string[] {
  return CALCULATORS.map((c) => c.slug);
}

export function calculatorsByCategory(category: CalculatorCategory): CalculatorConfig[] {
  return CALCULATORS.filter((c) => c.category === category);
}

export function featuredCalculators(): CalculatorConfig[] {
  return CALCULATORS.filter((c) => c.featured);
}

export function categoryMeta(id: CalculatorCategory): CategoryMeta {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export function relatedCalculators(slug: string): CalculatorConfig[] {
  const c = getCalculator(slug);
  if (!c) return [];
  return c.related.map((s) => getCalculator(s)).filter((x): x is CalculatorConfig => Boolean(x));
}

/** Lightweight client-safe search over title + keywords + category. */
export interface SearchItem {
  slug: string;
  title: string;
  tagline: string;
  category: CalculatorCategory;
  keywords: string[];
}

export function searchIndex(): SearchItem[] {
  return CALCULATORS.map((c) => ({
    slug: c.slug,
    title: c.title,
    tagline: c.tagline,
    category: c.category,
    keywords: c.keywords,
  }));
}

export function searchCalculators(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex().filter((item) => {
    const hay = `${item.title} ${item.tagline} ${item.keywords.join(" ")} ${item.category}`.toLowerCase();
    return q.split(/\s+/).every((term) => hay.includes(term));
  });
}
