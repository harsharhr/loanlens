import type { CalculatorConfig } from "../types";

export const percentageCalculator: CalculatorConfig = {
  id: "percentage-calculator",
  slug: "percentage-calculator",
  title: "Percentage Calculator",
  tagline: "Find X% of a number, what percent one number is of another, or a % change.",
  intro:
    "The three percentage questions everyone actually asks — what is X% of Y, what percent is X of Y, and how much did something increase or decrease — in one tool. Pick the mode, enter two numbers, and get the answer with the working shown.",
  category: "everyday",
  subcategory: "maths",
  featured: false,
  keywords: ["percentage calculator", "percent of a number", "percentage change", "percent increase", "marks percentage", "discount percentage"],
  lastUpdated: "2026-07-07",
  inputs: [
    { name: "mode", label: "What do you want to find?", kind: "number", defaultValue: 1, options: [
      { label: "X% of Y", value: 1 },
      { label: "X is what % of Y", value: 2 },
      { label: "% change X → Y", value: 3 },
    ] },
    { name: "x", label: "First number (X)", kind: "number", defaultValue: 15, min: -1000000000, max: 1000000000, step: 0.01 },
    { name: "y", label: "Second number (Y)", kind: "number", defaultValue: 2000, min: -1000000000, max: 1000000000, step: 0.01 },
  ],
  compute: (v, ctx) => {
    const { mode, x, y } = v;
    const nf = (n: number, dp = 4) => Number(n.toFixed(dp)).toLocaleString(ctx.locale, { maximumFractionDigits: dp });

    if (mode === 1) {
      // X% of Y
      const result = (x / 100) * y;
      return {
        metrics: [
          { label: `${nf(x, 2)}% of ${nf(y, 2)}`, value: nf(result), format: "text", primary: true, tone: "brand" },
          { label: "As a fraction", value: `${nf(x, 2)}/100 × ${nf(y, 2)}`, format: "text", tone: "neutral" },
          { label: "Remaining part", value: nf(y - result), format: "text", note: `${nf(100 - x, 2)}% of ${nf(y, 2)}`, tone: "neutral" },
        ],
        interpretation: `${nf(x, 2)}% of ${nf(y, 2)} is ${nf(result)}. A common use: a ${nf(x, 2)}% discount on a ${nf(y, 2)} price knocks off ${nf(result)}, leaving ${nf(y - result)} to pay.`,
      };
    }

    if (mode === 2) {
      // X is what % of Y
      if (y === 0) {
        return {
          metrics: [{ label: "Result", value: "Undefined", format: "text", primary: true, tone: "warning" }],
          interpretation: "Y cannot be zero — a share of nothing isn't defined. Enter a non-zero second number.",
        };
      }
      const pct = (x / y) * 100;
      return {
        metrics: [
          { label: `${nf(x, 2)} out of ${nf(y, 2)}`, value: `${nf(pct, 2)}%`, format: "text", primary: true, tone: "brand" },
          { label: "As a decimal", value: nf(x / y), format: "text", tone: "neutral" },
          { label: "Out of 100", value: nf(pct, 2), format: "text", tone: "neutral" },
        ],
        interpretation: `${nf(x, 2)} is ${nf(pct, 2)}% of ${nf(y, 2)}. This is the marks-percentage maths: scoring ${nf(x, 2)} out of a maximum of ${nf(y, 2)} gives ${nf(pct, 2)}%.`,
      };
    }

    // % change from X to Y
    if (x === 0) {
      return {
        metrics: [{ label: "Result", value: "Undefined", format: "text", primary: true, tone: "warning" }],
        interpretation: "Percentage change from zero isn't defined — any growth from 0 is infinite. Enter a non-zero starting value.",
      };
    }
    const change = ((y - x) / Math.abs(x)) * 100;
    const dir = change > 0 ? "increase" : change < 0 ? "decrease" : "no change";
    return {
      metrics: [
        { label: `Change from ${nf(x, 2)} to ${nf(y, 2)}`, value: `${change > 0 ? "+" : ""}${nf(change, 2)}%`, format: "text", primary: true, tone: change >= 0 ? "success" : "warning" },
        { label: "Absolute change", value: nf(y - x), format: "text", tone: "neutral" },
        { label: "Multiplier", value: `${nf(y / x)}×`, format: "text", tone: "neutral" },
      ],
      interpretation: `Going from ${nf(x, 2)} to ${nf(y, 2)} is a ${nf(Math.abs(change), 2)}% ${dir}. Note that percentage changes aren't symmetric — a 50% drop needs a 100% rise to recover.`,
    };
  },
  formula: {
    heading: "The three percentage formulas",
    expression: "X% of Y = X/100 × Y    |    X of Y in % = X/Y × 100    |    Change % = (Y−X)/X × 100",
    body: "All three are the same relationship rearranged. 'Percent' literally means 'per hundred', so every percentage problem is a fraction with 100 as the denominator.",
    variables: [
      { symbol: "X", meaning: "the percentage, the part, or the starting value — depending on mode" },
      { symbol: "Y", meaning: "the whole, the maximum, or the ending value" },
    ],
  },
  explanation: [
    "Mode 1 — 'X% of Y' — answers discount, tip, tax and interest questions: 15% of ₹2,000 is ₹300. Divide the percentage by 100 to get a decimal, then multiply.",
    "Mode 2 — 'X is what % of Y' — is the exam-marks and market-share question: 432 out of 500 is 86.4%. Divide the part by the whole and multiply by 100.",
    "Mode 3 — percentage change — compares an old and new value: a price going from ₹80 to ₹100 rose 25%. The denominator is always the starting value, which is why a rise and an equal-looking fall are not symmetric percentages.",
  ],
  examples: [
    { title: "Discount", scenario: "A ₹2,000 item at 15% off (mode 1).", result: "Discount ₹300; you pay ₹1,700." },
    { title: "Exam marks", scenario: "Scored 432 out of 500 (mode 2).", result: "86.4% — above a typical 75% distinction cut-off." },
    { title: "Salary hike", scenario: "Salary went ₹50,000 → ₹58,000 (mode 3).", result: "A 16% increase." },
  ],
  faq: [
    { q: "How do I calculate a percentage of a number quickly?", a: "Move the decimal: 10% is one-tenth, 1% is one-hundredth. For 15% of 2,000: 10% is 200, 5% is 100, so 15% is 300." },
    { q: "How do I convert marks to percentage?", a: "Use mode 2: your marks divided by maximum marks, times 100. For CGPA-based results, your university publishes its own multiplier — check its rule rather than assuming 9.5." },
    { q: "Why isn't a 50% fall cancelled by a 50% rise?", a: "Because the base changes. 100 falling 50% is 50; 50 rising 50% is only 75. Percentage changes always use the starting value as the base." },
    { q: "What's the difference between percentage and percentage points?", a: "Going from 10% to 12% is a rise of 2 percentage points, but a 20% relative increase. News reports often blur the two." },
    { q: "Can percentages exceed 100?", a: "Yes — 150% of 40 is 60, and a stock tripling is a 200% gain. Over 100% simply means 'more than the whole original'." },
  ],
  related: ["age-calculator", "date-difference", "cagr", "gst"],
};
