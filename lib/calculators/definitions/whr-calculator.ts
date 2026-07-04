import type { CalculatorConfig } from "../types";
import { computeWhr } from "../formulas/anthropometrics";

export const whrCalculator: CalculatorConfig = {
  id: "whr-calculator",
  slug: "whr-calculator",
  title: "Waist-to-Hip Ratio Calculator",
  tagline: "Calculate your Waist-to-Hip Ratio (WHR)",
  intro: "The Waist-to-Hip Ratio (WHR) calculator measures the ratio of your waist circumference to your hip circumference. It is used as an indicator of body fat distribution and metabolic health.",
  disclaimer: "This calculator is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
  category: "health",
  subcategory: "body-composition",
  keywords: ["whr", "waist to hip ratio", "body fat", "obesity", "health"],
  inputs: [
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
      name: "waist",
      label: "Waist Circumference",
      kind: "number",
      defaultValue: 80,
      min: 0,
      step: 0.1,
      hint: "Measure around your natural waist (just above the navel). Use the same units for both waist and hips.",
    },
    {
      name: "hips",
      label: "Hip Circumference",
      kind: "number",
      defaultValue: 100,
      min: 0,
      step: 0.1,
      hint: "Measure around the widest part of your hips/buttocks.",
    },
  ],
  compute: computeWhr,
  formula: {
    heading: "How is WHR calculated?",
    expression: "WHR = Waist Circumference / Hip Circumference",
    body: "The Waist-to-Hip Ratio is calculated by simply dividing the waist circumference by the hip circumference. Both measurements should be taken in the same unit (e.g., cm or inches).",
    variables: [
      { symbol: "Waist", meaning: "Circumference of your natural waist" },
      { symbol: "Hips", meaning: "Circumference of the widest part of your hips" },
    ],
  },
  explanation: [
    "WHR is used as a measurement of obesity, which in turn is a possible indicator of other more serious health conditions. The World Health Organization (WHO) states that abdominal obesity is defined as a waist-hip ratio above 0.90 for males and above 0.85 for females.",
    "People who carry more weight around their waist (apple shape) face a higher risk of heart disease, type 2 diabetes, and premature death than those who carry more weight in their hips and thighs (pear shape)."
  ],
  examples: [
    {
      title: "Male Example",
      scenario: "A male with a 90 cm waist and 100 cm hips.",
      result: "WHR = 90 / 100 = 0.90, which is considered a moderate risk.",
    },
    {
      title: "Female Example",
      scenario: "A female with a 75 cm waist and 100 cm hips.",
      result: "WHR = 75 / 100 = 0.75, which is considered lower risk.",
    }
  ],
  faq: [
    {
      q: "Where should I measure my waist and hips?",
      a: "For the most accurate WHR, the waist should be measured at its narrowest point (usually just above the navel). The hips should be measured around the widest part of the buttocks.",
    },
    {
      q: "Is WHR better than BMI?",
      a: "WHR and BMI measure different things. BMI is a general measure of total body mass, while WHR specifically looks at fat distribution. Both provide useful but different insights into your metabolic health risks.",
    }
  ],
  related: ["bmi-calculator", "bmr-calculator"],
};
