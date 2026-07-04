import type { ComputeContext, CalculatorOutput } from "../types";

function getStrideLengthMeters(heightCm: number, isMale: boolean): number {
  return (heightCm * (isMale ? 0.415 : 0.413)) / 100;
}

export function computeStepsToMiles(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const steps = Number(values.steps) || 0;
  const heightCm = Number(values.height) || 170;
  const isMale = values.sex === "male" || values.sex === 0;

  const strideMeters = getStrideLengthMeters(heightCm, isMale);
  const totalMeters = steps * strideMeters;
  const miles = totalMeters / 1609.34;

  return {
    metrics: [
      { label: "Distance (Miles)", value: steps > 0 ? miles.toFixed(2) : "—", format: "text", primary: true }
    ],
    interpretation: steps > 0 
      ? `Based on an estimated stride length of ${strideMeters.toFixed(2)}m for your height, ${steps.toLocaleString(ctx.locale)} steps equals approximately ${miles.toFixed(2)} miles.`
      : "Please enter the number of steps."
  };
}

export function computeStepsToKm(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const steps = Number(values.steps) || 0;
  const heightCm = Number(values.height) || 170;
  const isMale = values.sex === "male" || values.sex === 0;

  const strideMeters = getStrideLengthMeters(heightCm, isMale);
  const totalMeters = steps * strideMeters;
  const km = totalMeters / 1000;

  return {
    metrics: [
      { label: "Distance (Km)", value: steps > 0 ? km.toFixed(2) : "—", format: "text", primary: true }
    ],
    interpretation: steps > 0 
      ? `Based on an estimated stride length of ${strideMeters.toFixed(2)}m for your height, ${steps.toLocaleString(ctx.locale)} steps equals approximately ${km.toFixed(2)} kilometers.`
      : "Please enter the number of steps."
  };
}

export function computeMilesToSteps(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const miles = Number(values.miles) || 0;
  const heightCm = Number(values.height) || 170;
  const isMale = values.sex === "male" || values.sex === 0;

  const strideMeters = getStrideLengthMeters(heightCm, isMale);
  const totalMeters = miles * 1609.34;
  const steps = strideMeters > 0 ? Math.round(totalMeters / strideMeters) : 0;

  return {
    metrics: [
      { label: "Estimated Steps", value: miles > 0 ? steps.toLocaleString(ctx.locale) : "—", format: "text", primary: true }
    ],
    interpretation: miles > 0 
      ? `To walk ${miles} miles, you will need to take approximately ${steps.toLocaleString(ctx.locale)} steps, based on your estimated stride length.`
      : "Please enter the distance in miles."
  };
}

export function computeStepsInAMile(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const heightCm = Number(values.height) || 170;
  const isMale = values.sex === "male" || values.sex === 0;

  const strideMeters = getStrideLengthMeters(heightCm, isMale);
  const steps = strideMeters > 0 ? Math.round(1609.34 / strideMeters) : 0;

  return {
    metrics: [
      { label: "Steps in a Mile", value: heightCm > 0 ? steps.toLocaleString(ctx.locale) : "—", format: "text", primary: true }
    ],
    interpretation: heightCm > 0 
      ? `There are approximately ${steps.toLocaleString(ctx.locale)} steps in a mile for a person of your height, assuming a normal walking pace.`
      : "Please enter your height."
  };
}

export function computePaceTime(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  // Relaxed: 3 mph, Moderate: 3.5 mph, Brisk: 4 mph, Fast: 5 mph
  const distanceMiles = 1; 
  const speedMph = Number(values.pace) || 3.5; 
  const hours = distanceMiles / speedMph;
  const minutes = Math.round(hours * 60);

  return {
    metrics: [
      { label: "Estimated Time", value: minutes > 0 ? `${minutes} mins` : "—", format: "text", primary: true }
    ],
    interpretation: speedMph > 0 
      ? `At a pace of ${speedMph} mph, it will take you about ${minutes} minutes to walk one mile.`
      : "Please select a pace."
  };
}

export function computeStepsToCalories(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const steps = Number(values.steps) || 0;
  const weightKg = Number(values.weight) || 70;
  
  // Rule of thumb: ~0.04 calories per step per kg. Wait, it's roughly 0.04 calories per step overall? 
  // Let's use: Calories = steps * (weightKg * 0.0005) for average walking.
  const calories = steps * (weightKg * 0.0005);

  return {
    metrics: [
      { label: "Calories Burned", value: steps > 0 ? Math.round(calories) : "—", format: "text", primary: true }
    ],
    interpretation: steps > 0 
      ? `Walking ${steps.toLocaleString(ctx.locale)} steps burns approximately ${Math.round(calories)} calories for someone weighing ${weightKg} kg. This is an estimate based on average walking pace.`
      : "Please enter the number of steps and your weight."
  };
}
