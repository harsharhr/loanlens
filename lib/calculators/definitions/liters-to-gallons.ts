import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const litersToGallons: CalculatorConfig = {
  id: "liters-to-gallons",
  slug: "liters-to-gallons",
  title: "Liters to Gallons Calculator",
  tagline: "Easily convert liters to US liquid gallons.",
  intro: "A simple and accurate tool to convert volume from metric liters (L) to US liquid gallons (gal).",
  category: "featured-units",
  keywords: ["liters to gallons", "L to gal", "convert liters to gallons", "metric to imperial volume"],
  inputs: [
    { 
      name: "input", 
      label: "Liters (L)", 
      kind: "unit", 
      defaultValue: 10, 
      min: 0, 
      max: 1000000, 
      step: 0.1 
    }
  ],
  compute: createStandardConversion(
    "L",
    "gal",
    0.264172,
    "{in} is approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "gal = L × 0.264172",
    body: "To convert liters to US liquid gallons, multiply the volume in liters by 0.264172. Alternatively, you can divide by 3.78541.",
    variables: [
      { symbol: "gal", meaning: "volume in US liquid gallons" },
      { symbol: "L", meaning: "volume in liters" }
    ]
  },
  explanation: [
    "Liters are the standard unit of volume in the metric system, while gallons are used in the US customary and British imperial systems.",
    "One US liquid gallon is defined as exactly 231 cubic inches, which is equivalent to 3.785411784 liters. Therefore, one liter equals about 0.264172 gallons."
  ],
  examples: [
    { title: "Standard Fuel Tank", scenario: "Convert 50 liters to gallons", result: "50 L × 0.264172 = 13.2086 gallons" },
    { title: "Large Soda Bottle", scenario: "Convert 2 liters to gallons", result: "2 L × 0.264172 = 0.5283 gallons" }
  ],
  faq: [
    { q: "How many liters are in a gallon?", a: "There are approximately 3.785 liters in one US liquid gallon." },
    { q: "Is 4 liters more than 1 gallon?", a: "Yes, 4 liters is approximately 1.057 gallons, so it is slightly more than 1 gallon." }
  ],
  related: [],
};
