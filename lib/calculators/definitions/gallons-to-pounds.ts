import type { CalculatorConfig } from "../types";
import { createDensityConversion } from "../formulas/unit-engine";

export const gallonsToPounds: CalculatorConfig = {
  id: "gallons-to-pounds",
  slug: "gallons-to-pounds",
  title: "Gallons to Pounds Calculator",
  tagline: "Convert US liquid gallons to pounds based on density.",
  intro: "An easy tool to calculate the weight of liquids in pounds (lbs) based on their volume in US gallons (gal) and their specific density.",
  category: "featured-units",
  subcategory: "volume-to-weight",
  keywords: ["gallons to pounds", "gal to lbs", "convert gallons to pounds", "liquid weight calculator"],
  inputs: [
    { 
      name: "input", 
      label: "Gallons (gal)", 
      kind: "unit", 
      defaultValue: 10, 
      min: 0, 
      max: 1000000, 
      step: 0.1 
    },
    { 
      name: "density", 
      label: "Density (Lbs per gal)", 
      kind: "number", 
      defaultValue: 8.34, 
      min: 0.1, 
      max: 100, 
      step: 0.01,
      options: [
        { label: "Water (8.34)", value: 8.34 },
        { label: "Milk (8.60)", value: 8.60 },
        { label: "Cooking Oil (7.60)", value: 7.60 },
        { label: "Gasoline (6.00)", value: 6.00 },
        { label: "Honey (12.00)", value: 12.00 },
        { label: "Paint (10.00)", value: 10.00 }
      ]
    }
  ],
  compute: createDensityConversion(
    "gal",
    "lbs",
    8.34,
    "{in} of this liquid weighs approximately {out}."
  ),
  formula: {
    heading: "The Density Formula",
    expression: "Lbs = Gallons × Density (lbs/gal)",
    body: "To find the weight in pounds, multiply the volume in US liquid gallons by the liquid's density in pounds per gallon.",
    variables: [
      { symbol: "Lbs", meaning: "total weight in pounds" },
      { symbol: "Gallons", meaning: "volume of the liquid in US gallons" },
      { symbol: "Density", meaning: "weight of the liquid per gallon" }
    ]
  },
  explanation: [
    "Because different liquids have different densities, a gallon of one liquid will not weigh the same as a gallon of another. For example, honey is much denser and heavier than water.",
    "Water is the most common reference point. One US liquid gallon of water at room temperature weighs approximately 8.34 pounds."
  ],
  examples: [
    { title: "Bucket of Water", scenario: "5 gallons of water (density 8.34 lbs/gal)", result: "5 × 8.34 = 41.7 lbs" },
    { title: "Jug of Honey", scenario: "1 gallon of honey (density 12.0 lbs/gal)", result: "1 × 12.0 = 12.0 lbs" }
  ],
  faq: [
    { q: "How much does a gallon of water weigh?", a: "A US liquid gallon of water weighs approximately 8.34 pounds at standard room temperature." },
    { q: "Is a gallon of milk heavier than water?", a: "Yes, milk is slightly denser than water and weighs about 8.6 pounds per gallon." }
  ],
  related: [],
};
