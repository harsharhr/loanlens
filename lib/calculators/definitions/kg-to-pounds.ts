import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const kgToPounds: CalculatorConfig = {
  id: "kg-to-pounds",
  slug: "kg-to-pounds",
  title: "Kilograms to Pounds Calculator",
  tagline: "Instantly convert kg to pounds.",
  intro: "A simple, fast tool to convert kilograms into decimal pounds.",
  category: "featured-units",
  keywords: ["kg to pounds", "kilograms to pounds", "convert kg to lbs", "weight conversion"],
  inputs: [
    { name: "input", label: "Kilograms (kg)", kind: "unit", defaultValue: 70, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "kg",
    "lbs",
    2.20462,
    "{in} is approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "lbs = kg × 2.20462",
    body: "To convert kilograms to pounds, multiply the mass in kilograms by 2.20462.",
    variables: [
      { symbol: "lbs", meaning: "mass in pounds" },
      { symbol: "kg", meaning: "mass in kilograms" }
    ]
  },
  explanation: [
    "Kilograms are the base unit of mass in the International System of Units (SI), while pounds are used in the imperial system.",
    "One kilogram is approximately equal to 2.20462 pounds. This makes converting between the two systems straightforward with a single multiplication."
  ],
  examples: [
    { title: "Body Weight", scenario: "Convert 75 kg to pounds", result: "75 kg × 2.20462 = 165.3465 lbs" }
  ],
  faq: [
    { q: "How many pounds in a kilogram?", a: "There are approximately 2.20462 pounds in one kilogram." }
  ],
  related: []
};
