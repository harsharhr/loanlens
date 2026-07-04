import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const carLoan: CalculatorConfig = {
  id: "car-loan",
  slug: "car-loan",
  title: "Car Loan EMI Calculator",
  tagline: "Plan your dream car purchase with accurate EMI estimates.",
  intro:
    "A car loan is a short-to-medium term commitment. This calculator helps you figure out the monthly EMI on your car loan and the total interest you'll pay. Find the sweet spot between an affordable EMI and the lowest total cost.",
  category: "loans",
  featured: false,
  keywords: ["car loan emi calculator", "auto loan calculator", "car finance", "vehicle loan", "sbi car loan emi"],
  inputs: [
    { name: "amount", label: "Car Loan Amount", kind: "currency", defaultValue: 800000, min: 100000, max: 10000000, step: 10000, slider: true },
    { name: "rate", label: "Interest Rate (p.a.)", kind: "percent", defaultValue: 9.0, min: 6, max: 20, step: 0.1, slider: true },
    { name: "years", label: "Tenure", kind: "number", defaultValue: 5, min: 1, max: 7, step: 1, slider: true, suffix: "yrs" },
  ],
  author: {
    name: "RupeeSense Editorial",
    role: "Financial Experts",
  },
  lastUpdated: new Date().toISOString().split('T')[0],
  methodology: "Calculates EMI using the standard reducing balance method. Most car loans in India use reducing balance, but beware of flat-rate loans offered by some dealers which cost significantly more.",
  compute: (v) => {
    const { amount, rate, years } = v;
    const months = Math.round(years * 12);
    const emi = levelPayment(amount, rate, months);
    const totalPaid = emi * months;
    const totalInterest = totalPaid - amount;

    const schedule = amortizationSchedule(amount, rate, months);
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

    const flatRateEquivalent = amount > 0 && years > 0 ? ((totalInterest / amount) * 100) / years : 0;

    return {
      metrics: [
        { label: "Monthly EMI", value: emi, format: "currency", primary: true, tone: "brand" },
        { label: "Total Interest", value: totalInterest, format: "currency", tone: "warning" },
        { label: "Total Payable", value: totalPaid, format: "currency", tone: "neutral" },
      ],
      interpretation: `Your Car Loan EMI is ${Math.round(emi).toLocaleString("en-IN")} for ${years} years. The total interest you pay will be ${Math.round(totalInterest).toLocaleString("en-IN")}. \n\n💡 **Decision Insight:** This reducing balance rate of ${rate}% is roughly equivalent to a flat interest rate of ${flatRateEquivalent.toFixed(2)}%. If a car dealer quotes a "flat rate" higher than this, you're better off taking a loan directly from a bank.`,
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
        previewRows: 4,
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
    heading: "Car Loan EMI Calculation",
    expression: "EMI = [P x R x (1+R)^N] / [(1+R)^N-1]",
    body: "This uses the standard formula where interest is calculated only on the remaining outstanding principal every month.",
    variables: [
      { symbol: "P", meaning: "Loan Principal (Amount)" },
      { symbol: "R", meaning: "Monthly interest rate (Annual rate ÷ 1200)" },
      { symbol: "N", meaning: "Number of monthly instalments (Tenure × 12)" },
    ],
  },
  explanation: [
    "Most car loans in India are offered for tenures of 3 to 7 years. The longer the tenure, the lower the monthly EMI, but the higher the total interest you pay to the bank.",
    "Unlike home loans, car loans depreciate. You are paying interest on an asset whose value is dropping. This is why financial experts recommend keeping the car loan tenure as short as you can afford.",
    "Beware of 'Flat Rate' car loan offers sometimes pitched at dealerships. A 7% flat rate is actually more expensive than a 10% reducing balance rate, because you keep paying interest on the full initial amount even as you repay it."
  ],
  examples: [
    { title: "Standard Hatchback", scenario: "₹6,00,000 loan at 9% for 5 years.", result: "EMI is ₹12,455. Total interest is ₹1.47 lakh." },
    { title: "Shorter Tenure", scenario: "The same ₹6,00,000 loan but for 3 years.", result: "EMI jumps to ₹19,079, but total interest drops to just ₹86k. You save over ₹60k in interest." },
  ],
  faq: [
    { q: "What is the maximum tenure for a car loan in India?", a: "Most banks in India offer a maximum car loan tenure of 7 years (84 months)." },
    { q: "Is a flat rate better than a reducing balance rate?", a: "No! Always insist on a reducing balance rate. A flat rate calculates interest on the original principal for the entire tenure, which effectively makes it much more expensive." },
    { q: "Can I prepay my car loan?", a: "Yes, but unlike floating rate home loans, banks often charge a prepayment penalty (around 2-5% of the outstanding principal) on car loans." },
  ],
  related: ["personal-loan", "loan", "home-loan"],
};
