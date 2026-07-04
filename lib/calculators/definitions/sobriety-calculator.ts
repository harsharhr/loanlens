import type { CalculatorConfig } from "../types";
import { computeSobriety } from "../formulas/date-duration";

export const sobrietyCalculator: CalculatorConfig = {
  id: "sobriety-calculator",
  slug: "sobriety-calculator",
  title: "Sobriety Calculator",
  tagline: "Track your recovery milestones and sober time.",
  intro: "This tool helps you calculate the exact duration of your sobriety by days, months, and years from your start date.",
  disclaimer: "This tool is for informational and tracking purposes only. Seek support from a medical professional or recovery community if you need help with addiction.",
  category: "health",
  subcategory: "recovery",
  keywords: ["sobriety", "recovery", "sober", "time tracker"],
  inputs: [
    {
      name: "startDate",
      label: "Sobriety Start Date",
      kind: "date",
      defaultValue: "2024-01-01"
    }
  ],
  compute: computeSobriety,
  formula: {
    heading: "Duration Calculation",
    expression: "Current Date - Start Date",
    body: "The calculator determines the exact difference between today's date and the start date.",
    variables: [
      { symbol: "Start Date", meaning: "The day you began your sobriety journey" }
    ]
  },
  explanation: [
    "Tracking sober time can be a powerful motivator in recovery.",
    "The calculator converts the total duration into easy-to-read formats like years, months, and days."
  ],
  examples: [
    {
      title: "One Year Milestone",
      scenario: "Start date is January 1, 2024, and current date is January 1, 2025.",
      result: "Total sobriety time is 1 year, 0 months, and 0 days."
    }
  ],
  faq: [
    {
      q: "Does this account for leap years?",
      a: "Yes, the standard date duration calculation inherently handles leap years accurately."
    }
  ],
  related: []
};
