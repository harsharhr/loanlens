import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const cmToInches: CalculatorConfig = {
  id: "cm-to-inches",
  slug: "cm-to-inches",
  title: "Centimeters to Inches Calculator",
  tagline: "Instantly convert cm to inches.",
  intro: "A simple, fast tool to convert centimeters into decimal inches. Find out the inch equivalent of any metric measurement.",
  category: "featured-units",
  keywords: ["cm to inches", "centimeters to inches", "convert cm to in", "cm to in calculator"],
  inputs: [
    { name: "input", label: "Centimeters (cm)", kind: "unit", defaultValue: 100, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "cm",
    "inches",
    0.3937007874,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "in = cm / 2.54",
    body: "To convert centimeters to inches, you simply divide the number of centimeters by 2.54, as one inch is exactly 2.54 cm.",
    variables: [
      { symbol: "in", meaning: "length in inches" },
      { symbol: "cm", meaning: "length in centimeters" }
    ]
  },
  explanation: [
    "Centimeters are part of the international metric system, while inches are imperial/US customary units.",
    "Because 1 inch is defined as exactly 2.54 centimeters, dividing your metric length by 2.54 provides the exact equivalent in inches."
  ],
  examples: [
    { title: "Standard Measure", scenario: "Convert 10 cm to inches", result: "10 cm / 2.54 = 3.937 inches" }
  ],
  faq: [
    { q: "How many centimeters make 1 inch?", a: "There are exactly 2.54 centimeters in 1 inch." },
    { q: "Is 2.5 cm equal to 1 inch?", a: "Almost! It's actually exactly 2.54 cm for a full inch." }
  ],
  related: []
};
