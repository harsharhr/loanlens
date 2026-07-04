import type { CalculatorConfig } from "../types";
import { cagr as cagrFn } from "../utils";

export const cagr: CalculatorConfig = {
  id: "cagr",
  slug: "cagr",
  title: "CAGR Calculator",
  tagline: "Find the smooth annual growth rate between two values.",
  intro:
    "Compound Annual Growth Rate (CAGR) is the single yearly rate that would take an investment from its starting value to its ending value over a period. It is the fairest way to compare investments that grew unevenly.",
  category: "investing",
  featured: true,
  keywords: ["CAGR calculator", "compound annual growth rate", "annualized return", "investment return"],
  inputs: [
    { name: "begin", label: "Initial value", kind: "currency", defaultValue: 100000, min: 1, max: 1000000000, step: 1000, slider: true },
    { name: "end", label: "Final value", kind: "currency", defaultValue: 250000, min: 1, max: 1000000000, step: 1000, slider: true },
    { name: "years", label: "Period", kind: "number", defaultValue: 5, min: 1, max: 50, step: 1, slider: true, suffix: "yrs" },
  ],
  compute: (v) => {
    const { begin, end, years } = v;
    const rate = cagrFn(begin, end, years);
    const totalReturn = ((end - begin) / begin) * 100;
    const absoluteGain = end - begin;

    const rows: Array<Record<string, number>> = [];
    for (let y = 0; y <= years; y++) {
      const val = begin * Math.pow(end / begin, y / years);
      rows.push({ x: y, year: y, value: Math.round(val) });
    }

    return {
      metrics: [
        { label: "CAGR", value: rate, format: "percent", primary: true, tone: "brand" },
        { label: "Total return", value: totalReturn, format: "percent", tone: "success" },
        { label: "Absolute gain", value: absoluteGain, format: "currency", tone: "neutral" },
        { label: "Growth multiple", value: begin > 0 ? end / begin : 0, format: "number", note: "× initial", tone: "neutral" },
      ],
      interpretation: `The investment grew at an average compounded rate of ${rate.toFixed(2)}% a year. That single figure smooths out the ups and downs and lets you compare it fairly against any other investment over any period.`,
      chart: {
        type: "line",
        title: "Smoothed growth path",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "value", label: "Value", color: "--chart-1" }],
      },
    };
  },
  formula: {
    heading: "The CAGR formula",
    expression: "CAGR = (Ending / Beginning)^(1 / years) − 1",
    body: "It answers: what constant yearly rate, compounded, turns the beginning value into the ending value over the given number of years?",
    variables: [
      { symbol: "Ending", meaning: "final value of the investment" },
      { symbol: "Beginning", meaning: "starting value of the investment" },
      { symbol: "years", meaning: "length of the holding period" },
    ],
  },
  explanation: [
    "CAGR expresses growth as if it happened at a perfectly steady rate, even though real returns are lumpy. This makes it ideal for comparing two investments held for different lengths of time.",
    "Because it is a geometric mean, CAGR is always less than or equal to the simple average of annual returns whenever those returns vary — it correctly accounts for the drag that volatility places on compounding.",
    "CAGR ignores interim cash flows. If you added or withdrew money during the period, use an IRR/XIRR measure instead for an accurate picture.",
  ],
  examples: [
    { title: "Doubling in 5 years", scenario: "₹1,00,000 grows to ₹2,00,000 over 5 years.", result: "CAGR ≈ 14.87% per year." },
    { title: "Stock over a decade", scenario: "A holding rises from ₹1,00,000 to ₹4,00,000 in 10 years.", result: "CAGR ≈ 14.87% — the same rate, because the multiple-per-year is identical." },
    { title: "Modest growth", scenario: "₹1,00,000 to ₹1,50,000 in 3 years.", result: "CAGR ≈ 14.47%, versus a total return of 50%." },
  ],
  faq: [
    { q: "What is a good CAGR?", a: "It depends on the asset and risk. Broad equity indices have historically delivered high-single to low-double digit CAGR over long periods, but past performance does not guarantee future results." },
    { q: "How is CAGR different from total return?", a: "Total return is the overall percentage change. CAGR converts that into a per-year compounded rate, making periods of different lengths comparable." },
    { q: "Why is CAGR lower than my average annual return?", a: "Averaging annual returns ignores compounding and volatility. CAGR reflects the actual compounded outcome, which is lower whenever returns fluctuate." },
    { q: "Can CAGR be negative?", a: "Yes. If the ending value is below the beginning value, CAGR is negative, showing the average annual rate of decline." },
    { q: "Does CAGR account for deposits or withdrawals?", a: "No. It assumes a single amount held for the whole period. Use XIRR when there are multiple cash flows." },
  ],
  related: ["compound-interest", "sip", "stock-average", "apy"],
};
