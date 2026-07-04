import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const ouncesToPounds: CalculatorConfig = {
  id: "ounces-to-pounds",
  slug: "ounces-to-pounds",
  title: "Ounces to Pounds Calculator",
  tagline: "Instantly convert ounces to pounds.",
  intro: "A simple, fast tool to convert ounces (oz) into pounds (lbs).",
  category: "featured-units",
  keywords: ["ounces to pounds", "oz to lbs", "convert oz to lbs", "imperial weight"],
  inputs: [
    { name: "input", label: "Ounces (oz)", kind: "unit", defaultValue: 16, min: 0, max: 10000, step: 1 }
  ],
  compute: createStandardConversion(
    "oz",
    "lbs",
    0.0625,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "lbs = oz ÷ 16",
    body: "To convert ounces to pounds, divide the weight in ounces by 16, or multiply by 0.0625.",
    variables: [
      { symbol: "lbs", meaning: "mass in pounds" },
      { symbol: "oz", meaning: "mass in ounces" }
    ]
  },
  explanation: [
    "Ounces and pounds are units of mass used primarily in the US customary and British imperial systems.",
    "There are exactly 16 ounces in an avoirdupois pound. By dividing your ounce measurement by 16, you will find the equivalent weight in pounds."
  ],
  examples: [
    { title: "Baking Ingredients", scenario: "Convert 24 oz to pounds", result: "24 oz ÷ 16 = 1.5 lbs" }
  ],
  faq: [
    { q: "How many ounces are in a pound?", a: "There are exactly 16 ounces in one pound." }
  ],
  related: []
};
