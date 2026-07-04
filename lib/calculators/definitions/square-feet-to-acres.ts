import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const squareFeetToAcres: CalculatorConfig = {
  id: "square-feet-to-acres",
  slug: "square-feet-to-acres",
  title: "Square Feet to Acres Calculator",
  tagline: "Instantly convert sq ft to acres.",
  intro: "A simple, fast tool to convert land area from square feet into acres. Useful for real estate, farming, and property development.",
  category: "featured-units",
  subcategory: "area",
  keywords: ["square feet to acres", "sq ft to acres", "convert sq ft to acres", "how many square feet in an acre"],
  inputs: [
    { name: "input", label: "Square Feet (sq ft)", kind: "unit", defaultValue: 43560, min: 0, max: 1000000000, step: 1 }
  ],
  compute: createStandardConversion(
    "sq ft",
    "acres",
    1 / 43560,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "acres = sq ft ÷ 43,560",
    body: "To convert square feet into acres, divide the total square footage by 43,560.",
    variables: [
      { symbol: "acres", meaning: "total area in acres" },
      { symbol: "sq ft", meaning: "total area in square feet" }
    ]
  },
  explanation: [
    "An acre is a measure of land area used primarily in the US and the UK. One acre is exactly 43,560 square feet.",
    "By dividing any given square footage by 43,560, you find the equivalent area in acres."
  ],
  examples: [
    { title: "Standard Suburban Lot", scenario: "Convert 10,890 sq ft to acres", result: "10,890 ÷ 43,560 = 0.25 acres (a quarter acre)" }
  ],
  faq: [
    { q: "How many square feet are in 1 acre?", a: "There are exactly 43,560 square feet in one acre." }
  ],
  related: [],
};
