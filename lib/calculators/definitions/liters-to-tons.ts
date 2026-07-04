import type { CalculatorConfig } from "../types";
import { createDensityConversion } from "../formulas/unit-engine";

export const litersToTons: CalculatorConfig = {
  id: "liters-to-tons",
  slug: "liters-to-tons",
  title: "Liters to Tons Calculator",
  tagline: "Convert volume in liters to weight in metric tons.",
  intro: "A precise tool to calculate the weight of liquids or bulk materials in metric tons based on their volume in liters (L) and specific density.",
  category: "featured-units",
  keywords: ["liters to tons", "liters to metric tons", "convert L to t", "volume to metric weight"],
  inputs: [
    { 
      name: "input", 
      label: "Liters (L)", 
      kind: "unit", 
      defaultValue: 1000, 
      min: 0, 
      max: 10000000, 
      step: 1 
    },
    { 
      name: "density", 
      label: "Density (Metric Tons per L)", 
      kind: "number", 
      defaultValue: 0.001, 
      min: 0.0001, 
      max: 0.02, 
      step: 0.0001,
      options: [
        { label: "Water (0.001)", value: 0.001 },
        { label: "Milk (0.00103)", value: 0.00103 },
        { label: "Gasoline (0.00074)", value: 0.00074 },
        { label: "Diesel Fuel (0.00085)", value: 0.00085 },
        { label: "Concrete (0.0024)", value: 0.0024 },
        { label: "Dry Sand (0.0016)", value: 0.0016 }
      ]
    }
  ],
  compute: createDensityConversion(
    "L",
    "Metric Tons",
    0.001,
    "{in} of this material weighs approximately {out}."
  ),
  formula: {
    heading: "The Density Formula",
    expression: "Metric Tons = Liters × Density (t/L)",
    body: "To find the weight in metric tons (tonnes), multiply the volume in liters by the material's density measured in metric tons per liter.",
    variables: [
      { symbol: "Metric Tons", meaning: "total weight in metric tons (1 t = 1,000 kg)" },
      { symbol: "Liters", meaning: "volume of the material" },
      { symbol: "Density", meaning: "weight of the material per liter" }
    ]
  },
  explanation: [
    "To convert a volume in liters to a weight, you must account for the density of the substance. One liter of a dense substance like concrete weighs much more than one liter of gasoline.",
    "A metric ton (tonne) is exactly 1,000 kilograms. Since 1 liter of pure water weighs exactly 1 kilogram, 1,000 liters of water weighs 1 metric ton (density of 0.001 t/L)."
  ],
  examples: [
    { title: "Water Tank", scenario: "1,000 liters of water (density 0.001 t/L)", result: "1,000 × 0.001 = 1.0 metric ton" },
    { title: "Fuel Delivery", scenario: "5,000 liters of gasoline (density 0.00074 t/L)", result: "5,000 × 0.00074 = 3.7 metric tons" }
  ],
  faq: [
    { q: "How many liters of water make a ton?", a: "Exactly 1,000 liters of pure water weigh 1 metric ton." },
    { q: "What is the difference between a metric ton and a short ton?", a: "A metric ton is 1,000 kilograms (about 2,204.6 pounds). A short ton (used in the US) is exactly 2,000 pounds. This calculator uses metric tons." }
  ],
  related: [],
};
