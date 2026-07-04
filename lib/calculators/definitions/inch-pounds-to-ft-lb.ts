import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const inchPoundsToFtLb: CalculatorConfig = {
  id: "inch-pounds-to-ft-lb",
  slug: "inch-pounds-to-ft-lb",
  title: "Inch-Pounds to Foot-Pounds Calculator",
  tagline: "Instantly convert in-lb to ft-lb.",
  intro: "A simple, fast tool to convert torque or work from inch-pounds into foot-pounds. This is commonly needed in automotive, mechanical engineering, and construction when applying specific torque to fasteners.",
  category: "featured-units",
  keywords: ["inch pounds to foot pounds", "in-lb to ft-lb", "torque conversion", "inch lbs to ft lbs"],
  inputs: [
    { name: "input", label: "Inch-Pounds (in-lb)", kind: "unit", defaultValue: 120, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "in-lb",
    "ft-lb",
    1 / 12,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "ft-lb = in-lb ÷ 12",
    body: "To convert inch-pounds to foot-pounds, divide the torque value by 12, since there are 12 inches in a foot.",
    variables: [
      { symbol: "ft-lb", meaning: "torque in foot-pounds" },
      { symbol: "in-lb", meaning: "torque in inch-pounds" }
    ]
  },
  explanation: [
    "Foot-pounds and inch-pounds are both units of torque (and energy or work) in the Imperial and US customary systems.",
    "Because a foot is made of 12 inches, one foot-pound equals 12 inch-pounds. Dividing by 12 gives the correct equivalent in foot-pounds."
  ],
  examples: [
    { title: "Spark Plug Torque", scenario: "Convert 180 in-lb to ft-lb", result: "180 in-lb ÷ 12 = 15 ft-lb" }
  ],
  faq: [
    { q: "How many inch-pounds are in a foot-pound?", a: "There are exactly 12 inch-pounds in one foot-pound." }
  ],
  related: [],
};
