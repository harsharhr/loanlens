import type { CalculatorConfig } from "../types";
import { realValue } from "../utils";

export const retirement: CalculatorConfig = {
  id: "retirement",
  slug: "retirement",
  title: "Retirement Calculator",
  tagline: "Project your retirement corpus and whether you're on track.",
  intro:
    "Retirement is the ultimate compounding goal. This calculator projects the corpus you'll accumulate from your current savings plus monthly contributions, and estimates how long that pot could last at your expected spending.",
  category: "retirement",
  featured: true,
  keywords: ["retirement calculator", "retirement corpus", "retirement planning", "pension calculator", "nest egg"],
  inputs: [
    { name: "age", label: "Current age", kind: "number", defaultValue: 30, min: 18, max: 70, step: 1, slider: true, suffix: "yrs" },
    { name: "retireAge", label: "Retirement age", kind: "number", defaultValue: 60, min: 40, max: 75, step: 1, slider: true, suffix: "yrs" },
    { name: "current", label: "Current savings", kind: "currency", defaultValue: 500000, min: 0, max: 1000000000, step: 50000, slider: true },
    { name: "monthly", label: "Monthly contribution", kind: "currency", defaultValue: 15000, min: 0, max: 5000000, step: 1000, slider: true },
    { name: "rate", label: "Return before retirement", kind: "percent", defaultValue: 11, min: 1, max: 20, step: 0.5, slider: true },
    { name: "spend", label: "Monthly spend in retirement", kind: "currency", defaultValue: 60000, min: 0, max: 5000000, step: 5000, slider: true, hint: "In today's money." },
  ],
  compute: (v) => {
    const { age, retireAge, current, monthly, rate, spend } = v;
    const years = Math.max(retireAge - age, 0);
    const months = Math.round(years * 12);
    const rMonthly = rate / 100 / 12;
    const inflation = 6; // long-run assumption for real-value framing

    // Accumulate corpus
    let bal = current;
    const rows: Array<Record<string, number>> = [{ x: age, corpus: Math.round(bal) }];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) bal = bal * (1 + rMonthly) + monthly;
      rows.push({ x: age + y, corpus: Math.round(bal) });
    }
    const corpus = bal;

    // Spending at retirement, inflated from today's money
    const futureSpendMonthly = spend * Math.pow(1 + inflation / 100, years);
    const annualSpend = futureSpendMonthly * 12;

    // How long the corpus lasts, drawing down with a conservative 6% post-retirement return
    const postRate = 0.06;
    let pot = corpus;
    let monthsLast = 0;
    const drawMonthly = futureSpendMonthly;
    const postMonthly = postRate / 12;
    while (pot > 0 && monthsLast < 12 * 60) {
      pot = pot * (1 + postMonthly) - drawMonthly;
      if (pot <= 0) break;
      monthsLast++;
    }
    const yearsLast = monthsLast / 12;
    const corpusTodayValue = realValue(corpus, inflation, years);

    return {
      metrics: [
        { label: "Retirement corpus", value: corpus, format: "currency", primary: true, tone: "brand" },
        { label: "In today's money", value: corpusTodayValue, format: "currency", note: `at ${inflation}% inflation`, tone: "neutral" },
        { label: "Corpus lasts", value: yearsLast, format: "years", note: `spending grows with inflation`, tone: yearsLast >= 30 ? "success" : "warning" },
        { label: "Years to invest", value: years, format: "number", tone: "neutral" },
      ],
      interpretation: years <= 0
        ? `Your retirement age must be greater than your current age. Adjust the ages to project a corpus.`
        : `By age ${retireAge} you could accumulate the corpus above. Drawing your inflation-adjusted spending, it would last roughly ${Math.round(yearsLast)} years${yearsLast < 30 ? " — consider saving more, retiring later, or trimming spending to close the gap." : ", which comfortably covers a long retirement."}`,
      chart: {
        type: "area",
        title: "Corpus growth to retirement",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "corpus", label: "Corpus", color: "--chart-1" }],
      },
    };
  },
  formula: {
    heading: "How the projection works",
    expression: "Corpus = Current·(1+i)ⁿ + PMT·[((1+i)ⁿ − 1)/i]",
    body: "The corpus is your current savings compounded, plus the future value of monthly contributions. Withdrawals in retirement are grown for inflation and drawn against the corpus at a conservative return.",
    variables: [
      { symbol: "Current", meaning: "savings you have today" },
      { symbol: "PMT", meaning: "monthly contribution" },
      { symbol: "i", meaning: "monthly return before retirement" },
      { symbol: "n", meaning: "months until retirement" },
    ],
  },
  explanation: [
    "Retirement planning has two phases: accumulation, where contributions and compounding build the pot, and drawdown, where you live off it. A healthy plan leaves the corpus large enough that withdrawals — which rise with inflation — don't exhaust it too soon.",
    "Time is the dominant factor. Because contributions early in your career compound for decades, starting even five years sooner can be worth more than large contributions late. The growth chart makes the back-loaded nature of compounding clear.",
    "Inflation quietly raises your future spending. A comfortable ₹60,000 a month today needs to be far more in nominal terms decades from now, which is why the corpus is also shown in today's purchasing power.",
  ],
  examples: [
    { title: "Early starter", scenario: "Age 30, retire at 60, ₹5,00,000 saved, ₹15,000/month at 11%.", result: "A multi-crore corpus, thanks to 30 years of compounding." },
    { title: "Late starter", scenario: "The same numbers starting at age 45.", result: "A much smaller corpus — the missing 15 years hurt disproportionately." },
    { title: "Higher savings", scenario: "Doubling the monthly contribution to ₹30,000.", result: "The corpus and the number of years it lasts both rise sharply." },
  ],
  faq: [
    { q: "How big should my retirement corpus be?", a: "A common rule of thumb is 25–30× your annual retirement spending, but the right figure depends on your longevity, returns and other income like a pension." },
    { q: "What return should I assume?", a: "A diversified portfolio is often modelled at around 10–12% before retirement and lower afterwards as you de-risk. Returns are not guaranteed." },
    { q: "Does this account for inflation?", a: "Yes. Retirement spending is inflated to future money, and the corpus is also shown in today's purchasing power for context." },
    { q: "What if the corpus runs out too soon?", a: "Save more, retire later, reduce planned spending, or seek a higher (riskier) return. Small changes to any of these shift the outcome meaningfully." },
    { q: "Is this financial advice?", a: "No. It's an educational projection based on your assumptions. Consult a qualified adviser for a plan tailored to your situation." },
  ],
  related: ["sip", "compound-interest", "savings-goal", "cagr"],
};
