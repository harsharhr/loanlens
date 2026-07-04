import type { CalculatorConfig } from "../types";
import { createDensityConversion } from "../formulas/unit-engine";

export const cubicYardsToTons: CalculatorConfig = {
  id: "cubic-yards-to-tons",
  slug: "cubic-yards-to-tons",
  title: "Cubic Yards to Tons Calculator",
  tagline: "Convert volume in cubic yards to weight in tons.",
  intro: "A useful tool for calculating the weight (in tons) of materials based on their volume in cubic yards. Ideal for landscaping, construction, and hauling.",
  category: "featured-units",
  subcategory: "volume-to-weight",
  keywords: ["cubic yards to tons", "cu yd to tons", "convert cubic yards to tons", "volume to weight"],
  inputs: [
    { 
      name: "input", 
      label: "Cubic Yards (cu yd)", 
      kind: "unit", 
      defaultValue: 10, 
      min: 0, 
      max: 1000000, 
      step: 0.1 
    },
    { 
      name: "density", 
      label: "Density (Tons per cu yd)", 
      kind: "number", 
      defaultValue: 1.35, 
      min: 0.1, 
      max: 10, 
      step: 0.01,
      options: [
        { label: "Dry Sand (1.35)", value: 1.35 },
        { label: "Wet Sand (1.52)", value: 1.52 },
        { label: "Gravel (1.40)", value: 1.40 },
        { label: "Concrete (2.02)", value: 2.02 },
        { label: "Topsoil (1.00)", value: 1.00 },
        { label: "Mulch (0.35)", value: 0.35 },
        { label: "Water (0.84)", value: 0.84 }
      ]
    }
  ],
  compute: createDensityConversion(
    "cu yd",
    "tons",
    1.35,
    "{in} of this material weighs approximately {out}."
  ),
  formula: {
    heading: "The Density Formula",
    expression: "Tons = Cubic Yards × Density (tons/cu yd)",
    body: "To find the weight in tons, multiply the volume in cubic yards by the material's density (in tons per cubic yard).",
    variables: [
      { symbol: "Tons", meaning: "total weight in short tons (2,000 lbs)" },
      { symbol: "Cubic Yards", meaning: "volume of the material" },
      { symbol: "Density", meaning: "weight of the material per cubic yard" }
    ]
  },
  explanation: [
    "Volume-to-weight conversions depend entirely on the material's density. A cubic yard of feathers is much lighter than a cubic yard of gravel.",
    "This calculator uses standard estimated densities for common materials. Exact weights can vary based on moisture content, compaction, and specific material composition."
  ],
  examples: [
    { title: "Gravel Driveway", scenario: "10 cubic yards of gravel (density 1.4 tons/cu yd)", result: "10 × 1.4 = 14 tons" },
    { title: "Garden Topsoil", scenario: "5 cubic yards of topsoil (density 1.0 tons/cu yd)", result: "5 × 1.0 = 5 tons" }
  ],
  faq: [
    { q: "How many tons is a cubic yard of gravel?", a: "A cubic yard of typical gravel weighs approximately 1.4 tons (2,800 lbs), though this can vary depending on the stone type and moisture." },
    { q: "What is a short ton?", a: "In the United States, a 'ton' typically refers to a short ton, which is exactly 2,000 pounds." }
  ],
  related: [],
};
