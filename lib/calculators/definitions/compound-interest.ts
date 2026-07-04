import type { CalculatorConfig } from "../types";
import { FREQUENCY, futureValueLump, futureValueSeries, periodicRate } from "../utils";

const FREQ_OPTIONS = [
  { label: "Annually", value: FREQUENCY.annually },
  { label: "Quarterly", value: FREQUENCY.quarterly },
  { label: "Monthly", value: FREQUENCY.monthly },
  { label: "Daily", value: FREQUENCY.daily },
];

export const compoundInterest: CalculatorConfig = {
  id: "compound-interest",
  slug: "compound-interest",
  title: "Compound Interest Calculator",
  tagline: "See how your money grows when interest earns interest.",
  intro:
    "Compound interest is the engine behind long-term wealth. This calculator shows the future value of a lump sum plus any regular contributions, and separates how much is your own money versus interest earned.",
  category: "investing",
  featured: true,
  keywords: ["compound interest", "interest calculator", "investment growth", "future value", "compounding"],
  inputs: [
    { name: "principal", label: "Initial deposit", kind: "currency", defaultValue: 100000, min: 0, max: 100000000, step: 1000, slider: true, hint: "The amount you start with." },
    { name: "contribution", label: "Monthly contribution", kind: "currency", defaultValue: 5000, min: 0, max: 1000000, step: 500, slider: true, hint: "Added at the end of every month. Set 0 for a lump sum only." },
    { name: "rate", label: "Annual interest rate", kind: "percent", defaultValue: 8, min: 0, max: 40, step: 0.1, slider: true },
    { name: "years", label: "Time period", kind: "number", defaultValue: 15, min: 1, max: 60, step: 1, slider: true, suffix: "yrs" },
    { name: "frequency", label: "Compounding frequency", kind: "number", defaultValue: FREQUENCY.monthly, options: FREQ_OPTIONS },
  ],
  compute: (v) => {
    const { principal, contribution, rate, years, frequency } = v;
    const fvLump = futureValueLump(principal, rate, years, frequency);
    const fvSeries = futureValueSeries(contribution, rate, years, frequency, FREQUENCY.monthly);
    const futureValue = fvLump + fvSeries;
    const invested = principal + contribution * 12 * years;
    const interest = futureValue - invested;

    // yearly breakdown for chart + table
    const rows: Array<Record<string, number>> = [];
    for (let y = 1; y <= years; y++) {
      const bal = futureValueLump(principal, rate, y, frequency) + futureValueSeries(contribution, rate, y, frequency, FREQUENCY.monthly);
      const inv = principal + contribution * 12 * y;
      rows.push({ x: y, year: y, invested: Math.round(inv), interest: Math.round(bal - inv), balance: Math.round(bal) });
    }

    return {
      metrics: [
        { label: "Future value", value: futureValue, format: "currency", primary: true, tone: "brand" },
        { label: "Total invested", value: invested, format: "currency", tone: "neutral" },
        { label: "Interest earned", value: interest, format: "currency", tone: "success" },
        { label: "Growth multiple", value: invested > 0 ? futureValue / invested : 0, format: "number", note: "× your money", tone: "neutral" },
      ],
      interpretation: `Over ${years} years, ${interest > invested ? "interest actually outgrows the money you put in" : "your contributions do most of the heavy lifting"}. Compounding ${frequency === 12 ? "monthly" : frequency === 4 ? "quarterly" : frequency === 365 ? "daily" : "annually"} turns your invested capital into the future value shown above.`,
      chart: {
        type: "area",
        title: "Growth over time",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "invested", label: "Invested", color: "--chart-1" },
          { key: "interest", label: "Interest", color: "--chart-2" },
        ],
      },
      table: {
        title: "Year-by-year breakdown",
        previewRows: 8,
        columns: [
          { key: "year", label: "Year", format: "number" },
          { key: "invested", label: "Invested", format: "currency" },
          { key: "interest", label: "Interest", format: "currency" },
          { key: "balance", label: "Balance", format: "currency" },
        ],
        rows,
      },
    };
  },
  formula: {
    heading: "The compound interest formula",
    expression: "A = P(1 + r/n)^(nt) + PMT · [((1 + r/n)^(nt) − 1) / (r/n)]",
    body: "The first term compounds your initial deposit; the second is the future value of your regular contributions treated as an annuity.",
    variables: [
      { symbol: "A", meaning: "final amount (future value)" },
      { symbol: "P", meaning: "initial principal" },
      { symbol: "PMT", meaning: "periodic contribution" },
      { symbol: "r", meaning: "annual interest rate (decimal)" },
      { symbol: "n", meaning: "compounding periods per year" },
      { symbol: "t", meaning: "number of years" },
    ],
  },
  explanation: [
    "Compound interest means you earn returns not only on your original deposit but also on the interest that deposit has already earned. Over long horizons this snowballs — the growth curve bends upward rather than rising in a straight line.",
    "The frequency of compounding matters at the margins: more frequent compounding (monthly or daily) produces slightly more than annual compounding at the same nominal rate, because interest starts earning interest sooner.",
    "Regular contributions are the biggest lever for most people. Adding a fixed amount every month steadily raises the base that compounding acts on, which is why the interest portion of the chart accelerates in later years.",
  ],
  examples: [
    { title: "Lump sum only", scenario: "₹1,00,000 at 8% for 15 years, compounded monthly, no contributions.", result: "Grows to roughly ₹3.3 lakh — more than triple, entirely from interest." },
    { title: "Steady investor", scenario: "₹1,00,000 start plus ₹5,000/month at 8% for 15 years.", result: "Future value near ₹21 lakh, of which about ₹9 lakh is interest." },
    { title: "Power of time", scenario: "The same ₹5,000/month for 30 years instead of 15.", result: "Interest earned more than quadruples versus the 15-year case — proof that time beats timing." },
  ],
  faq: [
    { q: "What is compound interest in simple terms?", a: "It is interest calculated on both your original money and the interest already added to it, so your balance grows faster over time." },
    { q: "How is compound interest different from simple interest?", a: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest, so it grows faster the longer you stay invested." },
    { q: "Does compounding frequency really matter?", a: "At the same nominal rate, more frequent compounding yields a little more. The difference between monthly and annual is modest; the difference between compounding and not compounding is huge." },
    { q: "What rate should I use?", a: "Use a realistic long-run expectation for your asset: fixed deposits sit around 6–7%, diversified equity has historically averaged higher but with volatility. When in doubt, be conservative." },
    { q: "Are the results guaranteed?", a: "No. The calculator assumes a constant rate. Real returns fluctuate, and taxes or fees can reduce the final amount. Treat the output as an estimate for planning." },
  ],
  related: ["sip", "cagr", "savings-goal", "retirement"],
};
