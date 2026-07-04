import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const newtonMetersToFtLb: CalculatorConfig = {
  id: "newton-meters-to-ft-lb",
  slug: "newton-meters-to-ft-lb",
  title: "Newton-Meters to Foot-Pounds Calculator",
  tagline: "Instantly convert Nm to ft-lb.",
  intro: "A simple, fast tool to convert torque from newton-meters into foot-pounds, frequently used by mechanics and engineers worldwide.",
  category: "featured-units",
  keywords: ["newton meters to foot pounds", "nm to ft-lb", "torque calculator nm to ft lbs", "convert nm to ft lb"],
  inputs: [
    { name: "input", label: "Newton-Meters (Nm)", kind: "unit", defaultValue: 100, min: 0, max: 1000000, step: 0.1 }
  ],
  compute: createStandardConversion(
    "Nm",
    "ft-lb",
    0.737562,
    "{in} equals approximately {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "ft-lb = Nm × 0.737562",
    body: "To convert newton-meters to foot-pounds, multiply the torque by 0.737562.",
    variables: [
      { symbol: "ft-lb", meaning: "torque in foot-pounds" },
      { symbol: "Nm", meaning: "torque in newton-meters" }
    ]
  },
  explanation: [
    "Newton-meter (Nm) is a metric unit of torque, while the foot-pound (ft-lb) is its imperial counterpart.",
    "One newton-meter is approximately equal to 0.737562 foot-pounds. This conversion is crucial when working on vehicles that list metric torque specs while you own an imperial torque wrench."
  ],
  examples: [
    { title: "Wheel Lug Nut Torque", scenario: "Convert 130 Nm to ft-lb", result: "130 Nm × 0.737562 = 95.88 ft-lb" }
  ],
  faq: [
    { q: "Which is bigger, Nm or ft-lb?", a: "A foot-pound is larger. One foot-pound equals approximately 1.3558 Nm." },
    { q: "What is 1 Nm in ft-lb?", a: "1 Nm is equal to roughly 0.737562 ft-lb." }
  ],
  related: [],
};
