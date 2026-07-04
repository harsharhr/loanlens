import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const stoneToPounds: CalculatorConfig = {
  id: "stone-to-pounds",
  slug: "stone-to-pounds",
  title: "Stone to Pounds Calculator",
  tagline: "Instantly convert stone to pounds.",
  intro: "A simple, fast tool to convert British stone into decimal pounds.",
  category: "featured-units",
  subcategory: "mass-weight",
  keywords: ["stone to pounds", "st to lbs", "convert stone to lbs", "british weight"],
  inputs: [
    { name: "input", label: "Stone (st)", kind: "unit", defaultValue: 10, min: 0, max: 1000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "st",
    "lbs",
    14,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "lbs = st × 14",
    body: "To convert stone to pounds, multiply the weight in stone by 14.",
    variables: [
      { symbol: "lbs", meaning: "mass in pounds" },
      { symbol: "st", meaning: "mass in stone" }
    ]
  },
  explanation: [
    "The stone is an English and imperial unit of mass, frequently used in the UK and Ireland to measure human body weight.",
    "One stone is officially defined as exactly 14 pounds. You can easily find the pounds equivalent by multiplying your stone value by 14."
  ],
  examples: [
    { title: "Body Weight", scenario: "Convert 11.5 stone to pounds", result: "11.5 st × 14 = 161 lbs" }
  ],
  faq: [
    { q: "How many pounds make a stone?", a: "There are exactly 14 pounds in one stone." }
  ],
  related: []
};
