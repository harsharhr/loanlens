import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const mortgage: CalculatorConfig = {
  id: "mortgage",
  slug: "mortgage",
  title: "Mortgage Calculator",
  tagline: "Estimate your home loan payment, down payment and total cost.",
  intro:
    "Buying a home is the biggest loan most people ever take. This calculator works out your monthly mortgage payment from the property price, down payment, interest rate and term — and shows the total interest over the life of the loan.",
  category: "loans",
  featured: true,
  keywords: ["mortgage calculator", "home loan calculator", "house payment", "down payment", "home loan EMI"],
  inputs: [
    { name: "price", label: "Property price", kind: "currency", defaultValue: 8000000, min: 100000, max: 500000000, step: 100000, slider: true },
    { name: "downPct", label: "Down payment", kind: "percent", defaultValue: 20, min: 0, max: 90, step: 1, slider: true, hint: "As a percentage of the property price." },
    { name: "rate", label: "Annual interest rate", kind: "percent", defaultValue: 8.5, min: 1, max: 20, step: 0.05, slider: true },
    { name: "years", label: "Loan term", kind: "number", defaultValue: 20, min: 5, max: 35, step: 1, slider: true, suffix: "yrs" },
  ],
  compute: (v) => {
    const { price, downPct, rate, years } = v;
    const downPayment = price * (downPct / 100);
    const principal = price - downPayment;
    const months = Math.round(years * 12);
    const emi = levelPayment(principal, rate, months);
    const totalPaid = emi * months;
    const totalInterest = totalPaid - principal;

    const schedule = amortizationSchedule(principal, rate, months);
    const rows: Array<Record<string, number>> = [];
    let cumInterest = 0;
    let cumPrincipal = 0;
    for (let y = 1; y <= years; y++) {
      const slice = schedule.slice((y - 1) * 12, y * 12);
      cumPrincipal += slice.reduce((s, r) => s + r.principal, 0);
      cumInterest += slice.reduce((s, r) => s + r.interest, 0);
      const bal = slice.length ? slice[slice.length - 1].balance : 0;
      rows.push({ x: y, year: y, balance: Math.round(bal), interestPaid: Math.round(cumInterest), principalPaid: Math.round(cumPrincipal) });
    }

    return {
      metrics: [
        { label: "Monthly payment", value: emi, format: "currency", primary: true, tone: "brand" },
        { label: "Down payment", value: downPayment, format: "currency", tone: "neutral" },
        { label: "Loan amount", value: principal, format: "currency", tone: "neutral" },
        { label: "Total interest", value: totalInterest, format: "currency", tone: "warning" },
      ],
      interpretation: `With ${downPct}% down (${Math.round(downPayment).toLocaleString("en-IN")}), you'd borrow ${Math.round(principal).toLocaleString("en-IN")} and pay about ${Math.round(emi).toLocaleString("en-IN")} a month for ${years} years. Over the full term, interest alone comes to roughly ${Math.round(totalInterest).toLocaleString("en-IN")}.`,
      chart: {
        type: "area",
        title: "Outstanding balance over time",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "balance", label: "Balance", color: "--chart-3" }],
      },
      table: {
        title: "Yearly summary",
        previewRows: 8,
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
    heading: "How the payment is derived",
    expression: "Loan = Price − Down;   Payment = Loan · r(1+r)ⁿ / ((1+r)ⁿ − 1)",
    body: "The down payment reduces the amount financed; the rest is a standard amortising loan. A larger down payment means a smaller loan, a lower payment and less total interest.",
    variables: [
      { symbol: "Price", meaning: "purchase price of the property" },
      { symbol: "Down", meaning: "up-front cash payment" },
      { symbol: "r", meaning: "monthly interest rate" },
      { symbol: "n", meaning: "number of monthly payments" },
    ],
  },
  explanation: [
    "Your mortgage payment is driven by three things: how much you borrow, the interest rate, and the term. This calculator focuses on principal and interest — the core of the payment.",
    "A bigger down payment lowers everything: the loan, the monthly payment and the lifetime interest. It can also help you qualify for a better rate and avoid mortgage insurance in markets that require it.",
    "Property taxes, home insurance and maintenance are real ownership costs on top of this payment. Budget for them separately so the payment shown here doesn't understate the true cost of owning.",
  ],
  examples: [
    { title: "Standard purchase", scenario: "₹80,00,000 home, 20% down, 8.5% for 20 years.", result: "Loan of ₹64,00,000; payment near ₹55,500/month." },
    { title: "Bigger deposit", scenario: "The same home with 30% down.", result: "Smaller loan, lower payment, and tens of lakhs less interest over the term." },
    { title: "Shorter term", scenario: "₹64,00,000 loan over 15 years instead of 20.", result: "Higher monthly payment but substantially less total interest." },
  ],
  faq: [
    { q: "How much should I put down?", a: "20% is a common benchmark that lowers your loan and often unlocks better terms, but the right amount depends on your savings, the rate on offer, and your emergency buffer." },
    { q: "Does this include taxes and insurance?", a: "No. It shows principal and interest only. Add property tax, insurance and maintenance separately for a full ownership budget." },
    { q: "Should I choose a shorter or longer term?", a: "A shorter term costs less overall but raises the monthly payment. Pick the shortest term whose payment you can comfortably sustain." },
    { q: "What if interest rates change?", a: "This assumes a fixed rate. On a floating-rate mortgage the payment or term adjusts when the benchmark rate moves." },
    { q: "Can prepaying help?", a: "Yes — extra payments reduce the balance and can save large amounts of interest. Model it with the Loan Payoff calculator." },
  ],
  related: ["loan", "amortization", "loan-payoff", "savings-goal"],
};
