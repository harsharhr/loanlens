import type { CalculatorConfig } from "../types";
import { computePaceTime } from "../formulas/steps-distance";

export const howLongToWalkAMile: CalculatorConfig = {
  id: "how-long-to-walk-a-mile",
  slug: "how-long-to-walk-a-mile",
  title: "How Long to Walk a Mile",
  tagline: "Calculate the time required to walk a mile based on your pace.",
  intro: "Use this tool to estimate how many minutes it will take to walk a mile at various speeds, whether you are strolling or walking briskly.",
  disclaimer: "This tool provides a time estimate for informational purposes only. It is not intended as medical or fitness advice.",
  category: "health",
  subcategory: "walking-fitness",
  keywords: ["walking time", "mile time", "how long to walk a mile", "walking pace"],
  inputs: [
    {
      name: "pace",
      label: "Walking Pace (mph)",
      kind: "select",
      defaultValue: 3.5,
      options: [
        { label: "Relaxed (3 mph)", value: 3 },
        { label: "Moderate (3.5 mph)", value: 3.5 },
        { label: "Brisk (4 mph)", value: 4 },
        { label: "Fast (5 mph)", value: 5 }
      ]
    }
  ],
  compute: computePaceTime,
  formula: {
    heading: "Time Calculation",
    expression: "Time = (Distance / Pace) × 60",
    body: "The time to walk a distance is calculated by dividing the distance (in miles) by your walking pace (in miles per hour), then multiplying by 60 to convert to minutes.",
    variables: [
      { symbol: "Distance", meaning: "Distance in miles (1 mile)" },
      { symbol: "Pace", meaning: "Walking speed in miles per hour (mph)" }
    ]
  },
  explanation: [
    "Walking time depends primarily on your pace.",
    "A moderate pace of 3.5 mph will generally take about 17 minutes to complete a mile."
  ],
  examples: [
    { title: "Brisk Walk", scenario: "Walking at a brisk pace of 4 mph", result: "Takes approximately 15 minutes to complete a mile." }
  ],
  faq: [
    { q: "How long does a typical mile take?", a: "For an average person, walking a mile takes between 15 and 20 minutes depending on speed and terrain." }
  ],
  related: ["miles-to-steps", "how-many-steps-in-a-mile"]
};
