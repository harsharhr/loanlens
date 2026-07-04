import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const inchesToFeet: CalculatorConfig = {
  id: "inches-to-feet",
  slug: "inches-to-feet",
  title: "Inches to Feet Calculator",
  tagline: "Easily convert total inches into decimal feet.",
  intro: "A fast calculator to divide your inches into feet. Great for carpentry, DIY projects, and everyday math.",
  category: "featured-units",
  subcategory: "height-length",
  keywords: ["inches to feet", "in to ft", "convert inches to feet", "inches to ft calculator"],
  inputs: [
    { name: "input", label: "Inches (in)", kind: "unit", defaultValue: 36, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "inches",
    "feet",
    1 / 12,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "ft = in / 12",
    body: "To convert from inches to feet, divide the total number of inches by 12, because there are 12 inches in a single foot.",
    variables: [
      { symbol: "ft", meaning: "length in feet" },
      { symbol: "in", meaning: "length in inches" }
    ]
  },
  explanation: [
    "This calculator converts your inches to a decimal foot format. For example, 18 inches becomes 1.5 feet.",
    "If you want to know feet and remaining inches (like 1 foot, 6 inches), you can use the whole number for feet and the remainder for inches."
  ],
  examples: [
    { title: "Standard Conversion", scenario: "Convert 48 inches to feet", result: "48 in / 12 = 4 feet" }
  ],
  faq: [
    { q: "How many feet is 24 inches?", a: "24 inches divided by 12 equals exactly 2 feet." },
    { q: "Why divide by 12?", a: "The imperial measurement system defines one foot as being made up of 12 inches." }
  ],
  related: []
};
