import type { ComputeContext, CalculatorOutput } from "../types";

export function computeNutritionEnergy(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const amount = Number(values.amount) || 0;
  const direction = values.direction || "kj-to-kcal"; // kj-to-kcal or kcal-to-kj

  let kj = 0;
  let kcal = 0;

  if (direction === "kj-to-kcal") {
    kj = amount;
    kcal = kj / 4.184;
  } else {
    kcal = amount;
    kj = kcal * 4.184;
  }

  return {
    metrics: [
      { label: direction === "kj-to-kcal" ? "Calories (kcal)" : "Kilojoules (kJ)", value: amount > 0 ? (direction === "kj-to-kcal" ? kcal : kj).toFixed(2) : "—", format: "text", primary: true }
    ],
    interpretation: amount > 0 
      ? `${amount} ${direction === "kj-to-kcal" ? "kJ" : "kcal"} is approximately ${(direction === "kj-to-kcal" ? kcal : kj).toFixed(2)} ${direction === "kj-to-kcal" ? "kcal" : "kJ"}. Note that food labels often use the term "Calories" to refer to kilocalories (kcal).`
      : "Please enter an amount to convert."
  };
}
