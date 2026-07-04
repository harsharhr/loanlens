import type { CalculatorConfig } from "../types";
import { computeNutritionEnergy } from "../formulas/nutrition-energy";

export const kilojoulesToCalories: CalculatorConfig = {
  id: "kilojoules-to-calories",
  slug: "kilojoules-to-calories",
  title: "Kilojoules to Calories Converter",
  tagline: "Easily convert between kilojoules and kilocalories.",
  intro: "This tool allows you to convert nutritional energy values from kilojoules (kJ) to kilocalories (kcal) and vice versa.",
  disclaimer: "This calculator is for informational purposes only. Do not use this as a substitute for professional medical or nutritional advice.",
  category: "health",
  subcategory: "nutrition",
  keywords: ["kilojoules", "calories", "kcal", "kj", "nutrition", "energy"],
  inputs: [
    {
      name: "amount",
      label: "Energy Amount",
      kind: "number",
      defaultValue: 1000
    },
    {
      name: "direction",
      label: "Conversion Direction",
      kind: "select",
      defaultValue: "kj-to-kcal",
      options: [
        { label: "kJ to kcal", value: "kj-to-kcal" },
        { label: "kcal to kJ", value: "kcal-to-kj" }
      ]
    }
  ],
  compute: computeNutritionEnergy,
  formula: {
    heading: "Energy Conversion",
    expression: "1 kcal = 4.184 kJ",
    body: "To convert kilojoules to kilocalories, divide the kilojoules by 4.184. To convert kilocalories to kilojoules, multiply by 4.184.",
    variables: [
      { symbol: "kJ", meaning: "Energy in kilojoules" },
      { symbol: "kcal", meaning: "Energy in kilocalories" }
    ]
  },
  explanation: [
    "Nutritional energy is commonly measured in either kilocalories (often just called 'calories' on food labels) or kilojoules.",
    "While the US generally uses kilocalories, many other countries use kilojoules."
  ],
  examples: [
    {
      title: "Converting kJ to kcal",
      scenario: "Converting 4184 kJ to kcal.",
      result: "4184 kJ / 4.184 = 1000 kcal."
    }
  ],
  faq: [
    {
      q: "Is a Calorie the same as a kilocalorie?",
      a: "Yes, when discussing food, a Calorie (with a capital C) is technically a kilocalorie (kcal)."
    }
  ],
  related: []
};
