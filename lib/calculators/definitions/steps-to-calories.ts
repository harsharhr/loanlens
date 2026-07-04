import type { CalculatorConfig } from "../types";
import { computeStepsToCalories } from "../formulas/steps-distance";

export const stepsToCalories: CalculatorConfig = {
  id: "steps-to-calories",
  slug: "steps-to-calories",
  title: "Steps to Calories Burned",
  tagline: "Estimate calories burned from walking.",
  intro: "Calculate approximately how many calories you've burned based on your total step count and body weight.",
  disclaimer: "Caloric burn estimates are strictly for informational and educational purposes. They do not substitute for professional medical or nutritional advice.",
  category: "health",
  subcategory: "walking-fitness",
  keywords: ["steps to calories", "calories burned walking", "step calories"],
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
      name: "weight",
      label: "Weight (kg)",
      kind: "number",
      defaultValue: 70,
      min: 20,
      max: 300,
      step: 1
    }
  ],
  compute: computeStepsToCalories,
  formula: {
    heading: "Calorie Burn Estimation",
    expression: "Calories = Steps × CaloriesPerStep",
    body: "Caloric burn depends heavily on body weight. A heavier body requires more energy to move, thus burning more calories per step.",
    variables: [
      { symbol: "Steps", meaning: "Your total steps taken" },
      { symbol: "CaloriesPerStep", meaning: "A factor based on your weight (e.g., ~0.04 calories per step)" }
    ]
  },
  explanation: [
    "Walking is an excellent way to burn calories and maintain health.",
    "On average, a person burns about 0.04 calories per step, meaning 10,000 steps burns around 400 calories, though this varies by weight and intensity."
  ],
  examples: [
    { title: "Average Walker", scenario: "10,000 steps at a weight of 70 kg", result: "Burns approximately 400 calories." }
  ],
  faq: [
    { q: "Does walking speed matter?", a: "Yes, faster walking or running burns more calories per minute and slightly more per distance, but step-based estimates primarily rely on body weight." }
  ],
  related: ["steps-to-miles", "miles-to-steps"]
};
