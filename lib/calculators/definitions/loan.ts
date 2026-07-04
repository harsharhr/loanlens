import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const loan: CalculatorConfig = {
  id: "loan",
  slug: "loan",
  title: "Loan Calculator",
  tagline: "Work out the EMI, total interest and true cost of any loan.",
  intro:
    "Whether it's a personal, car or education loan, this calculator turns a loan amount, interest rate and tenure into a fixed monthly instalment (EMI) and shows exactly how much interest you'll pay over the life of the loan.",
  category: "loans",
  featured: true,
  keywords: ["loan calculator", "EMI calculator", "personal loan", "car loan", "monthly payment"],
  inputs: [
    { name: "amount", label: "Loan amount", kind: "currency", defaultValue: 1000000, min: 10000, max: 100000000, step: 10000, slider: true },
    { name: "rate", label: "Annual interest rate", kind: "percent", defaultValue: 10.5, min: 1, max: 36, step: 0.1, slider: true },
    { name: "years", label: "Tenure", kind: "number", defaultValue: 5, min: 1, max: 30, step: 1, slider: true, suffix: "yrs" },
  ],
  compute: (v) => {
    const { amount, rate, years } = v;
    const months = Math.round(years * 12);
    const emi = levelPayment(amount, rate, months);
    const totalPaid = emi * months;
    const totalInterest = totalPaid - amount;

    const schedule = amortizationSchedule(amount, rate, months);
    // yearly aggregation for chart
    const rows: Array<Record<string, number>> = [];
    let cumPrincipal = 0;
    let cumInterest = 0;
    for (let y = 1; y <= years; y++) {
      const slice = schedule.slice((y - 1) * 12, y * 12);
      cumPrincipal += slice.reduce((s, r) => s + r.principal, 0);
      cumInterest += slice.reduce((s, r) => s + r.interest, 0);
      const bal = slice.length ? slice[slice.length - 1].balance : 0;
      rows.push({ x: y, year: y, principalPaid: Math.round(cumPrincipal), interestPaid: Math.round(cumInterest), balance: Math.round(bal) });
    }

    return {
      metrics: [
        { label: "Monthly EMI", value: emi, format: "currency", primary: true, tone: "brand" },
        { label: "Total interest", value: totalInterest, format: "currency", tone: "warning" },
        { label: "Total payable", value: totalPaid, format: "currency", tone: "neutral" },
        { label: "Interest as % of loan", value: amount > 0 ? (totalInterest / amount) * 100 : 0, format: "percent", tone: "neutral" },
      ],
      interpretation: `You'll pay a fixed ${Math.round(emi).toLocaleString("en-IN")} every month for ${months} months. Interest adds up to ${Math.round((totalInterest / amount) * 100)}% of what you borrowed — the longer the tenure, the lower the EMI but the higher the total interest.`,
      chart: {
        type: "area",
        title: "Principal vs. interest paid",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "principalPaid", label: "Principal paid", color: "--chart-1" },
          { key: "interestPaid", label: "Interest paid", color: "--chart-5" },
        ],
      },
      table: {
        title: "Yearly summary",
        previewRows: 6,
        columns: [
          { key: "year", label: "Year", format: "number" },
          { key: "principalPaid", label: "Principal (cum.)", format: "currency" },
          { key: "interestPaid", label: "Interest (cum.)", format: "currency" },
          { key: "balance", label: "Balance", format: "currency" },
        ],
        rows,
      },
    };
  },
  formula: {
    heading: "The EMI formula",
    expression: "EMI = P · r · (1 + r)^n / ((1 + r)^n − 1)",
    body: "Each equal monthly payment covers that month's interest first; the remainder reduces the outstanding principal. Early payments are mostly interest; later ones are mostly principal.",
    variables: [
      { symbol: "P", meaning: "loan principal" },
      { symbol: "r", meaning: "monthly interest rate = annual rate ÷ 12" },
      { symbol: "n", meaning: "number of monthly instalments" },
    ],
  },
  explanation: [
    "An EMI (Equated Monthly Instalment) keeps your payment constant while the split between interest and principal shifts over time. In the early months most of your payment is interest, because the outstanding balance is large.",
    "Extending the tenure lowers the monthly EMI but increases total interest, sometimes dramatically. Shortening it does the opposite. The right balance depends on your monthly cash flow versus your total cost tolerance.",
    "The interest rate has the largest single effect on cost. Even a one-percentage-point difference on a large, long loan can change the total interest by a significant amount — always compare offers on APR, not just EMI.",
  ],
  examples: [
    { title: "Personal loan", scenario: "₹10,00,000 at 10.5% for 5 years.", result: "EMI ≈ ₹21,494; total interest around ₹2.9 lakh." },
    { title: "Car loan", scenario: "₹8,00,000 at 9% for 7 years.", result: "Lower EMI but noticeably more interest than a 5-year term for the same amount." },
    { title: "Rate matters", scenario: "The same ₹10,00,000 / 5-year loan at 14% instead of 10.5%.", result: "EMI and total interest both rise sharply — shop the rate hard." },
  ],
  faq: [
    { q: "What is an EMI?", a: "An Equated Monthly Instalment is the fixed amount you pay each month, covering both interest and principal, until the loan is fully repaid." },
    { q: "Does a longer tenure save money?", a: "It lowers each monthly payment but increases the total interest you pay, because the balance stays high for longer." },
    { q: "How can I reduce my total interest?", a: "Negotiate a lower rate, choose a shorter tenure, or make prepayments. Use the Loan Payoff calculator to see the impact of extra payments." },
    { q: "Is the interest rate here APR or flat?", a: "This uses the standard reducing-balance (APR) method, where interest is charged only on the outstanding balance — the norm for most retail loans." },
    { q: "Are processing fees included?", a: "No. The EMI reflects principal and interest only. Add any one-time fees separately when comparing offers." },
  ],
  related: ["amortization", "mortgage", "loan-payoff", "simple-interest"],
};
