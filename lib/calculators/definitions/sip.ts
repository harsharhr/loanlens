import type { CalculatorConfig } from "../types";
import { FREQUENCY, futureValueSeries } from "../utils";

export const sip: CalculatorConfig = {
  id: "sip",
  slug: "sip",
  title: "SIP Calculator",
  tagline: "Project the maturity value of a monthly systematic investment plan.",
  intro:
    "A Systematic Investment Plan (SIP) invests a fixed amount every month into a mutual fund. This calculator estimates what those disciplined monthly investments could grow to, based on an assumed annual return.",
  category: "investing",
  featured: true,
  keywords: ["SIP calculator", "mutual fund", "monthly investment", "systematic investment plan", "sip returns"],
  inputs: [
    { name: "monthly", label: "Monthly investment", kind: "currency", defaultValue: 10000, min: 500, max: 1000000, step: 500, slider: true },
    { name: "rate", label: "Expected annual return", kind: "percent", defaultValue: 12, min: 1, max: 30, step: 0.5, slider: true, hint: "Long-run equity funds are often modelled at 10–12%." },
    { name: "years", label: "Investment period", kind: "number", defaultValue: 15, min: 1, max: 40, step: 1, slider: true, suffix: "yrs" },
    { name: "stepUp", label: "Annual step-up", kind: "percent", defaultValue: 0, min: 0, max: 25, step: 1, hint: "Increase your SIP by this % each year (optional)." },
  ],
  compute: (v) => {
    const { monthly, rate, years, stepUp } = v;
    const rMonthly = rate / 100 / 12;

    // Simulate month by month so annual step-up is exact.
    let balance = 0;
    let invested = 0;
    let currentSip = monthly;
    const rows: Array<Record<string, number>> = [];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + rMonthly) + currentSip;
        invested += currentSip;
      }
      rows.push({ x: y, year: y, invested: Math.round(invested), interest: Math.round(balance - invested), balance: Math.round(balance) });
      currentSip = currentSip * (1 + stepUp / 100);
    }
    const maturity = balance;
    const gains = maturity - invested;

    return {
      metrics: [
        { label: "Maturity value", value: maturity, format: "currency", primary: true, tone: "brand" },
        { label: "Total invested", value: invested, format: "currency", tone: "neutral" },
        { label: "Estimated gains", value: gains, format: "currency", tone: "success" },
        { label: "Wealth ratio", value: invested > 0 ? maturity / invested : 0, format: "number", note: "× invested", tone: "neutral" },
      ],
      interpretation: `Investing ${stepUp > 0 ? `a ${monthly.toLocaleString("en-IN")} SIP stepped up ${stepUp}% a year` : `a fixed monthly SIP`} for ${years} years could grow your contributions into the maturity value above, assuming a steady ${rate}% annual return. Gains overtake contributions as the horizon lengthens.`,
      chart: {
        type: "area",
        title: "Invested vs. gains",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "invested", label: "Invested", color: "--chart-1" },
          { key: "interest", label: "Gains", color: "--chart-2" },
        ],
      },
      table: {
        title: "Year-by-year growth",
        previewRows: 8,
        columns: [
          { key: "year", label: "Year", format: "number" },
          { key: "invested", label: "Invested", format: "currency" },
          { key: "interest", label: "Gains", format: "currency" },
          { key: "balance", label: "Value", format: "currency" },
        ],
        rows,
      },
    };
  },
  formula: {
    heading: "How SIP maturity is calculated",
    expression: "M = P · [((1 + i)^n − 1) / i] · (1 + i)",
    body: "Each monthly instalment is a future-value annuity. i is the monthly rate and n is the number of instalments. A step-up SIP is modelled by increasing P once per year.",
    variables: [
      { symbol: "M", meaning: "maturity value" },
      { symbol: "P", meaning: "monthly SIP amount" },
      { symbol: "i", meaning: "monthly rate = annual return ÷ 12" },
      { symbol: "n", meaning: "total number of monthly instalments" },
    ],
  },
  explanation: [
    "An SIP spreads your investing across time, so you buy more units when prices are low and fewer when they are high. This rupee-cost averaging removes the pressure of timing the market.",
    "Because each instalment compounds for a different length of time, the earliest contributions do the most work. Starting even a few years sooner has an outsized effect on the final corpus.",
    "A step-up SIP raises your monthly amount each year — usually in line with salary growth. Even a modest 10% annual step-up can dramatically increase the maturity value over a long horizon.",
  ],
  examples: [
    { title: "Beginner SIP", scenario: "₹10,000/month at 12% for 15 years.", result: "About ₹50 lakh, of which roughly ₹32 lakh is gains on ₹18 lakh invested." },
    { title: "Long horizon", scenario: "₹10,000/month at 12% for 25 years.", result: "Crosses ₹1.8 crore — the extra decade more than triples the corpus." },
    { title: "Step-up power", scenario: "₹10,000/month with a 10% annual step-up at 12% for 20 years.", result: "Substantially higher than a flat SIP because contributions rise with income." },
  ],
  faq: [
    { q: "What return should I assume for an SIP?", a: "Equity mutual funds are often modelled at 10–12% over long periods, but returns vary year to year and are not guaranteed. Use a conservative figure for planning." },
    { q: "Is SIP better than a lump sum?", a: "SIPs reduce timing risk through averaging and suit regular earners. A lump sum can outperform in a rising market but exposes you fully to entry-point risk." },
    { q: "What is a step-up SIP?", a: "It automatically increases your monthly investment by a set percentage each year, helping your investing keep pace with rising income and inflation." },
    { q: "Are SIP returns taxed?", a: "Yes. Gains from equity funds are subject to capital-gains tax depending on holding period and local rules. This calculator shows pre-tax figures." },
    { q: "Can I stop or pause an SIP?", a: "Most SIPs can be paused or stopped without penalty. Stopping early, however, forfeits the compounding you would have earned on future instalments." },
  ],
  related: ["compound-interest", "cagr", "retirement", "savings-goal"],
};
