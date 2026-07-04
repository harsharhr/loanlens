import type { ComputeContext, CalculatorOutput } from "../types";

export function computeBmi(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const isImperial = values.unitSystem === "imperial" || values.unitSystem === 1; // if 0 metric, 1 imperial
  
  let bmi = 0;
  if (isImperial) {
    const weightLbs = Number(values.weight) || 0;
    const heightInches = Number(values.height) || 0;
    if (heightInches > 0) {
      bmi = 703 * (weightLbs / (heightInches * heightInches));
    }
  } else {
    const weightKg = Number(values.weight) || 0;
    const heightCm = Number(values.height) || 0;
    const heightM = heightCm / 100;
    if (heightM > 0) {
      bmi = weightKg / (heightM * heightM);
    }
  }

  let category = "";
  let tone: "brand" | "neutral" | "success" | "warning" = "neutral";
  
  if (bmi === 0 || isNaN(bmi)) {
    category = "Invalid Inputs";
  } else if (bmi < 18.5) {
    category = "Underweight";
    tone = "warning";
  } else if (bmi < 25) {
    category = "Normal weight";
    tone = "success";
  } else if (bmi < 30) {
    category = "Overweight";
    tone = "warning";
  } else if (bmi < 35) {
    category = "Class I Obesity";
    tone = "warning";
  } else if (bmi < 40) {
    category = "Class II Obesity";
    tone = "warning";
  } else {
    category = "Class III Obesity";
    tone = "warning";
  }

  return {
    metrics: [
      { label: "Your BMI", value: bmi > 0 ? bmi.toFixed(1) : "—", format: "text", primary: true },
      { label: "Category", value: category, format: "text", tone }
    ],
    interpretation: bmi > 0 
      ? `A BMI of ${bmi.toFixed(1)} is considered ${category}. BMI is a screening metric, not a diagnosis, and may be less representative for muscular bodies or certain populations. Consult a healthcare professional for clinical advice.`
      : "Please enter your height and weight to calculate your BMI."
  };
}

export function computeWhr(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const waist = Number(values.waist) || 0;
  const hips = Number(values.hips) || 0;
  const isMale = values.sex === "male" || values.sex === 0; // if 0 male, 1 female

  let whr = 0;
  if (hips > 0) {
    whr = waist / hips;
  }

  let risk = "";
  let tone: "brand" | "neutral" | "success" | "warning" = "neutral";
  
  if (whr === 0 || isNaN(whr)) {
    risk = "Invalid Inputs";
  } else {
    if (isMale) {
      if (whr <= 0.9) { risk = "Lower Risk"; tone = "success"; }
      else if (whr <= 0.99) { risk = "Moderate Risk"; tone = "warning"; }
      else { risk = "High Risk"; tone = "warning"; }
    } else {
      if (whr <= 0.85) { risk = "Lower Risk"; tone = "success"; }
      else if (whr <= 0.89) { risk = "Moderate Risk"; tone = "warning"; }
      else { risk = "High Risk"; tone = "warning"; }
    }
  }

  return {
    metrics: [
      { label: "Waist-to-Hip Ratio", value: whr > 0 ? whr.toFixed(2) : "—", format: "text", primary: true },
      { label: "Risk Category", value: risk, format: "text", tone }
    ],
    interpretation: whr > 0 
      ? `Your WHR is ${whr.toFixed(2)}, which indicates a ${risk.toLowerCase()} for metabolic complications. WHO suggests targets below 0.85 for women and below 0.90 for men. Note that thresholds vary by source.`
      : "Please enter your waist and hip measurements."
  };
}
