import type { CalculatorConfig } from "../types";
import { computeBmr } from "../formulas/metabolism";

export const bmrCalculator: CalculatorConfig = {
  id: "bmr-calculator",
  slug: "bmr-calculator",
  title: "BMR & TDEE Calculator",
  tagline: "Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure",
  intro: "This tool calculates your Basal Metabolic Rate (BMR) and estimates the total number of calories you burn per day (TDEE) based on your activity level.",
  disclaimer: "This calculator is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
  category: "health",
  subcategory: "metabolism",
  keywords: ["bmr", "tdee", "basal metabolic rate", "calories", "metabolism", "energy expenditure"],
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
      name: "sex",
      label: "Sex",
      kind: "select",
      defaultValue: 0,
      options: [
        { label: "Male", value: 0 },
        { label: "Female", value: 1 },
      ],
    },
    {
      name: "age",
      label: "Age",
      kind: "number",
      defaultValue: 30,
      min: 1,
      max: 120,
      step: 1,
      hint: "Your age in years.",
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
    {
      name: "activity",
      label: "Activity Level",
      kind: "select",
      defaultValue: 1.2,
      options: [
        { label: "Sedentary (little or no exercise)", value: 1.2 },
        { label: "Lightly active (light exercise/sports 1-3 days/week)", value: 1.375 },
        { label: "Moderately active (moderate exercise/sports 3-5 days/week)", value: 1.55 },
        { label: "Very active (hard exercise/sports 6-7 days a week)", value: 1.725 },
        { label: "Super active (very hard exercise, physical job or training twice a day)", value: 1.9 },
      ],
    },
  ],
  compute: computeBmr,
  formula: {
    heading: "How is BMR calculated?",
    expression: "BMR (Mifflin-St Jeor) = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + s",
    body: "This calculator uses the Mifflin-St Jeor equation, which is widely considered the most accurate standard formula for estimating BMR. The variable 's' is +5 for males and -161 for females. To calculate Total Daily Energy Expenditure (TDEE), the BMR is multiplied by an activity factor.",
    variables: [
      { symbol: "Weight", meaning: "Your body weight in kilograms" },
      { symbol: "Height", meaning: "Your body height in centimeters" },
      { symbol: "Age", meaning: "Your age in years" },
      { symbol: "s", meaning: "+5 for males, -161 for females" },
    ],
  },
  explanation: [
    "Your Basal Metabolic Rate (BMR) represents the number of calories your body burns at rest. This energy goes toward basic life-sustaining functions such as breathing, circulation, nutrient processing, and cell production.",
    "Your Total Daily Energy Expenditure (TDEE) is an estimate of how many calories you burn per day when exercise is taken into account. It is calculated by multiplying your BMR by an activity multiplier."
  ],
  examples: [
    {
      title: "Lightly Active Male",
      scenario: "A 30-year-old male, 175 cm tall, weighing 70 kg, who engages in light exercise.",
      result: "BMR is approximately 1,665 kcal/day. His TDEE (multiplier 1.375) would be around 2,290 kcal/day.",
    },
    {
      title: "Sedentary Female",
      scenario: "A 25-year-old female, 160 cm tall, weighing 60 kg, who is mostly sedentary.",
      result: "BMR is approximately 1,314 kcal/day. Her TDEE (multiplier 1.2) would be around 1,577 kcal/day.",
    }
  ],
  faq: [
    {
      q: "What is the difference between BMR and TDEE?",
      a: "BMR is the baseline number of calories your body needs at absolute rest. TDEE includes BMR plus the calories burned through daily activities and exercise.",
    },
    {
      q: "Is the Mifflin-St Jeor equation accurate for everyone?",
      a: "While it is considered the most accurate population-level equation, it doesn't account for body composition. People with more muscle mass will burn more calories, and those with more body fat will burn fewer than the formula predicts.",
    }
  ],
  related: ["bmi-calculator", "whr-calculator"],
};
