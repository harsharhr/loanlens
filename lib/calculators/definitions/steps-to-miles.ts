import type { CalculatorConfig } from "../types";
import { computeStepsToMiles } from "../formulas/steps-distance";

export const stepsToMiles: CalculatorConfig = {
  id: "steps-to-miles",
  slug: "steps-to-miles",
  title: "Steps to Miles Calculator",
  tagline: "Easily convert your step count into miles.",
  intro: "Translate the steps on your pedometer or fitness tracker into total miles walked, customized by your height and biological sex.",
  disclaimer: "Distance estimates provided by this calculator are for informational tracking only and do not replace professional health or medical advice.",
  category: "health",
  subcategory: "walking-fitness",
  keywords: ["steps to miles", "convert steps to miles", "how many miles is my steps"],
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
  compute: computeStepsToMiles,
  formula: {
    heading: "Steps to Miles Equation",
    expression: "Miles = Steps / StepsPerMile",
    body: "Your total steps are divided by the calculated steps per mile for your height and sex, returning the total distance in miles.",
    variables: [
      { symbol: "Steps", meaning: "Total steps recorded" },
      { symbol: "StepsPerMile", meaning: "Your personalized step count for one mile" }
    ]
  },
  explanation: [
    "Understanding your distance in miles helps you relate your daily activity to known routes and goals.",
    "Since stride length varies, 10,000 steps will yield a slightly different mileage for everyone."
  ],
  examples: [
    { title: "Standard Benchmark", scenario: "Converting 10,000 steps", result: "Typically yields between 4 and 5 miles depending on your stride." }
  ],
  faq: [
    { q: "Are step trackers accurate for miles?", a: "Step trackers guess your stride length unless you calibrate them. Using your precise height makes manual calculations like this one more accurate." }
  ],
  related: ["steps-to-km", "miles-to-steps"]
};
