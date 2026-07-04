import type { CalculatorConfig } from "../types";
import { levelPayment, amortizationSchedule } from "../utils";

export const personalLoan: CalculatorConfig = {
  id: "personal-loan",
  slug: "personal-loan",
  title: "Personal Loan EMI Calculator",
  tagline: "Estimate EMI and interest for unsecured personal loans.",
  intro:
    "Personal loans are unsecured, meaning they come with higher interest rates than home or car loans. Use this calculator to understand exactly how much your personal loan will cost you in EMI and total interest.",
  category: "loans",
  featured: false,
  keywords: ["personal loan emi calculator", "unsecured loan", "personal loan interest", "instant loan emi", "hdfc personal loan"],
  inputs: [
    { name: "amount", label: "Personal Loan Amount", kind: "currency", defaultValue: 500000, min: 50000, max: 5000000, step: 10000, slider: true },
    { name: "rate", label: "Interest Rate (p.a.)", kind: "percent", defaultValue: 12.5, min: 10, max: 36, step: 0.1, slider: true },
    { name: "years", label: "Tenure", kind: "number", defaultValue: 3, min: 1, max: 7, step: 1, slider: true, suffix: "yrs" },
  ],
  author: {
    name: "RupeeSense Editorial",
    role: "Financial Experts",
  },
  lastUpdated: new Date().toISOString().split('T')[0],
  methodology: "EMI is calculated on a reducing balance basis. Personal loans in India often also have a 1-3% processing fee upfront, which is not included in the EMI but affects your total cost.",
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

    return {
      metrics: [
        { label: "Monthly EMI", value: emi, format: "currency", primary: true, tone: "brand" },
        { label: "Total Interest", value: totalInterest, format: "currency", tone: "warning" },
        { label: "Total Payable", value: totalPaid, format: "currency", tone: "neutral" },
      ],
      interpretation: `Your Personal Loan EMI will be ${Math.round(emi).toLocaleString("en-IN")}. Over the ${years}-year tenure, you will pay a total interest of ${Math.round(totalInterest).toLocaleString("en-IN")}. \n\n💡 **Decision Insight:** Personal loans have high interest rates. If you have existing fixed deposits or mutual funds, consider taking a loan against those assets instead; the interest rate will be significantly lower (usually 1-2% above the FD rate).`,
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
    heading: "Personal Loan EMI Formula",
    expression: "EMI = [P x R x (1+R)^N] / [(1+R)^N-1]",
    body: "This is the mathematical formula for equating your monthly payments so that the principal and interest are entirely paid off by the last month.",
    variables: [
      { symbol: "P", meaning: "Loan Principal (Amount)" },
      { symbol: "R", meaning: "Monthly interest rate (Annual rate ÷ 1200)" },
      { symbol: "N", meaning: "Total number of months" },
    ],
  },
  explanation: [
    "Because personal loans are unsecured (no collateral), banks charge a higher interest rate to cover their risk. The rates typically range from 10% to 24% depending on your credit score and salary.",
    "A shorter tenure means higher EMIs but a much lower total interest payout. A longer tenure makes the EMI feel affordable but dramatically increases the profit you hand over to the bank.",
    "Don't forget to account for processing fees. A bank might offer a slightly lower interest rate but charge a 3% processing fee upfront. Always compare the APR (Annual Percentage Rate) or the net disbursed amount."
  ],
  examples: [
    { title: "Standard 3-Year Personal Loan", scenario: "₹5,00,000 at 12.5% for 3 years.", result: "EMI is ₹16,727. Total interest is ₹1.02 lakh." },
    { title: "High-Risk Profile", scenario: "₹2,00,000 at 18% for 5 years.", result: "EMI is ₹5,079. Total interest is ₹1.04 lakh (over 50% of the loan amount!)." },
  ],
  faq: [
    { q: "Is personal loan interest tax deductible in India?", a: "Generally, no. However, if the personal loan is used exclusively for business purposes or to purchase/renovate a home, you might be able to claim a deduction under specific sections." },
    { q: "Can I prepay a personal loan?", a: "Yes, but most Indian banks charge a prepayment penalty (lock-in period of 6-12 months and a penalty of 3-5% on the outstanding amount)." },
    { q: "Does CIBIL score affect personal loan interest rates?", a: "Yes, significantly. A CIBIL score above 750 can get you the lowest advertised rates, while a lower score will result in higher interest rates or loan rejection." },
  ],
  related: ["car-loan", "home-loan", "loan", "loan-payoff"],
};
