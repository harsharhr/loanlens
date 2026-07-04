import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const feetToMeters: CalculatorConfig = {
  id: "feet-to-meters",
  slug: "feet-to-meters",
  title: "Feet to Meters Calculator",
  tagline: "Easily switch from imperial feet to metric meters.",
  intro: "Convert lengths and distances from feet to meters. A standard tool for architecture, engineering, and everyday use.",
  category: "featured-units",
  subcategory: "height-length",
  keywords: ["feet to meters", "ft to m", "convert feet to meters", "feet to meters calculator"],
  inputs: [
    { name: "input", label: "Feet (ft)", kind: "unit", defaultValue: 10, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "feet",
    "meters",
    0.3048,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "m = ft × 0.3048",
    body: "To convert from feet to meters, multiply your length in feet by the exact conversion factor of 0.3048.",
    variables: [
      { symbol: "m", meaning: "length in meters" },
      { symbol: "ft", meaning: "length in feet" }
    ]
  },
  explanation: [
    "The foot is a standard imperial measure, whereas the meter is the base unit of length in the International System of Units (SI).",
    "In 1959, the international yard and pound agreement standardized the foot as exactly 0.3048 meters."
  ],
  examples: [
    { title: "Standard Length", scenario: "Convert 10 feet to meters", result: "10 ft × 0.3048 = 3.048 meters" }
  ],
  faq: [
    { q: "Is 1 meter longer than 3 feet?", a: "Yes. 1 meter is exactly 3.28084 feet, so it is slightly longer than 3 feet." },
    { q: "How exact is the 0.3048 factor?", a: "It is an exact definition agreed upon internationally." }
  ],
  related: []
};
