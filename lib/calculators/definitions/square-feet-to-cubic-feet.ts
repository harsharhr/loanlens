import type { CalculatorConfig } from "../types";
import { createAreaToVolumeConversion } from "../formulas/unit-engine";

export const squareFeetToCubicFeet: CalculatorConfig = {
  id: "square-feet-to-cubic-feet",
  slug: "square-feet-to-cubic-feet",
  title: "Square Feet to Cubic Feet Calculator",
  tagline: "Calculate volume from area and depth.",
  intro: "A simple, fast tool to convert square feet to cubic feet by adding depth. Great for estimating soil, mulch, and concrete.",
  category: "featured-units",
  keywords: ["square feet to cubic feet", "sq ft to cu ft", "calculate cubic feet from square feet and depth"],
  inputs: [
    { name: "area", label: "Area (sq ft)", kind: "unit", defaultValue: 100, min: 0, max: 1000000, step: 1 },
    { name: "depth", label: "Depth (inches)", kind: "unit", defaultValue: 3, min: 0, max: 1000, step: 0.1 }
  ],
  compute: createAreaToVolumeConversion(
    "sq ft",
    "inches",
    "cu ft",
    (area, depth) => area * (depth / 12),
    "An area of {area} at a depth of {depth} equals {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "Cubic Feet = Area (sq ft) × (Depth in inches ÷ 12)",
    body: "To find cubic feet from square feet, convert your depth from inches into feet (divide by 12), then multiply by the area.",
    variables: [
      { symbol: "Area", meaning: "surface area in square feet" },
      { symbol: "Depth", meaning: "thickness or depth in inches" }
    ]
  },
  explanation: [
    "Square feet measure two dimensions (length and width), while cubic feet measure three dimensions (length, width, and depth).",
    "To calculate volume in cubic feet, all measurements must be in feet. If your depth is in inches, divide it by 12 first, and then multiply by your square footage."
  ],
  examples: [
    { title: "Garden Bed", scenario: "100 sq ft garden bed, needing 3 inches of mulch.", result: "100 × (3 ÷ 12) = 25 cubic feet of mulch" }
  ],
  faq: [
    { q: "How many cubic feet are in a square foot?", a: "You cannot convert directly without a depth measurement, as square feet measure area and cubic feet measure volume." }
  ],
  related: [],
};
