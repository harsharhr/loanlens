import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const cubicFeetToGallons: CalculatorConfig = {
  id: "cubic-feet-to-gallons",
  slug: "cubic-feet-to-gallons",
  title: "Cubic Feet to Gallons Calculator",
  tagline: "Instantly convert cubic feet to US liquid gallons.",
  intro: "A fast and reliable tool to convert volume from cubic feet (cu ft) into US liquid gallons (gal). Useful for pools, tanks, and fluid capacity.",
  category: "featured-units",
  keywords: ["cubic feet to gallons", "cu ft to gal", "convert cubic feet to gallons", "volume converter"],
  inputs: [
    { 
      name: "input", 
      label: "Cubic Feet (cu ft)", 
      kind: "unit", 
      defaultValue: 10, 
      min: 0, 
      max: 1000000, 
      step: 0.1 
    }
  ],
  compute: createStandardConversion(
    "cu ft",
    "gal",
    7.480519,
    "{in} is approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "gal = cu ft × 7.48052",
    body: "To convert cubic feet to US liquid gallons, multiply the volume in cubic feet by 7.48052.",
    variables: [
      { symbol: "gal", meaning: "volume in US liquid gallons" },
      { symbol: "cu ft", meaning: "volume in cubic feet" }
    ]
  },
  explanation: [
    "Cubic feet and US liquid gallons are both units of volume used in the US customary system.",
    "One cubic foot is defined exactly as the volume of a cube with sides of 1 foot in length. There are exactly 231 cubic inches in a US liquid gallon, which translates to approximately 7.48052 gallons per cubic foot."
  ],
  examples: [
    { title: "Standard Bathtub", scenario: "Convert 6 cubic feet to gallons", result: "6 cu ft × 7.48052 = 44.883 gallons" },
    { title: "Small Pool", scenario: "Convert 100 cubic feet to gallons", result: "100 cu ft × 7.48052 = 748.05 gallons" }
  ],
  faq: [
    { q: "How many gallons are in a cubic foot?", a: "There are approximately 7.48052 US liquid gallons in one cubic foot." },
    { q: "Is a cubic foot of water heavy?", a: "Yes, 1 cubic foot of water equals about 7.48 gallons, which weighs approximately 62.4 pounds." }
  ],
  related: [],
};
