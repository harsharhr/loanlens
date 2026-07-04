import type { CalculatorConfig } from "../types";
import { FREQUENCY, futureValueLump } from "../utils";

const FREQ_OPTIONS = [
  { label: "Quarterly", value: FREQUENCY.quarterly },
  { label: "Monthly", value: FREQUENCY.monthly },
  { label: "Half-yearly", value: FREQUENCY.semiannually },
  { label: "Yearly", value: FREQUENCY.annually },
];

export const fd: CalculatorConfig = {
  id: "fd",
  slug: "fd",
  title: "FD Calculator",
  tagline: "Work out the maturity value of a fixed deposit.",
  intro:
    "A Fixed Deposit (FD) locks a lump sum with a bank for a fixed term at a fixed interest rate. This calculator shows the maturity amount and interest earned, using the quarterly compounding that most Indian banks apply.",
  category: "savings",
  featured: true,
  keywords: ["FD calculator", "fixed deposit calculator", "fd maturity", "bank deposit interest", "fd interest rate"],
  inputs: [
    { name: "principal", label: "Deposit amount", kind: "currency", defaultValue: 500000, min: 1000, max: 100000000, step: 5000, slider: true },
    { name: "rate", label: "Interest rate (p.a.)", kind: "percent", defaultValue: 7, min: 1, max: 15, step: 0.05, slider: true, hint: "Senior citizens usually get 0.5% more." },
    { name: "years", label: "Tenure", kind: "number", defaultValue: 5, min: 0.25, max: 10, step: 0.25, slider: true, suffix: "yrs" },
    { name: "frequency", label: "Compounding", kind: "number", defaultValue: FREQUENCY.quarterly, options: FREQ_OPTIONS },
  ],
  compute: (v) => {
    const { principal, rate, years, frequency } = v;
    const maturity = futureValueLump(principal, rate, years, frequency);
    const interest = maturity - principal;

    const rows: Array<Record<string, number>> = [];
    const steps = Math.max(1, Math.round(years));
    for (let y = 0; y <= steps; y++) {
      const bal = futureValueLump(principal, rate, y, frequency);
      rows.push({ x: y, principal: Math.round(principal), interest: Math.round(bal - principal) });
    }

    return {
      metrics: [
        { label: "Maturity amount", value: maturity, format: "currency", primary: true, tone: "brand" },
        { label: "Interest earned", value: interest, format: "currency", tone: "success" },
        { label: "Deposit", value: principal, format: "currency", tone: "neutral" },
        { label: "Effective yield", value: principal > 0 ? (interest / principal) * 100 : 0, format: "percent", note: "total", tone: "neutral" },
      ],
      interpretation: `Your ${Math.round(principal).toLocaleString("en-IN")} deposit matures to ${Math.round(maturity).toLocaleString("en-IN")} after ${years} years at ${rate}%, earning ${Math.round(interest).toLocaleString("en-IN")} in interest with ${frequency === 4 ? "quarterly" : frequency === 12 ? "monthly" : frequency === 2 ? "half-yearly" : "yearly"} compounding. Interest is taxable as per your slab, and TDS applies above ₹40,000 (₹50,000 for seniors).`,
      chart: {
        type: "area",
        title: "Deposit vs. interest",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "principal", label: "Deposit", color: "--chart-1" },
          { key: "interest", label: "Interest", color: "--chart-2" },
        ],
      },
    };
  },
  formula: {
    heading: "How FD maturity is calculated",
    expression: "A = P (1 + r/n)^(n·t)",
    body: "The deposit compounds at the bank's frequency (usually quarterly). More frequent compounding raises the effective yield slightly above the quoted rate.",
    variables: [
      { symbol: "A", meaning: "maturity amount" },
      { symbol: "P", meaning: "principal deposited" },
      { symbol: "r", meaning: "annual interest rate (decimal)" },
      { symbol: "n", meaning: "compounding periods per year" },
      { symbol: "t", meaning: "tenure in years" },
    ],
  },
  explanation: [
    "A fixed deposit pays a guaranteed rate for a locked term, making it one of the safest ways to grow idle money. Most Indian banks compound FD interest quarterly, so the amount you actually receive is a little more than principal × rate × time.",
    "The quoted rate is nominal; because of quarterly compounding the effective annual yield is marginally higher. Cumulative FDs reinvest interest (shown here), while non-cumulative FDs pay it out monthly or quarterly instead.",
    "FD interest is fully taxable at your income-tax slab, and banks deduct TDS once yearly interest crosses the threshold. Breaking an FD early usually incurs a small penalty and a lower rate.",
  ],
  examples: [
    { title: "5-year FD", scenario: "₹5,00,000 at 7% for 5 years, compounded quarterly.", result: "Matures to about ₹7.07 lakh — roughly ₹2.07 lakh interest." },
    { title: "Short tenure", scenario: "₹1,00,000 at 6.5% for 1 year.", result: "Around ₹6,660 interest with quarterly compounding." },
    { title: "Senior citizen", scenario: "The 5-year FD at 7.5% (0.5% senior bonus).", result: "Noticeably higher maturity than the standard rate." },
  ],
  faq: [
    { q: "How is FD interest compounded?", a: "Most Indian banks compound fixed-deposit interest quarterly, though some offer monthly or yearly. This calculator lets you choose the frequency." },
    { q: "Is FD interest taxable?", a: "Yes. FD interest is added to your income and taxed at your slab. Banks deduct TDS once annual interest exceeds ₹40,000 (₹50,000 for senior citizens)." },
    { q: "What is the difference between cumulative and non-cumulative FD?", a: "Cumulative FDs reinvest interest and pay everything at maturity (as shown here). Non-cumulative FDs pay interest out periodically." },
    { q: "Can I withdraw an FD early?", a: "Usually yes, but with a penalty (often 0.5–1%) and interest recalculated at the rate for the period actually completed." },
    { q: "Is an FD better than a debt fund?", a: "FDs offer certainty and capital safety; debt funds may offer better post-tax returns for those in higher brackets but carry some risk. It depends on your goals and tax slab." },
  ],
  related: ["rd", "ppf", "compound-interest", "income-tax"],
};
