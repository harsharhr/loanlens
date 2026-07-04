import type { CalculatorConfig } from "../types";
import { computeBmi } from "../formulas/anthropometrics";

export const bmiCalculator: CalculatorConfig = {
  id: "bmi-calculator",
  slug: "bmi-calculator",
  title: "BMI Calculator",
  tagline: "Calculate your Body Mass Index (BMI)",
  intro: "Use this tool to calculate your Body Mass Index (BMI) and determine your weight category. BMI is a simple measure using your height and weight to find out if your weight is healthy.",
  disclaimer: "This calculator is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
  category: "health",
  subcategory: "body-composition",
  keywords: ["bmi", "body mass index", "weight", "obesity", "health"],
  inputs: [
    {
      name: "unitSystem",
      label: "Unit System",
      kind: "select",
      defaultValue: 0,
      options: [
        { label: "Metric (kg, cm)", value: 0 },
        { label: "Imperial (lbs, inches)", value: 1 },
      ],
    },
    {
      name: "weight",
      label: "Weight",
      kind: "number",
      defaultValue: 70,
      min: 0,
      step: 0.1,
      hint: "Enter your weight in kg (metric) or lbs (imperial).",
    },
    {
      name: "height",
      label: "Height",
      kind: "number",
      defaultValue: 175,
      min: 0,
      step: 0.1,
      hint: "Enter your height in cm (metric) or inches (imperial).",
    },
  ],
  compute: computeBmi,
  formula: {
    heading: "How is BMI calculated?",
    expression: "BMI = Weight / (Height)^2",
    body: "The Body Mass Index (BMI) is calculated by dividing your weight (in kilograms) by your height squared (in meters). For imperial units, weight in pounds is divided by height in inches squared, and the result is multiplied by a conversion factor of 703.",
    variables: [
      { symbol: "Weight", meaning: "Your body weight" },
      { symbol: "Height", meaning: "Your body height" },
    ],
  },
  explanation: [
    "BMI is a useful screening tool to identify possible weight problems for adults. However, it is not a diagnostic tool. For example, a person may have a high BMI, but a healthcare provider would need to complete further assessments to determine if weight is a health risk.",
    "These assessments might include evaluating diet, physical activity, family history, and other health screenings. Note that BMI may not be accurate for athletes with high muscle mass, pregnant women, or elderly individuals."
  ],
  examples: [
    {
      title: "Metric Example",
      scenario: "A person weighing 70 kg with a height of 175 cm.",
      result: "BMI = 70 / (1.75)^2 = 22.9, which is in the Normal weight category.",
    },
    {
      title: "Imperial Example",
      scenario: "A person weighing 150 lbs with a height of 65 inches.",
      result: "BMI = 703 * (150 / 65^2) = 24.96, which is close to the overweight threshold.",
    }
  ],
  faq: [
    {
      q: "Is BMI an accurate measure of health?",
      a: "BMI is a general screening tool but has limitations. It doesn't distinguish between muscle and fat mass, nor does it account for fat distribution. Therefore, muscular athletes may have a high BMI without having high body fat.",
    },
    {
      q: "What is a healthy BMI?",
      a: "For most adults, an ideal BMI is in the 18.5 to 24.9 range. However, healthy ranges can vary depending on age and ethnicity.",
    }
  ],
  related: ["whr-calculator", "bmr-calculator"],
};
