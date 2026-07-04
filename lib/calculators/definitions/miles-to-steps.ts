import type { CalculatorConfig } from "../types";
import { computeMilesToSteps } from "../formulas/steps-distance";

export const milesToSteps: CalculatorConfig = {
  id: "miles-to-steps",
  slug: "miles-to-steps",
  title: "Miles to Steps Converter",
  tagline: "Convert a distance in miles to the number of steps.",
  intro: "Easily translate the miles you've walked or run into steps based on your height and sex for a more accurate activity log.",
  disclaimer: "This estimation tool is for informational tracking only and does not constitute medical or professional fitness advice.",
  category: "health",
  subcategory: "walking-fitness",
  keywords: ["miles to steps", "convert miles to steps", "walking distance steps"],
  inputs: [
    {
      name: "miles",
      label: "Distance (miles)",
      kind: "number",
      defaultValue: 1,
      min: 0.1,
      max: 100,
      step: 0.1
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
  compute: computeMilesToSteps,
  formula: {
    heading: "Distance to Steps",
    expression: "Total Steps = Steps per Mile × Miles",
    body: "First, your stride length is calculated using your height and sex to determine steps per mile. This number is then multiplied by the total miles walked.",
    variables: [
      { symbol: "Miles", meaning: "The distance covered in miles" }
    ]
  },
  explanation: [
    "Knowing how many steps correspond to your walking distance can help you meet daily step goals.",
    "Individuals with longer strides will accumulate fewer steps for the same distance."
  ],
  examples: [
    { title: "A 3-Mile Walk", scenario: "Walking 3 miles as an average height male", result: "Generates approximately 6,000 to 7,000 steps." }
  ],
  faq: [
    { q: "Can I use this for running?", a: "Running stride lengths differ significantly from walking strides, so this estimate is most accurate for walking." }
  ],
  related: ["steps-to-miles", "how-many-steps-in-a-mile"]
};
