import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const squareMetersToSquareFeet: CalculatorConfig = {
  id: "square-meters-to-square-feet",
  slug: "square-meters-to-square-feet",
  title: "Square Meters to Square Feet Calculator",
  tagline: "Instantly convert sq m to sq ft.",
  intro: "A simple, fast tool to convert square meters into square feet, perfect for architecture, flooring, and international real estate.",
  category: "featured-units",
  keywords: ["square meters to square feet", "sq m to sq ft", "convert sq meters to sq feet", "m2 to sq ft"],
  inputs: [
    { name: "input", label: "Square Meters (sq m)", kind: "unit", defaultValue: 100, min: 0, max: 10000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "sq m",
    "sq ft",
    10.76391,
    "{in} equals approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "sq ft = sq m × 10.76391",
    body: "To convert square meters to square feet, multiply the area by 10.76391.",
    variables: [
      { symbol: "sq ft", meaning: "area in square feet" },
      { symbol: "sq m", meaning: "area in square meters" }
    ]
  },
  explanation: [
    "Square meter (m²) is the standard metric unit of area, whereas square foot (ft²) is used in the US customary system.",
    "Since 1 meter is exactly 3.28084 feet, squaring that value yields approximately 10.76391. Multiplying square meters by this factor provides the square footage."
  ],
  examples: [
    { title: "Small Apartment", scenario: "Convert 50 sq m to sq ft", result: "50 sq m × 10.76391 = 538.195 sq ft" }
  ],
  faq: [
    { q: "What is 1 square meter in square feet?", a: "1 square meter is equal to roughly 10.764 square feet." }
  ],
  related: [],
};
