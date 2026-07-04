import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const gallonsToOunces: CalculatorConfig = {
  id: "gallons-to-ounces",
  slug: "gallons-to-ounces",
  title: "Gallons to Ounces Calculator",
  tagline: "Instantly convert US gallons to fluid ounces.",
  intro: "A simple, fast tool to convert volume from US liquid gallons (gal) into US fluid ounces (fl oz).",
  category: "featured-units",
  subcategory: "volume",
  keywords: ["gallons to ounces", "gal to fl oz", "convert gallons to ounces", "fluid ounces converter"],
  inputs: [
    { 
      name: "input", 
      label: "Gallons (gal)", 
      kind: "unit", 
      defaultValue: 1, 
      min: 0, 
      max: 1000000, 
      step: 0.1 
    }
  ],
  compute: createStandardConversion(
    "gal",
    "fl oz",
    128,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "fl oz = gal × 128",
    body: "To convert US liquid gallons to fluid ounces, simply multiply the volume in gallons by 128.",
    variables: [
      { symbol: "fl oz", meaning: "volume in fluid ounces" },
      { symbol: "gal", meaning: "volume in US liquid gallons" }
    ]
  },
  explanation: [
    "Both gallons and fluid ounces are common volume units in the US customary system.",
    "There are 128 US fluid ounces in one US liquid gallon. This makes conversions straightforward by using a simple multiplication or division by 128."
  ],
  examples: [
    { title: "Half Gallon", scenario: "Convert 0.5 gallons to ounces", result: "0.5 gal × 128 = 64 fl oz" },
    { title: "Five Gallon Bucket", scenario: "Convert 5 gallons to ounces", result: "5 gal × 128 = 640 fl oz" }
  ],
  faq: [
    { q: "How many ounces are in 1 gallon?", a: "There are exactly 128 US fluid ounces in 1 US liquid gallon." },
    { q: "How many 16 oz bottles make a gallon?", a: "It takes eight 16-ounce bottles to make one gallon (128 ÷ 16 = 8)." }
  ],
  related: [],
};
