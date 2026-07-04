import type { CalculatorConfig } from "../types";
import { FREQUENCY, periodsToTarget, futureValueSeries } from "../utils";

export const savingsGoal: CalculatorConfig = {
  id: "savings-goal",
  slug: "savings-goal",
  title: "Savings Goal Calculator",
  tagline: "Find the monthly amount that gets you to your target on time.",
  intro:
    "Have a number in mind — a house deposit, a wedding, an emergency fund? This calculator works backwards from your goal and deadline to tell you exactly how much to set aside each month, allowing for interest on your savings.",
  category: "savings",
  featured: true,
  keywords: ["savings goal calculator", "how much to save", "monthly savings", "savings target", "goal planner"],
  inputs: [
    { name: "goal", label: "Savings goal", kind: "currency", defaultValue: 1000000, min: 1000, max: 1000000000, step: 10000, slider: true },
    { name: "current", label: "Already saved", kind: "currency", defaultValue: 100000, min: 0, max: 1000000000, step: 10000, slider: true },
    { name: "years", label: "Time to goal", kind: "number", defaultValue: 5, min: 0.5, max: 40, step: 0.5, slider: true, suffix: "yrs" },
    { name: "rate", label: "Expected return", kind: "percent", defaultValue: 6, min: 0, max: 25, step: 0.5, slider: true, hint: "Interest on your savings while you build them." },
  ],
  compute: (v) => {
    const { goal, current, years, rate } = v;
    const months = Math.round(years * 12);
    const rMonthly = rate / 100 / 12;

    // Future value of what's already saved
    const currentFV = current * Math.pow(1 + rMonthly, months);
    const remaining = Math.max(goal - currentFV, 0);

    // Required monthly contribution (annuity solved for payment)
    let monthly: number;
    if (remaining <= 0) monthly = 0;
    else if (rMonthly === 0) monthly = remaining / months;
    else monthly = (remaining * rMonthly) / (Math.pow(1 + rMonthly, months) - 1);

    const totalContributions = monthly * months;
    const interestEarned = goal - current - totalContributions;

    // build progress curve
    const rows: Array<Record<string, number>> = [];
    let bal = current;
    for (let y = 0; y <= years; y++) {
      if (y > 0) {
        for (let m = 0; m < 12; m++) bal = bal * (1 + rMonthly) + monthly;
      }
      rows.push({ x: y, balance: Math.round(bal), target: Math.round(goal) });
    }

    return {
      metrics: [
        { label: "Save per month", value: monthly, format: "currency", primary: true, tone: "brand" },
        { label: "Total you contribute", value: totalContributions + current, format: "currency", tone: "neutral" },
        { label: "Interest earned", value: Math.max(interestEarned, 0), format: "currency", tone: "success" },
        { label: "Goal", value: goal, format: "currency", tone: "neutral" },
      ],
      interpretation: monthly <= 0
        ? `Good news — what you've already saved will grow to your goal on its own within ${years} years at ${rate}%. No further monthly saving is strictly required.`
        : `Set aside about ${Math.round(monthly).toLocaleString("en-IN")} every month for ${years} years. Interest on your balance covers roughly ${Math.round(Math.max(interestEarned, 0)).toLocaleString("en-IN")} of the goal, so you don't have to save the whole amount yourself.`,
      chart: {
        type: "line",
        title: "Progress toward your goal",
        data: rows,
        xKey: "x",
        valueFormat: "currency",
        series: [
          { key: "balance", label: "Projected balance", color: "--chart-1" },
          { key: "target", label: "Goal", color: "--chart-2" },
        ],
      },
    };
  },
  formula: {
    heading: "Solving for the monthly amount",
    expression: "PMT = (Goal − Current·(1+i)ⁿ) · i / ((1+i)ⁿ − 1)",
    body: "We grow what you've already saved, subtract it from the goal, then solve the annuity formula for the level monthly contribution that fills the gap.",
    variables: [
      { symbol: "Goal", meaning: "target amount" },
      { symbol: "Current", meaning: "amount already saved" },
      { symbol: "i", meaning: "monthly return = annual ÷ 12" },
      { symbol: "n", meaning: "number of months to the goal" },
    ],
  },
  explanation: [
    "Planning around a goal is more motivating than saving vaguely. By fixing the target and the deadline, the maths tells you the one number that matters: how much to move into savings each month.",
    "Earning interest while you save reduces the burden. Even a modest return means the account does part of the work, so your required monthly contribution is lower than the goal divided by the number of months.",
    "If the monthly figure feels too high, you have three levers: extend the timeline, increase the expected return by choosing a different (riskier) vehicle, or trim the goal. The calculator makes those trade-offs visible instantly.",
  ],
  examples: [
    { title: "House deposit", scenario: "₹10,00,000 goal in 5 years, ₹1,00,000 saved, 6% return.", result: "Around ₹12,000–13,000 per month." },
    { title: "Emergency fund", scenario: "₹3,00,000 in 2 years from zero at 5%.", result: "Roughly ₹11,900 per month." },
    { title: "Longer runway", scenario: "The same house deposit over 8 years instead of 5.", result: "A much lower monthly figure, because time and interest do more of the work." },
  ],
  faq: [
    { q: "What return should I assume for savings?", a: "Use a conservative figure that matches where you'll hold the money — a savings account or short-term fund is safer but lower-yielding than equity." },
    { q: "What if I can't afford the monthly amount?", a: "Extend the deadline, lower the goal, or accept more risk for a higher expected return. Adjust the inputs to find a plan you can sustain." },
    { q: "Does it account for inflation?", a: "Not directly. If your goal is years away, consider setting the target a little higher to preserve purchasing power." },
    { q: "Should the money be invested or in a savings account?", a: "For short horizons, safety matters more than return — a savings account or liquid fund. For long horizons, a diversified investment may be appropriate." },
    { q: "What if my income varies?", a: "Treat the monthly figure as an average. Save more in good months to cover leaner ones and stay on track." },
  ],
  related: ["compound-interest", "sip", "retirement", "apy"],
};
