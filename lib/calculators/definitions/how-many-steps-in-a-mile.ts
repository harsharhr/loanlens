import type { CalculatorConfig } from "../types";
import { computeStepsInAMile } from "../formulas/steps-distance";

export const howManyStepsInAMile: CalculatorConfig = {
  id: "how-many-steps-in-a-mile",
  slug: "how-many-steps-in-a-mile",
  title: "How Many Steps in a Mile",
  tagline: "Estimate the number of steps required to walk one mile.",
  intro: "Calculate your average steps per mile based on your height and biological sex to help track your daily activity.",
  disclaimer: "This calculator provides estimates for informational purposes only. Actual steps may vary based on stride length and terrain, and this is not medical advice.",
  category: "health",
  subcategory: "walking-fitness",
  keywords: ["steps in a mile", "steps per mile", "walking steps"],
  inputs: [
    {
      name: "sex",
      label: "Sex",
      kind: "select",
      defaultValue: 0,
      options: [
        { label: "Female", value: 0 },
        { label: "Male", value: 1 }
      ]
    },
    {
      name: "height",
      label: "Height (cm)",
      kind: "number",
      defaultValue: 170,
      min: 100,
      max: 250,
      step: 1
    }
  ],
  compute: computeStepsInAMile,
  formula: {
    heading: "Steps per Mile Estimation",
    expression: "Steps = 160934 / StrideLength",
    body: "The number of steps in a mile is estimated by dividing the length of a mile in centimeters by your estimated stride length. Stride length is typically estimated using your height and sex.",
    variables: [
      { symbol: "StrideLength", meaning: "Average length of a single step in centimeters" }
    ]
  },
  explanation: [
    "Your stride length varies depending on your height and sex. Taller individuals usually have a longer stride.",
    "On average, a person takes between 2,000 and 2,500 steps to walk a mile."
  ],
  examples: [
    { title: "Average Female", scenario: "A female with a height of 165 cm", result: "Approximately 2,300 steps per mile." }
  ],
  faq: [
    { q: "Is 10,000 steps equal to 5 miles?", a: "Yes, roughly. Since an average mile is about 2,000 to 2,500 steps, 10,000 steps is typically between 4 and 5 miles." }
  ],
  related: ["miles-to-steps", "steps-to-miles"]
};
