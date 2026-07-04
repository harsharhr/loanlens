import type { CalculatorConfig } from "../types";
import { FREQUENCY, apy as apyFn, futureValueLump } from "../utils";

const FREQ_OPTIONS = [
  { label: "Annually", value: FREQUENCY.annually },
  { label: "Semi-annually", value: FREQUENCY.semiannually },
  { label: "Quarterly", value: FREQUENCY.quarterly },
  { label: "Monthly", value: FREQUENCY.monthly },
  { label: "Daily", value: FREQUENCY.daily },
];

export const apy: CalculatorConfig = {
  id: "apy",
  slug: "apy",
  title: "APY Calculator",
  tagline: "Convert a nominal interest rate into its true effective annual yield.",
  intro:
    "Two accounts can quote the same rate yet pay differently, because compounding frequency changes the real return. APY (Annual Percentage Yield) is the honest, compounding-adjusted rate that lets you compare savings accounts and deposits fairly.",
  category: "savings",
  featured: false,
  keywords: ["APY calculator", "annual percentage yield", "effective annual rate", "compound interest rate"],
  inputs: [
    { name: "rate", label: "Nominal annual rate", kind: "percent", defaultValue: 7, min: 0, max: 30, step: 0.05, slider: true, hint: "The quoted 'headline' rate." },
    { name: "frequency", label: "Compounding frequency", kind: "number", defaultValue: FREQUENCY.monthly, options: FREQ_OPTIONS },
    { name: "deposit", label: "Deposit (optional)", kind: "currency", defaultValue: 100000, min: 0, max: 100000000, step: 1000, slider: true, hint: "To see the yield in money terms." },
  ],
  compute: (v) => {
    const { rate, frequency, deposit } = v;
    const effective = apyFn(rate, frequency);
    const oneYear = futureValueLump(deposit, rate, 1, frequency);
    const interestYear = oneYear - deposit;
    const simpleYear = deposit * (rate / 100);
    const compoundingBonus = interestYear - simpleYear;

    return {
      metrics: [
        { label: "Effective APY", value: effective, format: "percent", primary: true, tone: "brand" },
        { label: "Interest in 1 year", value: interestYear, format: "currency", tone: "success" },
        { label: "Compounding bonus", value: compoundingBonus, format: "currency", note: "vs. simple interest", tone: "neutral" },
        { label: "Nominal rate", value: rate, format: "percent", tone: "neutral" },
      ],
      interpretation: `A ${rate}% nominal rate compounded ${frequency === 12 ? "monthly" : frequency === 4 ? "quarterly" : frequency === 365 ? "daily" : frequency === 2 ? "semi-annually" : "annually"} is really worth ${effective.toFixed(3)}% a year once compounding is counted. Always compare accounts on APY, not the headline rate.`,
      chart: {
        type: "donut",
        title: "Where your first-year interest comes from",
        data: [
          { x: "Simple interest", value: Math.round(simpleYear) },
          { x: "Compounding bonus", value: Math.round(Math.max(compoundingBonus, 0)) },
        ],
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "value", label: "Amount", color: "--chart-1" },
        ],
      },
    };
  },
  formula: {
    heading: "The APY formula",
    expression: "APY = (1 + r/n)ⁿ − 1",
    body: "It compresses a nominal rate and its compounding schedule into one effective yearly figure. The more often interest compounds, the higher the APY for the same nominal rate.",
    variables: [
      { symbol: "r", meaning: "nominal annual rate (decimal)" },
      { symbol: "n", meaning: "number of compounding periods per year" },
    ],
  },
  explanation: [
    "The nominal rate is what's advertised; the APY is what you actually earn once interest starts earning interest within the year. Because of this, APY is always at least as high as the nominal rate, and higher when compounding is frequent.",
    "APY is the number to compare across savings accounts, fixed deposits and money-market funds. A slightly lower nominal rate with daily compounding can beat a higher nominal rate compounded annually.",
    "The mirror image on the borrowing side is APR, which rolls fees into a comparable yearly cost. For saving you want the highest APY; for borrowing you want the lowest APR.",
  ],
  examples: [
    { title: "Monthly vs. annual", scenario: "7% compounded monthly.", result: "APY ≈ 7.23% — the extra 0.23% is pure compounding." },
    { title: "Daily compounding", scenario: "7% compounded daily.", result: "APY ≈ 7.25%, marginally higher than monthly." },
    { title: "In money terms", scenario: "₹1,00,000 at 7% APY for one year.", result: "About ₹7,230 of interest versus ₹7,000 with simple interest." },
  ],
  faq: [
    { q: "What's the difference between APR and APY?", a: "APR is a nominal rate often used for loans and ignores in-year compounding; APY includes compounding and reflects the true yield on savings." },
    { q: "Why is APY higher than the stated rate?", a: "Because interest earned during the year also earns interest. The more frequently that happens, the larger the gap." },
    { q: "Which account should I choose?", a: "Compare on APY, not the advertised nominal rate. The account with the highest APY pays you the most for the same deposit." },
    { q: "Does APY include fees?", a: "No. Account fees can reduce your real return, so factor them in separately when comparing." },
    { q: "Is APY guaranteed?", a: "Only if the rate is fixed. Variable-rate accounts can change their nominal rate, which changes the APY." },
  ],
  related: ["compound-interest", "simple-interest", "savings-goal", "cagr"],
};
