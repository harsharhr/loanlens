import type { CalculatorConfig } from "../types";
import { createStandardConversion } from "../formulas/unit-engine";

export const microgramsToMg: CalculatorConfig = {
  id: "micrograms-to-mg",
  slug: "micrograms-to-mg",
  title: "Micrograms to Milligrams Calculator",
  tagline: "Instantly convert mcg to mg.",
  intro: "A simple, fast tool to convert micrograms into milligrams.",
  category: "featured-units",
  keywords: ["micrograms to mg", "mcg to mg", "μg to mg", "convert mcg to mg"],
  inputs: [
    { name: "input", label: "Micrograms (mcg)", kind: "unit", defaultValue: 1000, min: 0, max: 10000000, step: 1 }
  ],
  compute: createStandardConversion(
    "mcg",
    "mg",
    0.001,
    "{in} is exactly {out}."
  ),
  formula: {
    heading: "The Conversion Formula",
    expression: "mg = mcg × 0.001",
    body: "To convert micrograms to milligrams, multiply the mass in micrograms by 0.001, or simply divide by 1000.",
    variables: [
      { symbol: "mg", meaning: "mass in milligrams" },
      { symbol: "mcg", meaning: "mass in micrograms" }
    ]
  },
  explanation: [
    "Both micrograms (mcg or μg) and milligrams (mg) are metric units of mass.",
    "The prefix 'micro-' denotes one millionth of a base unit, and 'milli-' denotes one thousandth. Therefore, there are 1000 micrograms in one milligram."
  ],
  examples: [
    { title: "Supplement Dosage", scenario: "Convert 500 mcg to mg", result: "500 mcg ÷ 1000 = 0.5 mg" }
  ],
  faq: [
    { q: "Is 1000 mcg the same as 1 mg?", a: "Yes, 1000 micrograms (mcg) is exactly equal to 1 milligram (mg)." }
  ],
  related: []
};
