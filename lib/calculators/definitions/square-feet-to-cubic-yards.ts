import type { CalculatorConfig } from "../types";
import { createAreaToVolumeConversion } from "../formulas/unit-engine";

export const squareFeetToCubicYards: CalculatorConfig = {
  id: "square-feet-to-cubic-yards",
  slug: "square-feet-to-cubic-yards",
  title: "Square Feet to Cubic Yards Calculator",
  tagline: "Calculate yards of material needed from area and depth.",
  intro: "A simple, fast tool to convert square feet to cubic yards by adding depth. Essential for ordering concrete, dirt, mulch, or gravel.",
  category: "featured-units",
  keywords: ["square feet to cubic yards", "sq ft to cu yd", "how many cubic yards for square feet", "concrete calculator yards"],
  inputs: [
    { name: "area", label: "Area (sq ft)", kind: "unit", defaultValue: 100, min: 0, max: 1000000, step: 1 },
    { name: "depth", label: "Depth (inches)", kind: "unit", defaultValue: 4, min: 0, max: 1000, step: 0.1 }
  ],
  compute: createAreaToVolumeConversion(
    "sq ft",
    "inches",
    "cu yd",
    (area, depth) => (area * (depth / 12)) / 27,
    "An area of {area} at a depth of {depth} yields {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "Cubic Yards = (Area in sq ft × (Depth in inches ÷ 12)) ÷ 27",
    body: "First, convert your depth from inches to feet by dividing by 12. Multiply that by your square footage to get cubic feet, then divide by 27 (since there are 27 cubic feet in a cubic yard) to find cubic yards.",
    variables: [
      { symbol: "Area", meaning: "surface area in square feet" },
      { symbol: "Depth", meaning: "thickness or depth in inches" }
    ]
  },
  explanation: [
    "Cubic yards are the standard unit used for bulk materials like concrete, gravel, and mulch.",
    "Since 1 cubic yard equals 27 cubic feet, you must first calculate the total cubic feet by multiplying your area by your depth (in feet), then divide the result by 27 to convert to cubic yards."
  ],
  examples: [
    { title: "Concrete Patio", scenario: "Pouring a 100 sq ft patio, 4 inches deep.", result: "(100 × (4 ÷ 12)) ÷ 27 = 1.23 cubic yards of concrete" }
  ],
  faq: [
    { q: "How many square feet does 1 cubic yard cover?", a: "At a depth of 3 inches, 1 cubic yard covers 108 square feet. At a depth of 4 inches, it covers 81 square feet." }
  ],
  related: [],
};
