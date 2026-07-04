import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const mmToInches: CalculatorConfig = {
  id: "mm-to-inches",
  slug: "mm-to-inches",
  title: "Millimeters to Inches Calculator",
  tagline: "Quickly convert mm to fractional or decimal inches.",
  intro: "A precision calculator for converting millimeters (mm) into decimal inches, widely used in engineering and drafting.",
  category: "featured-units",
  keywords: ["mm to inches", "millimeters to inches", "convert mm to in", "mm to inches calculator"],
  inputs: [
    { name: "input", label: "Millimeters (mm)", kind: "unit", defaultValue: 25.4, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "mm",
    "inches",
    0.0393700787,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "in = mm / 25.4",
    body: "To convert millimeters to inches, divide your measurement by 25.4, since one inch is exactly 25.4 millimeters.",
    variables: [
      { symbol: "in", meaning: "length in inches" },
      { symbol: "mm", meaning: "length in millimeters" }
    ]
  },
  explanation: [
    "Millimeters are the standard unit of length in the metric system for small distances, while inches are used in the US customary system.",
    "Because 1 inch is 2.54 cm, and 1 cm is 10 mm, 1 inch equals exactly 25.4 mm."
  ],
  examples: [
    { title: "Common Size", scenario: "Convert 50.8 mm to inches", result: "50.8 mm / 25.4 = 2 inches" }
  ],
  faq: [
    { q: "How many millimeters are in an inch?", a: "There are exactly 25.4 millimeters in one inch." },
    { q: "Is 10 mm roughly 3/8 of an inch?", a: "Yes, 10 mm is about 0.3937 inches, which is very close to 3/8 of an inch (0.375)." }
  ],
  related: []
};
