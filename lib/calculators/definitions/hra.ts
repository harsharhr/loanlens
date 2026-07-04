import type { CalculatorConfig } from "../types";

export const hra: CalculatorConfig = {
  id: "hra",
  slug: "hra",
  title: "HRA Exemption Calculator",
  tagline: "Find how much of your House Rent Allowance is tax-exempt.",
  intro:
    "If you receive House Rent Allowance and pay rent, part of that HRA is exempt from tax under the old regime. The exemption is the least of three amounts — this calculator works them out and shows your exempt and taxable HRA.",
  category: "tax",
  featured: false,
  keywords: ["HRA calculator", "hra exemption", "house rent allowance", "hra tax", "rent tax exemption"],
  inputs: [
    { name: "basic", label: "Annual basic + DA", kind: "currency", defaultValue: 600000, min: 60000, max: 20000000, step: 10000, slider: true },
    { name: "hraReceived", label: "Annual HRA received", kind: "currency", defaultValue: 300000, min: 0, max: 10000000, step: 10000, slider: true },
    { name: "rentPaid", label: "Annual rent paid", kind: "currency", defaultValue: 240000, min: 0, max: 10000000, step: 10000, slider: true },
    { name: "metro", label: "City type", kind: "number", defaultValue: 1, options: [
      { label: "Metro (50%)", value: 1 },
      { label: "Non-metro (40%)", value: 0 },
    ] },
  ],
  compute: (v) => {
    const { basic, hraReceived, rentPaid, metro } = v;
    // Exemption = least of: actual HRA, rent − 10% of salary, 50%/40% of salary.
    const cityPct = metro === 1 ? 0.5 : 0.4;
    const rule2 = Math.max(rentPaid - 0.1 * basic, 0);
    const rule3 = cityPct * basic;
    const exempt = Math.max(Math.min(hraReceived, rule2, rule3), 0);
    const taxable = Math.max(hraReceived - exempt, 0);
    const taxSaved = exempt * 0.3; // indicative at 30% slab

    return {
      metrics: [
        { label: "HRA exempt from tax", value: exempt, format: "currency", primary: true, tone: "success" },
        { label: "Taxable HRA", value: taxable, format: "currency", tone: taxable > 0 ? "warning" : "neutral" },
        { label: "Tax saved (≈30%)", value: taxSaved, format: "currency", tone: "brand" },
        { label: "Rent − 10% salary", value: rule2, format: "currency", note: "one of the 3 limits", tone: "neutral" },
      ],
      interpretation: `Your exemption is the least of the three limits: HRA received (${Math.round(hraReceived).toLocaleString("en-IN")}), rent minus 10% of salary (${Math.round(rule2).toLocaleString("en-IN")}), and ${metro === 1 ? "50%" : "40%"} of salary (${Math.round(rule3).toLocaleString("en-IN")}). So ${Math.round(exempt).toLocaleString("en-IN")} is tax-free and ${Math.round(taxable).toLocaleString("en-IN")} is added to taxable income. HRA exemption applies only under the old tax regime.`,
      chart: {
        type: "bar",
        title: "The three exemption limits",
        data: [
          { x: "HRA received", value: Math.round(hraReceived) },
          { x: "Rent − 10%", value: Math.round(rule2) },
          { x: `${metro === 1 ? "50%" : "40%"} salary`, value: Math.round(rule3) },
        ],
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "value", label: "Amount", color: "--chart-3" }],
      },
    };
  },
  formula: {
    heading: "HRA exemption = least of three",
    expression: "min( HRA received,  Rent − 10%·Salary,  50%/40%·Salary )",
    body: "The exempt amount is whichever of these three is smallest. Metro cities (Delhi, Mumbai, Kolkata, Chennai) use 50% of salary; other cities use 40%.",
    variables: [
      { symbol: "Salary", meaning: "basic pay + dearness allowance" },
      { symbol: "Rent", meaning: "actual rent paid in the year" },
      { symbol: "50% / 40%", meaning: "metro vs non-metro city factor" },
    ],
  },
  explanation: [
    "House Rent Allowance is a common salary component, and the Income Tax Act lets salaried people who actually pay rent exempt part of it. The exemption is deliberately the smallest of three tests, so you can't claim more than the rent justifies.",
    "The 10%-of-salary subtraction means very low rent yields little exemption. Living in a metro helps, because the third limit is 50% of salary rather than 40%. You need rent receipts, and rent above ₹1 lakh a year requires the landlord's PAN.",
    "Crucially, HRA exemption is available only under the old tax regime. If you opt for the new regime, HRA is fully taxable — factor that into your regime choice with the Income Tax calculator.",
  ],
  examples: [
    { title: "Metro tenant", scenario: "₹6,00,000 salary, ₹3,00,000 HRA, ₹2,40,000 rent, metro.", result: "Exemption of ₹1,80,000 (rent − 10% salary is the binding limit)." },
    { title: "Low rent", scenario: "Same salary but only ₹80,000 rent.", result: "Exemption shrinks to ₹20,000 — low rent limits the benefit." },
    { title: "Non-metro", scenario: "The first case in a non-metro city.", result: "Third limit drops to 40% of salary, but rent − 10% still binds here." },
  ],
  faq: [
    { q: "Who can claim HRA exemption?", a: "Salaried individuals who receive HRA and actually pay rent for their accommodation, under the old tax regime only." },
    { q: "Which cities count as metro?", a: "Only Delhi, Mumbai, Kolkata and Chennai qualify for the 50% limit. All other cities use 40%." },
    { q: "Can I claim HRA under the new regime?", a: "No. HRA exemption is available only in the old regime. Under the new regime, the entire HRA is taxable." },
    { q: "Do I need proof?", a: "Yes — keep rent receipts, and if annual rent exceeds ₹1 lakh you must report your landlord's PAN to your employer." },
    { q: "Can I claim HRA and a home loan together?", a: "Yes, in genuine cases — e.g. you rent in one city for work while owning a home elsewhere, or your own home is let out. The claims must be legitimate." },
  ],
  related: ["income-tax", "gratuity", "loan", "epf"],
};
