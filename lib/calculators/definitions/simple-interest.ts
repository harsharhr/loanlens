import type { CalculatorConfig } from "../types";

export const simpleInterest: CalculatorConfig = {
  id: "simple-interest",
  slug: "simple-interest",
  title: "Simple Interest Calculator",
  tagline: "Interest on the principal only — no compounding.",
  intro:
    "Simple interest is charged only on the original principal, never on accumulated interest. It's used for many short-term loans, some fixed deposits and everyday interest quotes. This calculator finds the interest and the final amount.",
  category: "savings",
  featured: false,
  keywords: ["simple interest calculator", "simple interest formula", "principal interest", "flat interest"],
  inputs: [
    { name: "principal", label: "Principal", kind: "currency", defaultValue: 100000, min: 1, max: 100000000, step: 1000, slider: true },
    { name: "rate", label: "Annual interest rate", kind: "percent", defaultValue: 8, min: 0, max: 40, step: 0.1, slider: true },
    { name: "years", label: "Time period", kind: "number", defaultValue: 5, min: 0.25, max: 50, step: 0.25, slider: true, suffix: "yrs" },
  ],
  compute: (v) => {
    const { principal, rate, years } = v;
    const interest = (principal * rate * years) / 100;
    const total = principal + interest;
    const perYear = (principal * rate) / 100;

    const rows: Array<Record<string, number>> = [];
    const wholeYears = Math.max(1, Math.round(years));
    for (let y = 0; y <= wholeYears; y++) {
      rows.push({ x: y, principal: Math.round(principal), interest: Math.round(perYear * y) });
    }

    return {
      metrics: [
        { label: "Total interest", value: interest, format: "currency", primary: true, tone: "brand" },
        { label: "Final amount", value: total, format: "currency", tone: "success" },
        { label: "Interest per year", value: perYear, format: "currency", tone: "neutral" },
        { label: "Effective total return", value: principal > 0 ? (interest / principal) * 100 : 0, format: "percent", tone: "neutral" },
      ],
      interpretation: `Simple interest adds a flat ${Math.round(perYear).toLocaleString("en-IN")} every year regardless of what's already accrued. Over ${years} years that's ${Math.round(interest).toLocaleString("en-IN")} — less than compound interest would give, because the interest never itself earns interest.`,
      chart: {
        type: "area",
        title: "Principal and accrued interest",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "principal", label: "Principal", color: "--chart-1" },
          { key: "interest", label: "Interest", color: "--chart-2" },
        ],
      },
    };
  },
  formula: {
    heading: "The simple interest formula",
    expression: "I = P · r · t   →   A = P + I",
    body: "Interest is a flat fraction of the principal for each unit of time. It grows in a straight line, unlike compound interest which curves upward.",
    variables: [
      { symbol: "I", meaning: "interest earned or owed" },
      { symbol: "P", meaning: "principal" },
      { symbol: "r", meaning: "annual rate (decimal)" },
      { symbol: "t", meaning: "time in years" },
      { symbol: "A", meaning: "final amount = P + I" },
    ],
  },
  explanation: [
    "Simple interest is the most basic way to calculate interest: multiply the principal by the rate by the time. Because it ignores compounding, the amount of interest is the same every period.",
    "It's common for short-term and informal loans, certain bonds' coupon payments, and some fixed deposits that pay interest out rather than reinvesting it. For anything long-term where interest is reinvested, compound interest applies instead.",
    "The gap between simple and compound interest widens with time and rate. Over one year at a modest rate the two are close; over decades, compound interest pulls far ahead.",
  ],
  examples: [
    { title: "Five-year deposit", scenario: "₹1,00,000 at 8% simple for 5 years.", result: "₹40,000 interest; final amount ₹1,40,000." },
    { title: "Short-term loan", scenario: "₹50,000 at 12% simple for 9 months (0.75 years).", result: "₹4,500 interest." },
    { title: "Simple vs. compound", scenario: "₹1,00,000 at 8% for 10 years.", result: "Simple gives ₹80,000 interest; monthly compounding gives noticeably more." },
  ],
  faq: [
    { q: "When is simple interest used?", a: "For many short-term loans, some fixed deposits that pay out interest, car loans in certain markets, and quick interest estimates." },
    { q: "How is it different from compound interest?", a: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus previously earned interest, so it grows faster." },
    { q: "Does time have to be in years?", a: "Rate and time must use the same unit. If the rate is annual, express the period in years — nine months is 0.75 years." },
    { q: "Which is better for me?", a: "As a saver you want compound interest; as a borrower you'd prefer simple interest, since it costs less over time." },
    { q: "Can the period be a fraction?", a: "Yes. This calculator accepts fractional years, so you can model months or quarters precisely." },
  ],
  related: ["compound-interest", "apy", "loan", "savings-goal"],
};
