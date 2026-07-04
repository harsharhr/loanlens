import type { CalculatorConfig } from "../types";
import { createCompoundConversion } from "../formulas/unit-engine";

export const metersToFeetInches: CalculatorConfig = {
  id: "meters-to-feet-inches",
  slug: "meters-to-feet-inches",
  title: "Meters to Feet and Inches Calculator",
  tagline: "Convert meters into a combination of feet and inches.",
  intro: "A quick tool to turn metric meters into both total feet and a split feet-and-inches measurement. Helpful for tracking height and building materials.",
  category: "featured-units",
  keywords: ["meters to feet and inches", "m to ft in", "convert meters to feet inches", "meters to feet and inches calculator"],
  inputs: [
    { name: "input", label: "Meters (m)", kind: "unit", defaultValue: 2, min: 0, max: 10000, step: 0.01 }
  ],
  compute: createCompoundConversion(
    "meters",
    "Feet",
    "Inches",
    (m) => {
      const totalFeet = m * 3.280839895;
      const feet = Math.floor(totalFeet);
      const inches = (totalFeet - feet) * 12;
      return { primary: feet, secondary: inches, decimal: totalFeet, decimalUnit: "feet" };
    },
    "{in} is approximately {primary} feet and {secondary} inches (or {decimal} total decimal feet)."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "Total Feet = m × 3.28084; Feet = Math.floor(Total Feet); Inches = (Total Feet - Feet) × 12",
    body: "First, convert meters to total decimal feet by multiplying by 3.28084. Then, take the whole number part for feet. Finally, multiply the decimal remainder by 12 to get the remaining inches.",
    variables: [
      { symbol: "m", meaning: "length in meters" }
    ]
  },
  explanation: [
    "While the metric system uses base 10, imperial units have subdivisions like 12 inches in a foot.",
    "This calculator separates the full feet from the remaining fraction, presenting the remainder as inches for easy real-world use."
  ],
  examples: [
    { title: "Average Door Height", scenario: "Convert 2 meters to feet and inches", result: "2 m ≈ 6 feet 6.74 inches" }
  ],
  faq: [
    { q: "How many feet are in a meter?", a: "One meter is roughly equal to 3.28084 feet." },
    { q: "Why split into feet and inches?", a: "Because fractional feet (like 1.5 feet) are less commonly used in everyday language than combinations (like 1 foot 6 inches)." }
  ],
  related: []
};
