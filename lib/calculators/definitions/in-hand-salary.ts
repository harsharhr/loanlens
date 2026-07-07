import type { CalculatorConfig } from "../types";

/**
 * FY 2024-25 (AY 2025-26) tax on salary income, matching the logic used by the
 * income-tax calculator so both pages always agree. Returns tax including 4% cess.
 */
function taxNewRegime(gross: number): number {
  const standardDeduction = 50000;
  let taxable = gross - standardDeduction;
  if (taxable < 0) taxable = 0;

  let tax = 0;
  if (taxable > 300000) tax += (Math.min(taxable, 600000) - 300000) * 0.05;
  if (taxable > 600000) tax += (Math.min(taxable, 900000) - 600000) * 0.10;
  if (taxable > 900000) tax += (Math.min(taxable, 1200000) - 900000) * 0.15;
  if (taxable > 1200000) tax += (Math.min(taxable, 1500000) - 1200000) * 0.20;
  if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;

  // Section 87A rebate + marginal relief around the 7L threshold
  if (taxable <= 700000) return 0;
  if (tax > taxable - 700000) tax = taxable - 700000;
  return tax * 1.04; // 4% health & education cess
}

function taxOldRegime(gross: number, deductions: number): number {
  const standardDeduction = 50000;
  let taxable = gross - deductions - standardDeduction;
  if (taxable < 0) taxable = 0;

  let tax = 0;
  if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
  if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;

  if (taxable <= 500000) return 0; // 87A rebate
  return tax * 1.04;
}

