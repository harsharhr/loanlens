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

import { cmToFeet } from "./definitions/cm-to-feet";
import { cmToInches } from "./definitions/cm-to-inches";
import { feetToInches } from "./definitions/feet-to-inches";
import { feetToMeters } from "./definitions/feet-to-meters";
import { inchesToCm } from "./definitions/inches-to-cm";
import { inchesToFeet } from "./definitions/inches-to-feet";
import { mmToInches } from "./definitions/mm-to-inches";
import { metersToFeetInches } from "./definitions/meters-to-feet-inches";
import { gramsToPounds } from "./definitions/grams-to-pounds";
import { kgToPounds } from "./definitions/kg-to-pounds";
import { microgramsToMg } from "./definitions/micrograms-to-mg";
import { microgramsToGrams } from "./definitions/micrograms-to-grams";
import { mgToGrams } from "./definitions/mg-to-grams";
import { ouncesToPounds } from "./definitions/ounces-to-pounds";
import { stoneToPounds } from "./definitions/stone-to-pounds";
import { kgToStonePounds } from "./definitions/kg-to-stone-pounds";
import { cubicFeetToGallons } from "./definitions/cubic-feet-to-gallons";
import { gallonsToOunces } from "./definitions/gallons-to-ounces";
import { litersToGallons } from "./definitions/liters-to-gallons";
import { litersToOunces } from "./definitions/liters-to-ounces";
import { cubicYardsToTons } from "./definitions/cubic-yards-to-tons";
import { gallonsToPounds } from "./definitions/gallons-to-pounds";
import { litersToTons } from "./definitions/liters-to-tons";
import { inchPoundsToFtLb } from "./definitions/inch-pounds-to-ft-lb";
import { newtonMetersToFtLb } from "./definitions/newton-meters-to-ft-lb";
import { squareFeetToAcres } from "./definitions/square-feet-to-acres";
import { squareMetersToSquareFeet } from "./definitions/square-meters-to-square-feet";
import { squareFeetToCubicFeet } from "./definitions/square-feet-to-cubic-feet";
import { squareFeetToCubicYards } from "./definitions/square-feet-to-cubic-yards";
import { ampsToWatts } from "./definitions/amps-to-watts";
import { wattsToAmps } from "./definitions/watts-to-amps";
import { lumensToWatts } from "./definitions/lumens-to-watts";
import { hertzToSeconds } from "./definitions/hertz-to-seconds";

import { bmiCalculator } from "./definitions/bmi-calculator";
import { whrCalculator } from "./definitions/whr-calculator";
import { bmrCalculator } from "./definitions/bmr-calculator";
import { howLongToWalkAMile } from "./definitions/how-long-to-walk-a-mile";
import { howManyStepsInAMile } from "./definitions/how-many-steps-in-a-mile";
import { milesToSteps } from "./definitions/miles-to-steps";
import { stepsToKm } from "./definitions/steps-to-km";
import { stepsToMiles } from "./definitions/steps-to-miles";
import { stepsToCalories } from "./definitions/steps-to-calories";
import { pregnancyCalculator } from "./definitions/pregnancy-calculator";
import { sobrietyCalculator } from "./definitions/sobriety-calculator";
import { kilojoulesToCalories } from "./definitions/kilojoules-to-calories";

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
  // Featured Units
  cmToFeet, cmToInches, feetToInches, feetToMeters, inchesToCm, inchesToFeet, mmToInches, metersToFeetInches,
  gramsToPounds, kgToPounds, microgramsToMg, microgramsToGrams, mgToGrams, ouncesToPounds, stoneToPounds, kgToStonePounds,
  cubicFeetToGallons, gallonsToOunces, litersToGallons, litersToOunces,
  cubicYardsToTons, gallonsToPounds, litersToTons,
  inchPoundsToFtLb, newtonMetersToFtLb,
  squareFeetToAcres, squareMetersToSquareFeet,
  squareFeetToCubicFeet, squareFeetToCubicYards,
  ampsToWatts, wattsToAmps, lumensToWatts, hertzToSeconds,
  // Health
  bmiCalculator, whrCalculator, bmrCalculator,
  howLongToWalkAMile, howManyStepsInAMile, milesToSteps, stepsToKm, stepsToMiles, stepsToCalories,
  pregnancyCalculator, sobrietyCalculator, kilojoulesToCalories
];

export const CATEGORIES: CategoryMeta[] = [
  { id: "investing", label: "Investing", description: "Model mutual fund SIPs, step-ups, and long-term compounding." },
  { id: "loans", label: "Loans & EMI", description: "Compare Home, Car, and Personal loan EMIs and prepayments." },
  { id: "tax", label: "Tax & Compliance", description: "Navigate old vs new tax regimes, HRA exemptions, and GST slabs." },
  { id: "savings", label: "Savings", description: "Calculate maturity for FDs, RDs, PPF, and EPF accounts." },
  { id: "retirement", label: "Retirement", description: "Project your corpus and plan your retirement withdrawals." },
  { id: "personal-finance", label: "Personal Finance", description: "Calculate gratuity, stock averages, and other daily math." },
  { id: "featured-units", label: "Featured Units", description: "Fast, accurate unit conversions for height, weight, volume, energy, and more." },
  { id: "health", label: "Health & Fitness", description: "Calculators for BMI, BMR, steps, pregnancy, and more." },
];

const BY_SLUG = new Map(CALCULATORS.map((c) => [c.slug, c]));

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return BY_SLUG.get(slug);
}

export function getCalculatorPath(calcOrSlug: { slug: string, category?: string } | string): string {
  const calc = typeof calcOrSlug === "string" ? getCalculator(calcOrSlug) : calcOrSlug;
  if (!calc) return "/finance"; // fallback
  if (calc.category === "featured-units") return `/featured-units/${calc.slug}`;
  if (calc.category === "health") return `/health/${calc.slug}`;
  return `/finance/${calc.slug}`;
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
  const explicit = c.related.map((s) => getCalculator(s)).filter((x): x is CalculatorConfig => Boolean(x));
  if (explicit.length > 0) return explicit;

  // No related[] declared (common for programmatically-generated pages like unit
  // converters) — fall back to siblings so no page is a dead end. Prefer the same
  // subcategory, then widen to the category, so every page still links onward.
  const bySubcategory = c.subcategory
    ? CALCULATORS.filter((x) => x.slug !== c.slug && x.subcategory === c.subcategory)
    : [];
  if (bySubcategory.length > 0) return bySubcategory.slice(0, 4);

  return CALCULATORS.filter((x) => x.slug !== c.slug && x.category === c.category).slice(0, 4);
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
