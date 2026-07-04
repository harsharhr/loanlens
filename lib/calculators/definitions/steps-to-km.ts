import type { CalculatorConfig } from "../types";
import { computeStepsToKm } from "../formulas/steps-distance";

export const stepsToKm: CalculatorConfig = {
  id: "steps-to-km",
  slug: "steps-to-km",
  title: "Steps to Kilometers Calculator",
  tagline: "Convert your daily steps into kilometers.",
  intro: "Find out the exact distance in kilometers that you covered today by converting your total step count based on your stride length.",
  disclaimer: "This tool provides an estimated distance for informational purposes only. It is not intended for clinical or medical use.",
  category: "health",
  subcategory: "walking-fitness",
  keywords: ["steps to km", "convert steps to kilometers", "step distance metric"],
  inputs: [
    {
      name: "steps",
      label: "Number of Steps",
      kind: "number",
      defaultValue: 10000,
      min: 1,
      max: 200000,
      step: 100
    },
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
  compute: computeStepsToKm,
  formula: {
    heading: "Steps to KM Formula",
    expression: "Kilometers = (Steps × StrideLength) / 100000",
    body: "Your step count is multiplied by your stride length (in centimeters) to find the total distance in centimeters, which is then divided by 100,000 to convert to kilometers.",
    variables: [
      { symbol: "Steps", meaning: "Total steps taken" },
      { symbol: "StrideLength", meaning: "Length of a single step in cm" }
    ]
  },
  explanation: [
    "Most fitness trackers estimate distance based on an average stride length. Providing your exact height gives a much better estimate.",
    "A typical person needs to walk roughly 1,200 to 1,500 steps to cover one kilometer."
  ],
  examples: [
    { title: "10,000 Steps Goal", scenario: "10,000 steps for an average height person", result: "Usually equates to roughly 7 to 8 kilometers." }
  ],
  faq: [
    { q: "How many steps make 5 km?", a: "A 5 km walk is typically around 6,000 to 7,500 steps, depending on your height." }
  ],
  related: ["steps-to-miles", "miles-to-steps"]
};
