import type { CalculatorConfig } from "../types";

export const epf: CalculatorConfig = {
  id: "epf",
  slug: "epf",
  title: "EPF Calculator",
  tagline: "Estimate your Employees' Provident Fund corpus at retirement.",
  intro:
    "The Employees' Provident Fund (EPF) is a retirement scheme where you and your employer each contribute a share of your basic salary every month. This calculator projects your EPF corpus at retirement, allowing for annual salary growth.",
  category: "retirement",
  featured: false,
  keywords: ["EPF calculator", "provident fund", "epf corpus", "pf calculator", "employee provident fund"],
  inputs: [
    { name: "basic", label: "Monthly basic + DA", kind: "currency", defaultValue: 40000, min: 5000, max: 1000000, step: 1000, slider: true },
    { name: "age", label: "Current age", kind: "number", defaultValue: 30, min: 18, max: 58, step: 1, slider: true, suffix: "yrs" },
    { name: "retireAge", label: "Retirement age", kind: "number", defaultValue: 58, min: 40, max: 60, step: 1, slider: true, suffix: "yrs" },
    { name: "rate", label: "EPF interest rate", kind: "percent", defaultValue: 8.25, min: 6, max: 10, step: 0.05, slider: true, hint: "EPFO-declared, currently 8.25% p.a." },
    { name: "growth", label: "Annual salary hike", kind: "percent", defaultValue: 6, min: 0, max: 20, step: 1, slider: true },
  ],
  compute: (v) => {
    const { basic, age, retireAge, rate, growth } = v;
    const years = Math.max(retireAge - age, 0);
    // Employee 12% + employer 3.67% to EPF (8.33% of employer share goes to EPS).
    const contribRate = 0.12 + 0.0367;
    const monthlyRate = rate / 100 / 12;

    let balance = 0;
    let contributed = 0;
    let salary = basic;
    const rows: Array<Record<string, number>> = [{ x: age, balance: 0, contributed: 0 }];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        const c = salary * contribRate;
        balance = balance * (1 + monthlyRate) + c;
        contributed += c;
      }
      rows.push({ x: age + y, balance: Math.round(balance), contributed: Math.round(contributed) });
      salary *= 1 + growth / 100;
    }
    const corpus = balance;
    const interest = corpus - contributed;

    return {
      metrics: [
        { label: "EPF corpus at retirement", value: corpus, format: "currency", primary: true, tone: "brand" },
        { label: "Total contributed", value: contributed, format: "currency", tone: "neutral" },
        { label: "Interest earned", value: interest, format: "currency", tone: "success" },
        { label: "Monthly contribution now", value: basic * contribRate, format: "currency", note: "you + employer", tone: "neutral" },
      ],
      interpretation: `On a ${Math.round(basic).toLocaleString("en-IN")} monthly basic, you and your employer together add about ${Math.round(basic * contribRate).toLocaleString("en-IN")} a month to EPF. With ${growth}% annual hikes and ${rate}% interest, your corpus by age ${retireAge} could reach ${Math.round(corpus).toLocaleString("en-IN")} — tax-free if you complete 5 years of continuous service.`,
      chart: {
        type: "area",
        title: "EPF corpus growth",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "contributed", label: "Contributed", color: "--chart-1" },
          { key: "balance", label: "Balance", color: "--chart-2" },
        ],
      },
    };
  },
  formula: {
    heading: "How EPF builds up",
    expression: "Monthly EPF = 12% (you) + 3.67% (employer) of basic + DA",
    body: "Both shares are credited monthly and earn the EPFO rate, compounded. The employer's remaining 8.33% goes to the pension scheme (EPS) and is not counted in this corpus.",
    variables: [
      { symbol: "Basic + DA", meaning: "monthly basic pay plus dearness allowance" },
      { symbol: "r", meaning: "EPFO-declared annual interest rate" },
      { symbol: "growth", meaning: "assumed annual increase in basic pay" },
    ],
  },
  explanation: [
    "EPF is a mandatory retirement scheme for most salaried employees. You contribute 12% of basic + DA, and your employer matches it — but 8.33% of the employer's share is diverted to the EPS pension, leaving 3.67% in your EPF, which is what compounds here.",
    "The EPFO declares the interest rate each year. Interest is credited annually on monthly running balances, and the corpus is tax-free provided you complete five years of continuous service before withdrawal.",
    "Salary hikes matter a lot: as your basic rises, so do the contributions, and later contributions compound on top of an already-large balance. Voluntary Provident Fund (VPF) lets you contribute even more at the same rate.",
  ],
  examples: [
    { title: "Mid-career start", scenario: "₹40,000 basic at 30, retire at 58, 8.25%, 6% hikes.", result: "A corpus running into the crores by retirement." },
    { title: "Higher basic", scenario: "₹80,000 basic with the same assumptions.", result: "Roughly double the corpus, since contributions scale with basic pay." },
    { title: "Bigger hikes", scenario: "10% annual hikes instead of 6%.", result: "A materially larger corpus, driven by faster-growing contributions." },
  ],
  faq: [
    { q: "How much goes into EPF each month?", a: "You contribute 12% of basic + DA; your employer adds 3.67% to EPF (the other 8.33% goes to the EPS pension), so about 15.67% of basic is credited to EPF." },
    { q: "Is EPF tax-free?", a: "Contributions qualify for 80C, interest is tax-free within limits, and the corpus is tax-free if withdrawn after five years of continuous service." },
    { q: "What interest rate does EPF pay?", a: "The EPFO declares it annually — recently around 8.25%. This calculator lets you model different rates since it can change." },
    { q: "What is VPF?", a: "Voluntary Provident Fund lets you contribute more than the mandatory 12% at the same EPF rate, a low-risk way to boost your retirement corpus." },
    { q: "Can I withdraw EPF early?", a: "Partial withdrawals are allowed for specific needs (housing, medical, education). Full withdrawal before five years may be taxable." },
  ],
  related: ["ppf", "retirement", "gratuity", "compound-interest"],
};
