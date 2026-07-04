import type { CalculatorConfig } from "../types";

export const rd: CalculatorConfig = {
  id: "rd",
  slug: "rd",
  title: "RD Calculator",
  tagline: "Estimate the maturity of a monthly recurring deposit.",
  intro:
    "A Recurring Deposit (RD) lets you save a fixed amount every month at a fixed rate — ideal for building a habit. This calculator estimates the maturity value using the quarterly compounding banks apply to RDs.",
  category: "savings",
  featured: false,
  keywords: ["RD calculator", "recurring deposit calculator", "rd maturity", "monthly deposit", "post office rd"],
  inputs: [
    { name: "monthly", label: "Monthly deposit", kind: "currency", defaultValue: 5000, min: 100, max: 1000000, step: 500, slider: true },
    { name: "rate", label: "Interest rate (p.a.)", kind: "percent", defaultValue: 6.7, min: 1, max: 12, step: 0.05, slider: true },
    { name: "months", label: "Tenure", kind: "number", defaultValue: 60, min: 6, max: 120, step: 6, slider: true, suffix: "months" },
  ],
  compute: (v) => {
    const { monthly, rate, months } = v;
    // Banks compound RD quarterly. Simulate monthly deposits, compounding the
    // running balance once per quarter at rate/4.
    const quarterlyRate = rate / 400;
    let balance = 0;
    let invested = 0;
    const rows: Array<Record<string, number>> = [];
    for (let m = 1; m <= months; m++) {
      balance += monthly;
      invested += monthly;
      if (m % 3 === 0) balance *= 1 + quarterlyRate;
      if (m % 12 === 0 || m === months) {
        rows.push({ x: Math.round(m / 12 * 10) / 10, invested: Math.round(invested), interest: Math.round(balance - invested) });
      }
    }
    const maturity = balance;
    const interest = maturity - invested;

    return {
      metrics: [
        { label: "Maturity amount", value: maturity, format: "currency", primary: true, tone: "brand" },
        { label: "Total deposited", value: invested, format: "currency", tone: "neutral" },
        { label: "Interest earned", value: interest, format: "currency", tone: "success" },
        { label: "Monthly deposit", value: monthly, format: "currency", tone: "neutral" },
      ],
      interpretation: `Depositing ${Math.round(monthly).toLocaleString("en-IN")} a month for ${months} months builds ${Math.round(maturity).toLocaleString("en-IN")} at ${rate}%. Because early deposits compound for longer, the interest portion grows faster in later months. RD interest is taxable at your slab.`,
      chart: {
        type: "area",
        title: "Deposited vs. interest",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "invested", label: "Deposited", color: "--chart-1" },
          { key: "interest", label: "Interest", color: "--chart-2" },
        ],
      },
    };
  },
  formula: {
    heading: "How RD maturity works",
    expression: "Each monthly deposit compounds quarterly until maturity",
    body: "Every instalment earns interest for a different length of time. The bank compounds the running balance quarterly, so the first deposit earns the most and the last earns the least.",
    variables: [
      { symbol: "P", meaning: "monthly deposit amount" },
      { symbol: "r", meaning: "annual rate (compounded quarterly)" },
      { symbol: "n", meaning: "number of monthly instalments" },
    ],
  },
  explanation: [
    "A recurring deposit is like an FD you build one month at a time. You commit a fixed monthly amount for a chosen tenure, and the bank pays a fixed rate compounded quarterly.",
    "Because each instalment compounds for a different duration, an RD's return is a little lower than putting the full amount in an FD up front — but it suits people saving from monthly income rather than a lump sum.",
    "Missing an instalment usually attracts a small penalty. Like FDs, RD interest is taxable at your slab, and TDS rules apply once total interest crosses the annual threshold.",
  ],
  examples: [
    { title: "5-year RD", scenario: "₹5,000/month at 6.7% for 60 months.", result: "Matures to roughly ₹3.56 lakh on ₹3 lakh deposited." },
    { title: "Short goal", scenario: "₹10,000/month at 6.5% for 12 months.", result: "About ₹1.24 lakh, including a few thousand in interest." },
    { title: "Longer horizon", scenario: "₹5,000/month for 120 months.", result: "The interest share is far larger thanks to longer compounding." },
  ],
  faq: [
    { q: "How is RD interest calculated?", a: "Banks compound RD interest quarterly. Each monthly instalment earns interest for the remaining tenure, so earlier deposits earn more." },
    { q: "Is RD better than SIP?", a: "RDs are guaranteed and low-risk; SIPs in equity funds can earn more over long periods but fluctuate. RDs suit short-term, capital-safe goals." },
    { q: "What if I miss a monthly deposit?", a: "Most banks charge a small penalty per missed instalment and may close the RD after several defaults." },
    { q: "Is RD interest taxable?", a: "Yes, at your income-tax slab. TDS is deducted once total interest crosses the annual threshold, similar to fixed deposits." },
    { q: "Can I withdraw early?", a: "Premature closure is usually allowed with a penalty and interest recalculated for the completed period." },
  ],
  related: ["fd", "sip", "ppf", "savings-goal"],
};
