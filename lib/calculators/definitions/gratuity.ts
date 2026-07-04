import type { CalculatorConfig } from "../types";

export const gratuity: CalculatorConfig = {
  id: "gratuity",
  slug: "gratuity",
  title: "Gratuity Calculator",
  tagline: "Calculate the gratuity payable for your years of service.",
  intro:
    "Gratuity is a lump sum your employer pays as a thank-you for long service, payable after five years. This calculator uses the formula under the Payment of Gratuity Act to estimate what you're owed based on your last salary and tenure.",
  category: "personal-finance",
  featured: false,
  keywords: ["gratuity calculator", "gratuity formula", "payment of gratuity act", "gratuity eligibility", "end of service"],
  inputs: [
    { name: "salary", label: "Last drawn monthly salary", kind: "currency", defaultValue: 60000, min: 5000, max: 5000000, step: 1000, slider: true, hint: "Basic pay + dearness allowance." },
    { name: "years", label: "Years of service", kind: "number", defaultValue: 10, min: 5, max: 45, step: 1, slider: true, suffix: "yrs" },
  ],
  compute: (v) => {
    const { salary, years } = v;
    // Payment of Gratuity Act: (15 × last salary × years) / 26. Cap ₹20 lakh tax-free.
    const gratuityAmt = (15 * salary * years) / 26;
    const capped = Math.min(gratuityAmt, 2000000);
    const overCap = Math.max(gratuityAmt - 2000000, 0);

    return {
      metrics: [
        { label: "Gratuity payable", value: gratuityAmt, format: "currency", primary: true, tone: "brand" },
        { label: "Tax-free portion", value: capped, format: "currency", note: "up to ₹20 lakh", tone: "success" },
        { label: "Taxable excess", value: overCap, format: "currency", tone: overCap > 0 ? "warning" : "neutral" },
        { label: "Years counted", value: years, format: "number", tone: "neutral" },
      ],
      interpretation: `With a last drawn salary of ${Math.round(salary).toLocaleString("en-IN")} and ${years} years of service, your gratuity works out to about ${Math.round(gratuityAmt).toLocaleString("en-IN")}. ${overCap > 0 ? `The amount above the ₹20 lakh statutory limit (${Math.round(overCap).toLocaleString("en-IN")}) is taxable.` : `This is within the ₹20 lakh tax-free limit for private employees.`}`,
      chart: {
        type: "bar",
        title: "Gratuity by years of service",
        data: [5, 10, 15, 20, 25, 30].map((yr) => ({ x: `${yr}y`, value: Math.round((15 * salary * yr) / 26) })),
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "value", label: "Gratuity", color: "--chart-1" }],
      },
    };
  },
  formula: {
    heading: "The gratuity formula",
    expression: "Gratuity = (15 × Last salary × Years) / 26",
    body: "The Act treats each year as 15 days' wages, and a month as 26 working days. Service beyond six months in the final year rounds up to a full year.",
    variables: [
      { symbol: "Last salary", meaning: "last drawn basic + dearness allowance" },
      { symbol: "Years", meaning: "completed years of service (5+)" },
      { symbol: "15 / 26", meaning: "15 days' wages per year over 26 working days" },
    ],
  },
  explanation: [
    "Gratuity rewards long service. Under the Payment of Gratuity Act, employers with 10 or more staff must pay it once you complete five years of continuous service (waived if service ends due to death or disability).",
    "The formula counts 15 days of wages for every completed year, using a 26-day month. A part-year over six months rounds up — so 10 years and 7 months counts as 11 years.",
    "For private-sector employees, gratuity up to ₹20 lakh is tax-free; anything above that is added to income and taxed. Government employees receive the full amount tax-free.",
  ],
  examples: [
    { title: "Ten years", scenario: "₹60,000 last salary, 10 years of service.", result: "Gratuity of about ₹3.46 lakh, fully tax-free." },
    { title: "Long tenure", scenario: "₹1,00,000 salary, 30 years.", result: "Around ₹17.3 lakh — still within the tax-free limit." },
    { title: "Above the cap", scenario: "₹2,00,000 salary, 30 years.", result: "Exceeds ₹20 lakh, so the excess is taxable." },
  ],
  faq: [
    { q: "When am I eligible for gratuity?", a: "After five years of continuous service with the same employer. The five-year rule is waived if service ends due to death or disablement." },
    { q: "How are part years counted?", a: "A final year with more than six months of service rounds up to a full year; six months or less is ignored." },
    { q: "Is gratuity taxable?", a: "For private employees, up to ₹20 lakh is tax-free; the excess is taxable. Government employees get the full amount tax-free." },
    { q: "Does 'salary' mean my full CTC?", a: "No. Gratuity uses only your last drawn basic pay plus dearness allowance, not your entire cost-to-company." },
    { q: "What if my company isn't covered by the Act?", a: "Some employers still pay gratuity voluntarily, often using a 15/30 (half-month) formula. Check your offer letter or HR policy." },
  ],
  related: ["epf", "hra", "income-tax", "retirement"],
};
