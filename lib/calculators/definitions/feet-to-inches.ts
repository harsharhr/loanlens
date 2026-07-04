import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const feetToInches: CalculatorConfig = {
  id: "feet-to-inches",
  slug: "feet-to-inches",
  title: "Feet to Inches Calculator",
  tagline: "Quickly multiply feet to get inches.",
  intro: "Convert any length in feet directly to inches with this easy multiplier tool.",
  category: "featured-units",
  keywords: ["feet to inches", "ft to in", "convert feet to inches", "feet to in calculator"],
  inputs: [
    { name: "input", label: "Feet (ft)", kind: "unit", defaultValue: 5, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "feet",
    "inches",
    12,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "in = ft × 12",
    body: "Since there are 12 inches in a single foot, converting from feet to inches requires multiplying your value by 12.",
    variables: [
      { symbol: "in", meaning: "length in inches" },
      { symbol: "ft", meaning: "length in feet" }
    ]
  },
  explanation: [
    "Both feet and inches are standard imperial/US customary units for measuring length and distance.",
    "The 12-to-1 ratio makes this one of the most common everyday math conversions."
  ],
  examples: [
    { title: "Standard Height", scenario: "Convert 6 feet to inches", result: "6 ft × 12 = 72 inches" }
  ],
  faq: [
    { q: "How many inches in 2 feet?", a: "There are 24 inches in 2 feet." },
    { q: "How many inches in a foot?", a: "There are exactly 12 inches in one foot." }
  ],
  related: []
};
