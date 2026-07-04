import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const inchesToCm: CalculatorConfig = {
  id: "inches-to-cm",
  slug: "inches-to-cm",
  title: "Inches to Centimeters Calculator",
  tagline: "Instantly convert inches to cm.",
  intro: "A simple, exact tool to convert inches into metric centimeters. Perfect for both precise engineering and everyday use.",
  category: "featured-units",
  keywords: ["inches to cm", "in to cm", "convert inches to centimeters", "inches to cm calculator"],
  inputs: [
    { name: "input", label: "Inches (in)", kind: "unit", defaultValue: 12, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "inches",
    "cm",
    2.54,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "cm = in × 2.54",
    body: "To convert inches to centimeters, multiply the length in inches by 2.54. One inch is defined internationally as exactly 2.54 centimeters.",
    variables: [
      { symbol: "cm", meaning: "length in centimeters" },
      { symbol: "in", meaning: "length in inches" }
    ]
  },
  explanation: [
    "Inches are part of the imperial and US customary systems, while centimeters are part of the metric system.",
    "The factor of 2.54 is an exact definition agreed upon in 1959. Therefore, multiplying by 2.54 gives a precise measurement without rounding errors."
  ],
  examples: [
    { title: "One Foot", scenario: "Convert 12 inches to cm", result: "12 in × 2.54 = 30.48 cm" }
  ],
  faq: [
    { q: "How many cm in an inch?", a: "There are exactly 2.54 cm in one inch." }
  ],
  related: []
};
