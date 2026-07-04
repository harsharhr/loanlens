import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const litersToOunces: CalculatorConfig = {
  id: "liters-to-ounces",
  slug: "liters-to-ounces",
  title: "Liters to Ounces Calculator",
  tagline: "Quickly convert liters to US fluid ounces.",
  intro: "An easy-to-use tool for converting metric volume in liters (L) to US customary fluid ounces (fl oz).",
  category: "featured-units",
  keywords: ["liters to ounces", "L to fl oz", "convert liters to fluid ounces", "metric volume to ounces"],
  inputs: [
    { 
      name: "input", 
      label: "Liters (L)", 
      kind: "unit", 
      defaultValue: 1, 
      min: 0, 
      max: 1000000, 
      step: 0.1 
    }
  ],
  compute: createStandardConversion(
    "L",
    "fl oz",
    33.814,
    "{in} is approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "fl oz = L × 33.814",
    body: "To convert liters into US fluid ounces, simply multiply the volume in liters by 33.814.",
    variables: [
      { symbol: "fl oz", meaning: "volume in US fluid ounces" },
      { symbol: "L", meaning: "volume in liters" }
    ]
  },
  explanation: [
    "Liters belong to the metric system, whereas fluid ounces are part of the US customary system.",
    "One liter is equal to 1,000 milliliters. Because one US fluid ounce is exactly 29.5735295625 milliliters, a liter contains approximately 33.814 US fluid ounces."
  ],
  examples: [
    { title: "Standard Water Bottle", scenario: "Convert 0.5 liters to fluid ounces", result: "0.5 L × 33.814 = 16.907 fl oz" },
    { title: "Two-Liter Bottle", scenario: "Convert 2 liters to fluid ounces", result: "2 L × 33.814 = 67.628 fl oz" }
  ],
  faq: [
    { q: "How many ounces are in 1 liter?", a: "There are approximately 33.814 US fluid ounces in 1 liter." },
    { q: "Is 32 oz exactly 1 liter?", a: "No, 32 ounces is slightly less than a liter (about 0.946 liters). A full liter is about 33.814 ounces." }
  ],
  related: [],
};
