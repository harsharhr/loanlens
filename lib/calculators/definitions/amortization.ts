import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const amortization: CalculatorConfig = {
  id: "amortization",
  slug: "amortization",
  title: "Amortization Calculator",
  tagline: "See a full month-by-month schedule of every payment.",
  intro:
    "An amortization schedule breaks a loan into its individual payments, showing how much of each instalment goes to interest versus principal and how the balance falls to zero. It's the clearest way to understand where your money actually goes.",
  category: "loans",
  featured: false,
  keywords: ["amortization calculator", "amortization schedule", "loan schedule", "principal and interest breakdown"],
  inputs: [
    { name: "amount", label: "Loan amount", kind: "currency", defaultValue: 2500000, min: 10000, max: 100000000, step: 10000, slider: true },
    { name: "rate", label: "Annual interest rate", kind: "percent", defaultValue: 9, min: 1, max: 30, step: 0.1, slider: true },
    { name: "years", label: "Tenure", kind: "number", defaultValue: 10, min: 1, max: 30, step: 1, slider: true, suffix: "yrs" },
  ],
  compute: (v) => {
    const { amount, rate, years } = v;
    const months = Math.round(years * 12);
    const emi = levelPayment(amount, rate, months);
    const schedule = amortizationSchedule(amount, rate, months);
    const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);

    const monthlyRows = schedule.map((r) => ({
      period: r.period,
      payment: Math.round(r.payment),
      principal: Math.round(r.principal),
      interest: Math.round(r.interest),
      balance: Math.round(r.balance),
    }));

    // chart: interest vs principal share over time (yearly)
    const rows: Array<Record<string, number>> = [];
    for (let y = 1; y <= years; y++) {
      const slice = schedule.slice((y - 1) * 12, y * 12);
      rows.push({
        x: y,
        principal: Math.round(slice.reduce((s, r) => s + r.principal, 0)),
        interest: Math.round(slice.reduce((s, r) => s + r.interest, 0)),
      });
    }

    return {
      metrics: [
        { label: "Monthly payment", value: emi, format: "currency", primary: true, tone: "brand" },
        { label: "Total interest", value: totalInterest, format: "currency", tone: "warning" },
        { label: "Total of payments", value: amount + totalInterest, format: "currency", tone: "neutral" },
        { label: "Number of payments", value: months, format: "number", tone: "neutral" },
      ],
      interpretation: `In the first payment, most of your ${Math.round(emi).toLocaleString("en-IN")} goes to interest; by the final payment almost all of it reduces principal. The schedule below shows the exact crossover.`,
      chart: {
        type: "bar",
        title: "Interest vs. principal each year",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "principal", label: "Principal", color: "--chart-1" },
          { key: "interest", label: "Interest", color: "--chart-5" },
        ],
      },
      table: {
        title: "Full amortization schedule",
        previewRows: 12,
        columns: [
          { key: "period", label: "Month", format: "number" },
          { key: "payment", label: "Payment", format: "currency" },
          { key: "principal", label: "Principal", format: "currency" },
          { key: "interest", label: "Interest", format: "currency" },
          { key: "balance", label: "Balance", format: "currency" },
        ],
        rows: monthlyRows,
      },
    };
  },
  formula: {
    heading: "How each row is built",
    expression: "Interestₖ = Balanceₖ₋₁ · r   →   Principalₖ = EMI − Interestₖ",
    body: "For every month, interest is charged on the previous balance, the rest of the fixed payment reduces principal, and the balance carries forward. Repeat until it reaches zero.",
    variables: [
      { symbol: "Balanceₖ₋₁", meaning: "outstanding balance before this payment" },
      { symbol: "r", meaning: "monthly interest rate" },
      { symbol: "EMI", meaning: "the fixed monthly payment" },
    ],
  },
  explanation: [
    "Amortization is the process of paying off a debt through regular equal payments. Each payment is split: the interest portion is the balance times the monthly rate, and whatever is left reduces the principal.",
    "Because the balance shrinks each month, the interest portion falls and the principal portion rises over time — even though the total payment stays constant. This is why extra payments early in the loan save the most interest.",
    "The schedule is also useful for tax and accounting: in many jurisdictions only the interest portion of certain loans is deductible, and the schedule tells you exactly how much that is each year.",
  ],
  examples: [
    { title: "Home loan", scenario: "₹25,00,000 at 9% for 10 years.", result: "Payment near ₹31,680/month; the interest share of each payment falls steadily from year one." },
    { title: "First vs. last payment", scenario: "Compare month 1 and the final month of the same loan.", result: "Month 1 is heavily interest; the final month is almost entirely principal." },
    { title: "Shorter term", scenario: "The same loan over 7 years instead of 10.", result: "Higher monthly payment, but far less total interest and a faster crossover to principal-heavy payments." },
  ],
  faq: [
    { q: "What does 'amortize' mean?", a: "To amortize a loan is to pay it off gradually through scheduled equal payments that cover both interest and principal." },
    { q: "Why is early interest so high?", a: "Interest is charged on the outstanding balance, which is largest at the start. As the balance falls, so does the interest portion of each payment." },
    { q: "How do prepayments change the schedule?", a: "A lump-sum prepayment reduces the balance immediately, cutting future interest and often shortening the loan. See the Loan Payoff calculator." },
    { q: "Is the payment really constant?", a: "For a standard fixed-rate loan, yes — only the split between interest and principal changes. Floating-rate loans recalculate when the rate changes." },
    { q: "Can I download the schedule?", a: "You can copy the table or share the calculation via its URL. A full export feature can be added on top of the same schedule data." },
  ],
  related: ["loan", "mortgage", "loan-payoff", "compound-interest"],
};
