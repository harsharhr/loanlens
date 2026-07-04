import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const mgToGrams: CalculatorConfig = {
  id: "mg-to-grams",
  slug: "mg-to-grams",
  title: "Milligrams to Grams Calculator",
  tagline: "Instantly convert mg to grams.",
  intro: "A simple, fast tool to convert milligrams into grams.",
  category: "featured-units",
  subcategory: "mass-weight",
  keywords: ["mg to grams", "milligrams to grams", "convert mg to g", "metric weight"],
  inputs: [
    { name: "input", label: "Milligrams (mg)", kind: "unit", defaultValue: 1000, min: 0, max: 10000000, step: 1 }
  ],
  compute: createStandardConversion(
    "mg",
    "g",
    0.001,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "g = mg × 0.001",
    body: "To convert milligrams to grams, multiply the mass in milligrams by 0.001, or simply divide by 1000.",
    variables: [
      { symbol: "g", meaning: "mass in grams" },
      { symbol: "mg", meaning: "mass in milligrams" }
    ]
  },
  explanation: [
    "Milligrams and grams are standard metric units of mass.",
    "The prefix 'milli-' indicates one thousandth. Therefore, one milligram is 1/1000 of a gram, and dividing your milligrams by 1000 gives you the value in grams."
  ],
  examples: [
    { title: "Medication Dose", scenario: "Convert 250 mg to grams", result: "250 mg ÷ 1000 = 0.25 g" }
  ],
  faq: [
    { q: "Is 1000 mg equal to 1 gram?", a: "Yes, exactly 1000 milligrams make up 1 gram." }
  ],
  related: []
};
