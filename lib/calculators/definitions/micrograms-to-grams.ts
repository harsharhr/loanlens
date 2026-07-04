import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const microgramsToGrams: CalculatorConfig = {
  id: "micrograms-to-grams",
  slug: "micrograms-to-grams",
  title: "Micrograms to Grams Calculator",
  tagline: "Instantly convert mcg to grams.",
  intro: "A simple, fast tool to convert micrograms into grams.",
  category: "featured-units",
  keywords: ["micrograms to grams", "mcg to g", "μg to g", "convert mcg to grams"],
  inputs: [
    { name: "input", label: "Micrograms (mcg)", kind: "unit", defaultValue: 1000000, min: 0, max: 1000000000, step: 1 }
  ],
  compute: createStandardConversion(
    "mcg",
    "g",
    0.000001,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "g = mcg × 0.000001",
    body: "To convert micrograms to grams, multiply the mass in micrograms by 0.000001, or simply divide by 1,000,000.",
    variables: [
      { symbol: "g", meaning: "mass in grams" },
      { symbol: "mcg", meaning: "mass in micrograms" }
    ]
  },
  explanation: [
    "Both micrograms (mcg or μg) and grams (g) are metric units of mass.",
    "A microgram is one millionth of a gram. This means you need exactly 1,000,000 micrograms to make up a single gram."
  ],
  examples: [
    { title: "Lab Measurement", scenario: "Convert 500,000 mcg to grams", result: "500,000 mcg ÷ 1,000,000 = 0.5 g" }
  ],
  faq: [
    { q: "How many micrograms are in a gram?", a: "There are exactly 1,000,000 micrograms in one gram." }
  ],
  related: []
};