export const inHandSalary: CalculatorConfig = {
  id: "in-hand-salary",
  slug: "in-hand-salary",
  title: "In-Hand Salary Calculator (CTC to Take-Home)",
  tagline: "Convert your CTC into the actual monthly salary credited to your bank.",
  intro:
    "Your CTC is not what you take home. Employer PF, gratuity accrual, income tax and professional tax all come off before the bank credit. This calculator breaks a CTC offer down into the real monthly in-hand amount — the single number that matters when comparing offers.",
  category: "tax",
  featured: true,
  keywords: [
    "in hand salary calculator", "ctc to in hand", "take home salary calculator",
    "salary calculator india", "ctc breakup", "monthly in hand from ctc", "net salary",
  ],
  author: { name: "Usemecalculator Editorial", role: "Tax & Payroll Research" },
  lastUpdated: "2026-07-07",
  methodology:
    "Assumes a standard Indian private-sector salary structure: basic pay as a chosen % of fixed CTC, employer PF (12% of basic, capped structure ignored for simplicity) and gratuity accrual (4.81% of basic) inside CTC. Income tax uses FY 2024-25 slabs with the ₹50,000 standard deduction and Section 87A rebate, matching our Income Tax calculator. Professional tax defaults to ₹200/month (most states).",
  inputs: [
    { name: "ctc", label: "Annual CTC", kind: "currency", defaultValue: 1200000, min: 100000, max: 100000000, step: 50000, slider: true },
    { name: "bonus", label: "Variable / bonus included in CTC", kind: "currency", defaultValue: 0, min: 0, max: 20000000, step: 10000, hint: "Annual performance pay that is part of the CTC figure but not paid monthly." },
    { name: "basicPct", label: "Basic pay (% of fixed CTC)", kind: "percent", defaultValue: 40, min: 20, max: 60, step: 5, slider: true, hint: "Most Indian employers set basic at 40–50% of CTC." },
    { name: "regime", label: "Tax regime", kind: "number", defaultValue: 1, options: [
      { label: "New regime", value: 1 },
      { label: "Old regime", value: 0 },
    ] },
    { name: "deductions", label: "Old-regime deductions (80C, 80D, HRA…)", kind: "currency", defaultValue: 150000, min: 0, max: 1000000, step: 10000, hint: "Used only if you pick the old regime." },
  ],
  compute: (v) => {
    const { ctc, bonus, basicPct, regime, deductions } = v;
    const fixedCtc = Math.max(ctc - bonus, 0);
    const basic = fixedCtc * (basicPct / 100);

    // Employer-side costs sitting inside CTC
    const employerPf = basic * 0.12;
    const gratuityAccrual = basic * 0.0481;

    // Gross salary actually paid to you across the year (incl. bonus when paid)
    const grossAnnual = Math.max(ctc - employerPf - gratuityAccrual, 0);

    // Employee-side deductions
    const employeePf = basic * 0.12;
    const professionalTax = 2400; // ₹200/month, standard in most states
    const incomeTax = regime === 1 ? taxNewRegime(grossAnnual) : taxOldRegime(grossAnnual, deductions);

    const netAnnual = Math.max(grossAnnual - employeePf - professionalTax - incomeTax, 0);
    // Monthly in-hand excludes the annual bonus — that lands separately when paid.
    const monthlyInHand = Math.max(netAnnual - bonus, 0) / 12;

    return {
      metrics: [
        { label: "Monthly in-hand", value: monthlyInHand, format: "currency", primary: true, tone: "brand", note: bonus > 0 ? "excluding variable pay" : undefined },
        { label: "Annual take-home", value: netAnnual, format: "currency", tone: "success" },
        { label: "Income tax / year", value: incomeTax, format: "currency", tone: "warning" },
        { label: "Your PF / year", value: employeePf, format: "currency", note: "goes to your EPF", tone: "neutral" },
      ],
      interpretation: `Of your ${Math.round(ctc).toLocaleString("en-IN")} CTC, roughly ${Math.round((monthlyInHand * 12 / ctc) * 100)}% reaches your bank as monthly salary. The gap is employer PF and gratuity (${Math.round(employerPf + gratuityAccrual).toLocaleString("en-IN")}) which are still yours but locked away, plus income tax (${Math.round(incomeTax).toLocaleString("en-IN")}) and your own PF contribution. ${regime === 1 ? "Using new-regime FY 2024-25 slabs." : "Using old-regime slabs with your declared deductions."}`,
      chart: {
        type: "donut",
        title: "Where your CTC goes",
        data: [
          { x: "In-hand pay", value: Math.round(netAnnual - bonus) },
          ...(bonus > 0 ? [{ x: "Variable / bonus", value: Math.round(Math.min(bonus, netAnnual)) }] : []),
          { x: "Income tax", value: Math.round(incomeTax) },
          { x: "Your PF", value: Math.round(employeePf) },
          { x: "Employer PF + gratuity", value: Math.round(employerPf + gratuityAccrual) },
        ],
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "value", label: "Amount", color: "--chart-1" }],
      },
      table: {
        title: "Annual salary breakup",
        columns: [
          { key: "component", label: "Component", format: "text" },
          { key: "amount", label: "Amount / year", format: "currency" },
        ],
        rows: [
          { component: "Cost to company (CTC)", amount: Math.round(ctc) },
          { component: "− Employer PF (12% of basic)", amount: -Math.round(employerPf) },
          { component: "− Gratuity accrual (4.81% of basic)", amount: -Math.round(gratuityAccrual) },
          { component: "= Gross salary", amount: Math.round(grossAnnual) },
          { component: "− Your PF contribution", amount: -Math.round(employeePf) },
          { component: "− Professional tax", amount: -professionalTax },
          { component: "− Income tax (incl. cess)", amount: -Math.round(incomeTax) },
          { component: "= Annual take-home", amount: Math.round(netAnnual) },
        ],
      },
    };
  },
  formula: {
    heading: "How CTC becomes in-hand salary",
    expression: "In-hand = CTC − Employer PF − Gratuity − Your PF − Income tax − Professional tax",
    body: "CTC counts everything your employer spends on you. Employer PF and gratuity never appear in your payslip credit; your own PF, income tax (TDS) and professional tax are deducted from gross pay. What remains, divided by 12, is your monthly in-hand.",
    variables: [
      { symbol: "Basic", meaning: "basic pay — the chosen % of fixed CTC; drives PF and gratuity" },
      { symbol: "Employer PF", meaning: "12% of basic, paid into your EPF by the employer from within CTC" },
      { symbol: "Gratuity", meaning: "4.81% of basic accrued yearly toward the statutory gratuity" },
      { symbol: "TDS", meaning: "income tax deducted monthly per your chosen regime's slabs" },
    ],
  },
  explanation: [
    "CTC (Cost to Company) is a budgeting number for the employer, not a promise of bank credit. It bundles your gross salary with retirement contributions the employer makes on your behalf — employer PF and gratuity — which you receive only later, not monthly.",
    "The biggest lever on your in-hand is the tax regime. The new regime's lower slab rates usually win unless you have large deductions — high HRA in a metro, a home loan, and a full ₹1.5 lakh of 80C can tilt it to the old regime. Compare both with our Income Tax calculator before submitting your declaration.",
    "The basic-pay percentage matters more than people realise: a higher basic means more PF (good for retirement, less in hand today) and higher gratuity, while a lower basic inflates allowances and today's take-home. Employers set this; you can sometimes negotiate the structure, not just the total.",
    "Watch for CTC inflation tricks in offers: one-time joining bonuses, ESOP grants at face value, and gratuity counted inside CTC all make the headline bigger without changing your monthly credit. Always compare offers on computed in-hand, not CTC.",
  ],
  examples: [
    { title: "₹12 lakh CTC, new regime", scenario: "No variable pay, basic at 40%, new regime.", result: "Roughly ₹80,000–85,000 in-hand per month after PF, gratuity and tax." },
    { title: "Offer with variable pay", scenario: "₹15 lakh CTC of which ₹2 lakh is a performance bonus.", result: "Monthly credit is computed on the fixed ₹13 lakh — the bonus arrives separately, if targets are met." },
    { title: "Old vs new regime", scenario: "₹12 lakh CTC with ₹2.5 lakh of old-regime deductions (80C + HRA).", result: "The old regime can beat the new one here — run both and pick the higher in-hand." },
  ],
  faq: [
    { q: "Why is my in-hand so much lower than CTC ÷ 12?", a: "Because CTC includes employer PF and gratuity that never reach your payslip, and your payslip then loses your own PF, TDS and professional tax. A 15–25% gap between CTC/12 and in-hand is normal." },
    { q: "Is employer PF my money?", a: "Yes — both PF contributions land in your EPF account and earn interest. It's deferred pay for retirement, not a deduction lost to you. See our EPF calculator." },
    { q: "Which tax regime should I choose?", a: "The new regime is the default and usually better below ~₹3-4 lakh of deductions. If you claim high HRA, home-loan interest and full 80C, compare both — our Income Tax calculator does it side by side." },
    { q: "Why doesn't the monthly figure include my bonus?", a: "Variable pay is paid annually or quarterly, only if targets are met. Counting it in the monthly figure would overstate what you can budget on — so we show it separately." },
    { q: "Does this include HRA exemption?", a: "Under the old regime, enter your HRA exemption within the deductions field (compute it with our HRA calculator). The new regime taxes HRA fully, so no adjustment applies." },
    { q: "Is professional tax the same everywhere?", a: "No — it's a state tax, at most ₹2,500 a year. We assume the common ₹200/month; a few states (like Delhi) don't levy it at all, which changes in-hand only marginally." },
  ],
  related: ["income-tax", "hra", "epf", "gratuity"],
};
