import type { ComputeContext, CalculatorOutput } from "../types";

export function computeBmr(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const isImperial = values.unitSystem === "imperial" || values.unitSystem === 1;
  const isMale = values.sex === "male" || values.sex === 0;
  const age = Number(values.age) || 0;
  
  let weightKg = 0;
  let heightCm = 0;

  if (isImperial) {
    weightKg = (Number(values.weight) || 0) * 0.453592;
    heightCm = (Number(values.height) || 0) * 2.54;
  } else {
    weightKg = Number(values.weight) || 0;
    heightCm = Number(values.height) || 0;
  }

  let bmr = 0;
  if (weightKg > 0 && heightCm > 0 && age > 0) {
    // Mifflin-St Jeor
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (isMale ? 5 : -161);
  }

  const activityLevel = Number(values.activity) || 1.2;
  const tdee = bmr * activityLevel;

  return {
    metrics: [
      { label: "Basal Metabolic Rate (BMR)", value: bmr > 0 ? Math.round(bmr) : "—", format: "text", primary: true, note: "Calories/day" },
      { label: "Est. Daily Calories", value: tdee > 0 ? Math.round(tdee) : "—", format: "text", tone: "brand", note: "To maintain weight" }
    ],
    interpretation: bmr > 0 
      ? `Your BMR is estimated at ${Math.round(bmr)} calories per day. This is the energy your body needs to function at rest. Based on your activity level, you need approximately ${Math.round(tdee)} calories per day to maintain your current weight. Lean body mass and other factors affect these estimates.`
      : "Please enter your age, height, and weight to calculate your BMR."
  };
}
