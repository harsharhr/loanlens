import type { CalculatorConfig } from "../types";

export const incomeTax: CalculatorConfig = {
  id: "income-tax",
  slug: "income-tax",
  title: "Income Tax Calculator (Old vs New Regime)",
  tagline: "Instantly compare your tax liability under the Old and New tax regimes for FY 2024-25.",
  intro:
    "Choosing between the Old and New Tax Regimes can be confusing. This calculator helps you estimate your income tax under both regimes for FY 2024-25 (AY 2025-26) so you can choose the one that saves you the most money.",
  category: "tax",
  featured: true,
  keywords: ["income tax calculator", "old vs new regime", "tax calculator india", "tax savings", "fy 2024-25 tax"],
  inputs: [
    { name: "income", label: "Gross Annual Income", kind: "currency", defaultValue: 1200000, min: 300000, max: 50000000, step: 50000, slider: true },
    { name: "exemptions", label: "HRA & LTA Exemptions", kind: "currency", defaultValue: 0, min: 0, max: 2000000, step: 10000 },
    { name: "deductions", label: "80C, 80D, 24b Deductions", kind: "currency", defaultValue: 150000, min: 0, max: 1000000, step: 10000 },
  ],
  author: {
    name: "RupeeSense Editorial",
    role: "Tax Experts",
  },
  lastUpdated: new Date().toISOString().split('T')[0],
  methodology: "Calculates tax based on the slab rates for FY 2024-25 (AY 2025-26). Includes the standard deduction of ₹50,000 for salaried employees in both regimes. Assumes individual below 60 years of age.",
  compute: (v) => {
    const { income, exemptions, deductions } = v;

    // Both regimes allow standard deduction of 50,000 for salaried (assuming salaried here)
    const standardDeduction = 50000;

    // --- OLD REGIME ---
    let taxableOld = income - exemptions - deductions - standardDeduction;
    if (taxableOld < 0) taxableOld = 0;
    
    let taxOld = 0;
    if (taxableOld > 250000) {
      if (taxableOld <= 500000) taxOld += (taxableOld - 250000) * 0.05;
      else taxOld += 250000 * 0.05;
    }
    if (taxableOld > 500000) {
      if (taxableOld <= 1000000) taxOld += (taxableOld - 500000) * 0.20;
      else taxOld += 500000 * 0.20;
    }
    if (taxableOld > 1000000) {
      taxOld += (taxableOld - 1000000) * 0.30;
    }
    
    // Rebate 87A for Old Regime (up to 5 Lakhs)
    if (taxableOld <= 500000) taxOld = 0;
    else taxOld = taxOld * 1.04; // 4% Health & Education Cess

    // --- NEW REGIME (FY 2024-25 slabs) ---
    // Exemptions and most deductions (80C, 80D) are NOT allowed in the new regime.
    // Standard deduction of 50k IS allowed.
    let taxableNew = income - standardDeduction;
    if (taxableNew < 0) taxableNew = 0;

    let taxNew = 0;
    if (taxableNew > 300000) {
      if (taxableNew <= 600000) taxNew += (taxableNew - 300000) * 0.05;
      else taxNew += 300000 * 0.05;
    }
    if (taxableNew > 600000) {
      if (taxableNew <= 900000) taxNew += (taxableNew - 600000) * 0.10;
      else taxNew += 300000 * 0.10;
    }
    if (taxableNew > 900000) {
      if (taxableNew <= 1200000) taxNew += (taxableNew - 900000) * 0.15;
      else taxNew += 300000 * 0.15;
    }
    if (taxableNew > 1200000) {
      if (taxableNew <= 1500000) taxNew += (taxableNew - 1200000) * 0.20;
      else taxNew += 300000 * 0.20;
    }
    if (taxableNew > 1500000) {
      taxNew += (taxableNew - 1500000) * 0.30;
    }

    // Rebate 87A for New Regime (up to 7 Lakhs)
    if (taxableNew <= 700000) taxNew = 0;
    else {
      // Marginal relief (simplified for 7L edge case)
      if (taxableNew > 700000 && taxNew > (taxableNew - 700000)) {
         taxNew = taxableNew - 700000;
      }
      taxNew = taxNew * 1.04; // 4% Health & Education Cess
    }

    const difference = Math.abs(taxOld - taxNew);
    let recommendation = "";
    if (taxOld < taxNew) {
      recommendation = `The **Old Regime** is better for you. You save ${Math.round(difference).toLocaleString("en-IN")} in taxes.`;
    } else if (taxNew < taxOld) {
      recommendation = `The **New Regime** is better for you. You save ${Math.round(difference).toLocaleString("en-IN")} in taxes.`;
    } else {
      recommendation = `Your tax liability is exactly the same under both regimes. The **New Regime** requires less paperwork as you don't need to submit investment proofs.`;
    }

    return {
      metrics: [
        { label: "Tax (Old Regime)", value: taxOld, format: "currency", tone: taxOld <= taxNew ? "success" : "warning" },
        { label: "Tax (New Regime)", value: taxNew, format: "currency", tone: taxNew <= taxOld ? "success" : "warning" },
      ],
      interpretation: `Based on your inputs, your estimated income tax under the Old Regime is ${Math.round(taxOld).toLocaleString("en-IN")} and under the New Regime is ${Math.round(taxNew).toLocaleString("en-IN")}. \n\n💡 **Decision Insight:** ${recommendation}`,
    };
  },
  formula: {
    heading: "How is tax calculated?",
    expression: "Tax = (Taxable Income x Slab Rate) + 4% Cess",
    body: "In India, income tax is progressive. Your income is divided into slabs, and each slab is taxed at a different rate. The Old Regime offers lower taxes if you have high deductions (like 80C, Home Loan Interest). The New Regime offers lower tax rates but does not allow most deductions.",
    variables: [
      { symbol: "Taxable Income (Old)", meaning: "Gross Income - Exemptions - Deductions - ₹50,000 Std. Deduction" },
      { symbol: "Taxable Income (New)", meaning: "Gross Income - ₹50,000 Std. Deduction (No other deductions allowed)" },
    ],
  },
  explanation: [
    "The **New Tax Regime** is the default tax regime from FY 2023-24 onwards. It offers lower slab rates and is highly beneficial for individuals who do not have significant tax-saving investments, home loans, or HRA exemptions.",
    "The **Old Tax Regime** has higher slab rates but allows you to reduce your taxable income using roughly 70 exemptions and deductions. The most popular are Section 80C (up to ₹1.5 Lakh for EPF, PPF, ELSS, Life Insurance), Section 80D (Health Insurance), and Section 24b (Home Loan Interest up to ₹2 Lakh).",
    "Both regimes allow a Standard Deduction of ₹50,000 for salaried individuals and pensioners. Additionally, both regimes offer a full tax rebate under Section 87A if your taxable income is below a certain threshold (₹5 Lakh in the Old Regime, ₹7 Lakh in the New Regime)."
  ],
  examples: [
    { title: "No Deductions", scenario: "₹10,00,000 Salary, ₹0 Deductions.", result: "New Regime Tax: ₹54,600. Old Regime Tax: ₹1,06,600. The New Regime is far superior." },
    { title: "High Deductions", scenario: "₹15,00,000 Salary, ₹3,50,000 Deductions (80C + Home Loan).", result: "Old Regime Tax: ₹1,48,200. New Regime Tax: ₹1,56,000. The Old Regime saves you money." },
  ],
  faq: [
    { q: "Can I switch between Old and New regimes every year?", a: "If you are a salaried individual without business income, yes, you can choose the most beneficial regime every year when filing your ITR." },
    { q: "Which regime is the default?", a: "The New Tax Regime is now the default. If you do not inform your employer or choose the Old Regime during ITR filing, your tax will be calculated under the New Regime." },
    { q: "Is Standard Deduction available in both regimes?", a: "Yes. From FY 2023-24, the ₹50,000 standard deduction for salaried individuals is available under both the Old and New tax regimes." },
  ],
  related: ["salary", "hra", "epf", "ppf"],
};
