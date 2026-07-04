import type { CalculatorConfig } from "../types";

export const ppf: CalculatorConfig = {
  id: "ppf",
  slug: "ppf",
  title: "PPF Calculator",
  tagline: "Project your Public Provident Fund corpus at maturity.",
  intro:
    "The Public Provident Fund (PPF) is a 15-year, government-backed savings scheme with tax-free interest and EEE tax status. This calculator projects your maturity corpus from a fixed yearly investment at the current PPF rate.",
  category: "savings",
  featured: true,
  keywords: ["PPF calculator", "public provident fund", "ppf maturity", "ppf interest", "tax free investment"],
  inputs: [
    { name: "yearly", label: "Yearly investment", kind: "currency", defaultValue: 150000, min: 500, max: 150000, step: 5000, slider: true, hint: "Max ₹1.5 lakh per financial year." },
    { name: "rate", label: "PPF interest rate", kind: "percent", defaultValue: 7.1, min: 4, max: 12, step: 0.1, slider: true, hint: "Government-set, currently 7.1% p.a." },
    { name: "years", label: "Duration", kind: "number", defaultValue: 15, min: 15, max: 50, step: 5, slider: true, suffix: "yrs", options: [
      { label: "15 years", value: 15 },
      { label: "20 years", value: 20 },
      { label: "25 years", value: 25 },
      { label: "30 years", value: 30 },
    ] },
  ],
  compute: (v) => {
    const { yearly, rate, years } = v;
    // PPF compounds annually; deposit assumed at the start of each year.
    let balance = 0;
    let invested = 0;
    const rows: Array<Record<string, number>> = [];
    for (let y = 1; y <= years; y++) {
      balance = (balance + yearly) * (1 + rate / 100);
      invested += yearly;
      rows.push({ x: y, invested: Math.round(invested), interest: Math.round(balance - invested), balance: Math.round(balance) });
    }
    const maturity = balance;
    const interest = maturity - invested;

    return {
      metrics: [
        { label: "Maturity value", value: maturity, format: "currency", primary: true, tone: "brand" },
        { label: "Total invested", value: invested, format: "currency", tone: "neutral" },
        { label: "Interest earned", value: interest, format: "currency", note: "fully tax-free", tone: "success" },
        { label: "Tax saved (80C)", value: Math.min(yearly, 150000) * 0.3 * Math.min(years, 15), format: "currency", note: "≈ at 30% slab", tone: "neutral" },
      ],
      interpretation: `Investing ${Math.round(yearly).toLocaleString("en-IN")} a year for ${years} years at ${rate}% builds a tax-free corpus of ${Math.round(maturity).toLocaleString("en-IN")}. PPF enjoys EEE status — your contribution qualifies for 80C, and both the interest and the maturity amount are entirely tax-free.`,
      chart: {
        type: "area",
        title: "Invested vs. tax-free interest",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "invested", label: "Invested", color: "--chart-1" },
          { key: "interest", label: "Interest", color: "--chart-2" },
        ],
      },
      table: {
        title: "Year-by-year balance",
        previewRows: 8,
        columns: [
          { key: "x", label: "Year", format: "number" },
          { key: "invested", label: "Invested", format: "currency" },
          { key: "interest", label: "Interest", format: "currency" },
          { key: "balance", label: "Balance", format: "currency" },
        ],
        rows,
      },
    };
  },
  formula: {
    heading: "How the PPF corpus grows",
    expression: "Balanceₖ = (Balanceₖ₋₁ + Deposit) × (1 + r)",
    body: "Each year's deposit is added to the running balance and the whole amount earns the PPF rate, compounded annually and tax-free.",
    variables: [
      { symbol: "Deposit", meaning: "yearly contribution (max ₹1.5 lakh)" },
      { symbol: "r", meaning: "PPF interest rate (annual)" },
      { symbol: "k", meaning: "year number, 1 to tenure" },
    ],
  },
  explanation: [
    "PPF is one of India's most tax-efficient savings tools. It carries EEE status: contributions are deductible under Section 80C, the interest is tax-free, and the maturity amount is tax-free too — rare among fixed-income options.",
    "The base tenure is 15 financial years, extendable in blocks of 5. The interest rate is set by the government each quarter, so it can change; this calculator lets you model different rates. Deposits are capped at ₹1.5 lakh per year.",
    "Because interest compounds annually and is never taxed, the corpus in the later years grows sharply. Depositing early in the financial year (before the 5th of the month) maximises the interest credited.",
  ],
  examples: [
    { title: "Full 15-year run", scenario: "₹1,50,000/year at 7.1% for 15 years.", result: "Maturity around ₹40.7 lakh, all tax-free." },
    { title: "Modest saver", scenario: "₹50,000/year at 7.1% for 15 years.", result: "About ₹13.5 lakh — proportionally the same growth." },
    { title: "Extended tenure", scenario: "₹1,50,000/year at 7.1% for 25 years.", result: "The corpus more than doubles versus 15 years, thanks to tax-free compounding." },
  ],
  faq: [
    { q: "Is PPF interest really tax-free?", a: "Yes. PPF has EEE status — contributions qualify for Section 80C, and both the annual interest and the final maturity amount are exempt from tax." },
    { q: "What is the maximum I can invest?", a: "₹1.5 lakh per financial year across all your PPF accounts. Deposits above this earn no interest and aren't eligible for 80C." },
    { q: "Can I withdraw before 15 years?", a: "Partial withdrawals are allowed from year 7, and loans from year 3. Full withdrawal is at maturity (15 years), extendable in 5-year blocks." },
    { q: "Does the PPF rate change?", a: "Yes. The government reviews it quarterly, so future returns may differ. This calculator assumes a constant rate for the whole tenure." },
    { q: "Is PPF better than ELSS?", a: "PPF is risk-free and tax-free but lower-returning; ELSS is market-linked with a shorter 3-year lock-in and potentially higher (taxable) returns. Many investors use both." },
  ],
  related: ["epf", "fd", "compound-interest", "income-tax"],
};
