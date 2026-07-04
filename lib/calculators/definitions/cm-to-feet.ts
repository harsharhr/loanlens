import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const cmToFeet: CalculatorConfig = {
  id: "cm-to-feet",
  slug: "cm-to-feet",
  title: "Centimeters to Feet Calculator",
  tagline: "Instantly convert cm to feet.",
  intro: "A simple, fast tool to convert centimeters into decimal feet. Enter any cm value to immediately see the equivalent measurement in feet.",
  category: "featured-units",
  subcategory: "height-length",
  keywords: ["cm to feet", "centimeters to feet", "convert cm to ft", "cm to ft calculator"],
  inputs: [
    { name: "input", label: "Centimeters (cm)", kind: "unit", defaultValue: 150, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "cm",
    "feet",
    0.0328084,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "ft = cm × 0.0328084",
    body: "To convert centimeters to feet, multiply the length in centimeters by 0.0328084. Alternatively, you can divide by 30.48.",
    variables: [
      { symbol: "ft", meaning: "length in feet" },
      { symbol: "cm", meaning: "length in centimeters" }
    ]
  },
  explanation: [
    "Centimeters are part of the metric system, while feet belong to the imperial system.",
    "One foot is exactly 30.48 centimeters. Therefore, dividing your cm value by 30.48 (or multiplying by 0.0328084) gives you the measurement in feet."
  ],
  examples: [
    { title: "Average Height", scenario: "Convert 170 cm to feet", result: "170 cm × 0.0328084 = 5.577 feet" }
  ],
  faq: [
    { q: "How many cm in a foot?", a: "There are exactly 30.48 centimeters in one foot." }
  ],
  related: []
};
