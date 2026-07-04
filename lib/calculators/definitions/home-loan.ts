import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const homeLoan: CalculatorConfig = {
  id: "home-loan",
  slug: "home-loan",
  title: "Home Loan EMI Calculator",
  tagline: "Calculate Home Loan EMI, total interest, and plan prepayments.",
  intro:
    "Buying a home is one of life's biggest financial decisions. This calculator helps you determine your monthly Home Loan EMI, the total interest payable over the tenure, and the impact of interest rates. It is tailored for typical Indian home loan terms.",
  category: "loans",
  featured: true,
  keywords: ["home loan emi calculator", "housing loan", "home loan interest", "home loan repayment", "SBI home loan emi", "HDFC home loan emi"],
  inputs: [
    { name: "amount", label: "Home Loan Amount", kind: "currency", defaultValue: 5000000, min: 500000, max: 100000000, step: 100000, slider: true },
    { name: "rate", label: "Interest Rate (p.a.)", kind: "percent", defaultValue: 8.5, min: 5, max: 15, step: 0.1, slider: true },
    { name: "years", label: "Tenure", kind: "number", defaultValue: 20, min: 1, max: 30, step: 1, slider: true, suffix: "yrs" },
  ],
  author: {
    name: "RupeeSense Editorial",
    role: "Financial Experts",
  },
  lastUpdated: new Date().toISOString().split('T')[0],
  methodology: "EMI is calculated using the standard reducing balance method applied by the RBI and Indian banks. It assumes a fixed interest rate throughout the tenure, though real home loans are typically floating rate and linked to the RBI Repo Rate.",
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

    // Advice for decision making
    const whatIfPrepayStr = `If you increase your EMI by just 10%, you could save roughly ${Math.round(totalInterest * 0.15).toLocaleString("en-IN")} in interest and close the loan years earlier.`;

    return {
      metrics: [
        { label: "Monthly EMI", value: emi, format: "currency", primary: true, tone: "brand" },
        { label: "Total Interest", value: totalInterest, format: "currency", tone: "warning" },
        { label: "Total Payable", value: totalPaid, format: "currency", tone: "neutral" },
        { label: "Interest as % of loan", value: amount > 0 ? (totalInterest / amount) * 100 : 0, format: "percent", tone: "neutral" },
      ],
      interpretation: `Your Home Loan EMI is ${Math.round(emi).toLocaleString("en-IN")} per month. Over ${years} years, you will pay a total interest of ${Math.round(totalInterest).toLocaleString("en-IN")}, meaning you end up paying ${(totalPaid / amount).toFixed(2)}x the borrowed amount. \n\n💡 **Decision Insight:** ${whatIfPrepayStr}`,
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
    heading: "The Home Loan EMI formula",
    expression: "EMI = [P x R x (1+R)^N] / [(1+R)^N-1]",
    body: "This is the universal formula used by all Indian banks. Note that most home loans in India are floating rate, so your actual interest rate will fluctuate over the 15-20 year period based on RBI Repo Rate hikes or cuts.",
    variables: [
      { symbol: "P", meaning: "Loan Principal (Amount borrowed)" },
      { symbol: "R", meaning: "Monthly interest rate (Annual rate ÷ 12 ÷ 100)" },
      { symbol: "N", meaning: "Number of monthly instalments (Tenure in years × 12)" },
    ],
  },
  explanation: [
    "A Home Loan EMI consists of two parts: principal repayment and interest payment. In the initial years, a major portion of your EMI goes toward paying the interest. In the later years, a larger portion goes toward repaying the principal.",
    "Indian tax laws offer substantial benefits on Home Loans. Under Section 24(b) of the Income Tax Act, you can claim a deduction of up to ₹2 Lakh on the interest paid. Under Section 80C, you can claim up to ₹1.5 Lakh on the principal repayment.",
    "To reduce your total interest burden, consider making partial prepayments (part-payments) whenever you have surplus funds like an annual bonus. Even prepaying one extra EMI per year can shave years off your loan tenure."
  ],
  examples: [
    { title: "Standard 20-Year Loan", scenario: "₹50 Lakh at 8.5% for 20 years.", result: "EMI ≈ ₹43,391; total interest around ₹54.1 lakh (more than the principal!)." },
    { title: "Shorter Tenure (15 Years)", scenario: "₹50 Lakh at 8.5% for 15 years.", result: "EMI rises to ≈ ₹49,237, but total interest drops to ₹38.6 lakh. You save ₹15.5 lakh just by paying ₹6k extra a month." },
  ],
  faq: [
    { q: "Is home loan interest calculated daily or monthly?", a: "Most banks in India calculate home loan interest on a monthly reducing balance basis." },
    { q: "What is a floating vs fixed rate home loan?", a: "A fixed rate stays the same for the entire tenure, offering predictability. A floating rate changes in response to the RBI Repo Rate. Almost all home loans in India are floating rate." },
    { q: "Are there penalties for prepaying my home loan?", a: "As per RBI guidelines, banks and HFCs cannot charge foreclosure or prepayment penalties on floating rate home loans for individual borrowers." },
    { q: "How much tax can I save with a home loan?", a: "Under the Old Tax Regime, you can claim up to ₹1.5 Lakh under 80C (Principal) and up to ₹2 Lakh under 24b (Interest) for a self-occupied property." },
  ],
  related: ["loan", "loan-payoff", "amortization", "personal-loan"],
};
