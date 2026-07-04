import type { CalculatorConfig } from "../types";
import { computePregnancy } from "../formulas/pregnancy";

export const pregnancyCalculator: CalculatorConfig = {
  id: "pregnancy-calculator",
  slug: "pregnancy-calculator",
  title: "Pregnancy Calculator",
  tagline: "Estimate your due date and current gestational age.",
  intro: "This tool helps you estimate your baby's due date and track your current stage of pregnancy based on your last menstrual period (LMP).",
  disclaimer: "This calculator is for informational purposes only and does not provide medical advice. Always consult with a healthcare professional for accurate medical information.",
  category: "health",
  subcategory: "pregnancy",
  keywords: ["pregnancy", "due date", "gestational age", "lmp", "conception"],
  inputs: [
    {
      name: "lmp",
      label: "Last Menstrual Period (LMP)",
      kind: "date",
      defaultValue: "2024-01-01"
    }
  ],
  compute: computePregnancy,
  formula: {
    heading: "Naegele's Rule for Due Date",
    expression: "LMP + 280 days",
    body: "The estimated due date (EDD) is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP).",
    variables: [
      { symbol: "LMP", meaning: "First day of the last menstrual period" }
    ]
  },
  explanation: [
    "Most pregnancies last around 40 weeks, or 280 days, from the first day of a woman's last menstrual period.",
    "This calculator uses standard Naegele's rule to project the estimated due date."
  ],
  examples: [
    {
      title: "Standard Calculation",
      scenario: "LMP on January 1, 2024.",
      result: "Estimated due date is October 7, 2024."
    }
  ],
  faq: [
    {
      q: "How accurate is the due date?",
      a: "Only about 5% of babies are born exactly on their estimated due date. Most are born within two weeks before or after."
    }
  ],
  related: []
};
