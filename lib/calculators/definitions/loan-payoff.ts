import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const loanPayoff: CalculatorConfig = {
  id: "loan-payoff",
  slug: "loan-payoff",
  title: "Loan Payoff Calculator",
  tagline: "See how extra monthly payments shorten your loan and save interest.",
  intro:
    "Paying a little extra each month can knock years off a loan and save a surprising amount of interest. This calculator compares your normal schedule with an accelerated one so you can see the payoff of paying more.",
  category: "loans",
  featured: false,
  keywords: ["loan payoff calculator", "extra payment", "pay off loan early", "prepayment", "interest saved"],
  inputs: [
    { name: "balance", label: "Current balance", kind: "currency", defaultValue: 1500000, min: 10000, max: 100000000, step: 10000, slider: true },
    { name: "rate", label: "Annual interest rate", kind: "percent", defaultValue: 11, min: 1, max: 36, step: 0.1, slider: true },
    { name: "years", label: "Remaining term", kind: "number", defaultValue: 8, min: 1, max: 30, step: 1, slider: true, suffix: "yrs" },
    { name: "extra", label: "Extra per month", kind: "currency", defaultValue: 5000, min: 0, max: 500000, step: 500, slider: true, hint: "Added on top of your regular EMI." },
  ],
  compute: (v) => {
    const { balance, rate, years, extra } = v;
    const months = Math.round(years * 12);
    const baseEmi = levelPayment(balance, rate, months);

    const baseSchedule = amortizationSchedule(balance, rate, months, 0);
    const fastSchedule = amortizationSchedule(balance, rate, months, extra);

    const baseInterest = baseSchedule.reduce((s, r) => s + r.interest, 0);
    const fastInterest = fastSchedule.reduce((s, r) => s + r.interest, 0);
    const interestSaved = baseInterest - fastInterest;
    const monthsSaved = baseSchedule.length - fastSchedule.length;

    // chart: balance curves, normal vs accelerated (yearly)
    const rows: Array<Record<string, number>> = [];
    const maxYears = Math.ceil(baseSchedule.length / 12);
    for (let y = 0; y <= maxYears; y++) {
      const idx = y * 12 - 1;
      const normal = y === 0 ? balance : baseSchedule[Math.min(idx, baseSchedule.length - 1)]?.balance ?? 0;
      const fast = y === 0 ? balance : idx < fastSchedule.length ? fastSchedule[idx].balance : 0;
      rows.push({ x: y, normal: Math.round(normal), accelerated: Math.round(fast) });
    }

    return {
      metrics: [
        { label: "Interest saved", value: interestSaved, format: "currency", primary: true, tone: "success" },
        { label: "Time saved", value: monthsSaved, format: "months", tone: "brand" },
        { label: "New payoff time", value: fastSchedule.length, format: "months", tone: "neutral" },
        { label: "New monthly payment", value: baseEmi + extra, format: "currency", note: `${Math.round(baseEmi).toLocaleString("en-IN")} + ${extra.toLocaleString("en-IN")}`, tone: "neutral" },
      ],
      interpretation: extra > 0
        ? `Adding ${extra.toLocaleString("en-IN")} a month clears the loan about ${Math.round(monthsSaved / 12 * 10) / 10} years sooner and saves roughly ${Math.round(interestSaved).toLocaleString("en-IN")} in interest — a guaranteed, risk-free return.`
        : `Enter an extra monthly amount to see how much interest and time you could save. Even a small top-up compounds into meaningful savings.`,
      chart: {
        type: "line",
        title: "Balance: normal vs. accelerated",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "normal", label: "Normal", color: "--chart-3" },
          { key: "accelerated", label: "With extra", color: "--chart-1" },
        ],
      },
    };
  },
  formula: {
    heading: "Why extra payments work so hard",
    expression: "Every extra rupee skips all the future interest it would have accrued",
    body: "Because interest is charged on the balance, reducing the balance early avoids compounding interest on that amount for the entire remaining term. The saving is largest when the rate is high and the loan is young.",
    variables: [
      { symbol: "Extra", meaning: "additional principal paid each month" },
      { symbol: "r", meaning: "monthly interest rate" },
      { symbol: "Balance", meaning: "outstanding principal at any point" },
    ],
  },
  explanation: [
    "Extra payments go straight to principal, so they permanently remove that amount from the balance that future interest is charged on. The effect snowballs: a smaller balance means less interest, which means more of every future payment attacks principal.",
    "The return on prepaying is effectively your loan's interest rate, guaranteed and tax-consideration aside. On a high-rate loan this often beats what you could reliably earn by investing the same money elsewhere.",
    "Prepaying earlier saves more than prepaying later, because the money avoids more months of compounding. If cash flow is tight, even irregular top-ups when you can afford them still help.",
  ],
  examples: [
    { title: "Modest top-up", scenario: "₹15,00,000 at 11% over 8 years, plus ₹5,000/month.", result: "Clears well over a year early and saves a sizeable chunk of interest." },
    { title: "Aggressive payoff", scenario: "The same loan with ₹15,000 extra per month.", result: "Payoff time drops dramatically and interest saved multiplies." },
    { title: "High-rate loan", scenario: "A 16% personal loan with extra payments.", result: "Savings are even larger, because more interest is avoided per rupee of principal cleared." },
  ],
  faq: [
    { q: "Should I prepay my loan or invest instead?", a: "If your loan rate is higher than the after-tax return you can reliably earn, prepaying usually wins because the saving is guaranteed. For low-rate loans, investing may come out ahead." },
    { q: "Do lenders charge a prepayment penalty?", a: "Some do, especially on fixed-rate loans. Check your agreement — floating-rate retail loans are often penalty-free for prepayment." },
    { q: "Is it better to reduce the EMI or the tenure?", a: "Reducing the tenure (keeping the EMI the same) saves the most interest. Reducing the EMI helps monthly cash flow but saves less overall." },
    { q: "Does a one-time lump sum help too?", a: "Yes. A single large prepayment early in the loan can save substantial interest. This tool models a recurring extra payment, but the principle is the same." },
    { q: "Will extra payments hurt my credit?", a: "No. Paying down debt faster generally helps your credit profile by lowering your outstanding balances." },
  ],
  related: ["loan", "amortization", "mortgage", "compound-interest"],
};
