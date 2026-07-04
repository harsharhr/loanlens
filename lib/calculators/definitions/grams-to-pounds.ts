import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const gramsToPounds: CalculatorConfig = {
  id: "grams-to-pounds",
  slug: "grams-to-pounds",
  title: "Grams to Pounds Calculator",
  tagline: "Instantly convert grams to pounds.",
  intro: "A simple, fast tool to convert grams into decimal pounds.",
  category: "featured-units",
  keywords: ["grams to pounds", "g to lbs", "convert grams to lbs", "weight conversion"],
  inputs: [
    { name: "input", label: "Grams (g)", kind: "unit", defaultValue: 1000, min: 0, max: 10000000, step: 1 }
  ],
  compute: createStandardConversion(
    "g",
    "lbs",
    0.00220462,
    "{in} is approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "lbs = g × 0.00220462",
    body: "To convert grams to pounds, multiply the mass in grams by 0.00220462.",
    variables: [
      { symbol: "lbs", meaning: "mass in pounds" },
      { symbol: "g", meaning: "mass in grams" }
    ]
  },
  explanation: [
    "Grams are the base unit of mass in the metric system, while pounds are part of the imperial system.",
    "One pound is exactly 453.59237 grams. Therefore, dividing your grams value by 453.59237 (or multiplying by 0.00220462) gives you the measurement in pounds."
  ],
  examples: [
    { title: "Standard Recipe", scenario: "Convert 500 g to pounds", result: "500 g × 0.00220462 = 1.1023 lbs" }
  ],
  faq: [
    { q: "How many grams in a pound?", a: "There are exactly 453.59237 grams in one pound." }
  ],
  related: []
};
