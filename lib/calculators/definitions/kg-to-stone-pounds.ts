import type { CalculatorConfig } from "../types";
import { createCompoundConversion } from "../formulas/unit-engine";

export const kgToStonePounds: CalculatorConfig = {
  id: "kg-to-stone-pounds",
  slug: "kg-to-stone-pounds",
  title: "Kilograms to Stone & Pounds Calculator",
  tagline: "Instantly convert kg to stone and pounds.",
  intro: "A simple, fast tool to convert kilograms into stone and pounds (st & lbs).",
  category: "featured-units",
  subcategory: "mass-weight",
  keywords: ["kg to stone and pounds", "kilograms to st lbs", "convert kg to stone", "weight conversion"],
  inputs: [
    { name: "input", label: "Kilograms (kg)", kind: "unit", defaultValue: 70, min: 0, max: 500, step: 0.1 }
  ],
  compute: createCompoundConversion(
    "kg",
    "Stone",
    "Pounds",
    (input) => {
      const totalPounds = input * 2.20462262;
      const primary = Math.floor(totalPounds / 14);
      const secondary = totalPounds % 14;
      const decimal = totalPounds / 14;
      return { primary, secondary, decimal, decimalUnit: "stone" };
    },
    "{in} is approximately {primary} stone and {secondary} pounds (or {decimal} stone in total)."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "lbs = kg × 2.20462262, then st = floor(lbs / 14), remaining lbs = lbs mod 14",
    body: "To convert kilograms to stone and pounds, first multiply the mass in kilograms by 2.20462262 to get the total pounds. Divide by 14 to find the whole stone, and the remainder is the leftover pounds.",
    variables: [
      { symbol: "kg", meaning: "mass in kilograms" },
      { symbol: "st", meaning: "whole stone" },
      { symbol: "lbs", meaning: "remaining pounds" }
    ]
  },
  explanation: [
    "Kilograms are the standard metric measure of mass, while stone and pounds are traditionally used in the UK and Ireland for body weight.",
    "Since one kilogram is roughly 2.20462 pounds, and one stone is exactly 14 pounds, you convert to total pounds first, then extract the whole 14-pound chunks as stone, leaving the rest as pounds."
  ],
  examples: [
    { title: "Average Adult", scenario: "Convert 75 kg to stone and pounds", result: "75 kg × 2.20462 = 165.34 lbs. 165.34 ÷ 14 = 11 stone with 11.34 lbs left over." }
  ],
  faq: [
    { q: "How many stone and pounds in a kg?", a: "One kilogram is roughly 0.157 stone or 2.204 pounds. It takes about 6.35 kg to make 1 stone." }
  ],
  related: []
};
