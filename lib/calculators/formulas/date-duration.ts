import type { ComputeContext, CalculatorOutput } from "../types";

export function computeSobriety(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const startDateStr = values.startDate; // YYYY-MM-DD
  
  if (!startDateStr) {
    return {
      metrics: [
        { label: "Total Days", value: "—", format: "text", primary: true },
      ],
      interpretation: "Please enter your sobriety start date."
    };
  }

  const startDate = new Date(startDateStr);
  if (isNaN(startDate.getTime())) {
    return {
      metrics: [
        { label: "Total Days", value: "Invalid Date", format: "text", primary: true, tone: "warning" }
      ],
      interpretation: "The date provided is invalid."
    };
  }

  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  
  if (diffTime < 0) {
    return {
      metrics: [
        { label: "Total Days", value: "Future Date", format: "text", primary: true, tone: "warning" }
      ],
      interpretation: "Your start date cannot be in the future."
    };
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  
  // Approximate months and years
  const diffMonths = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
  const diffYears = today.getFullYear() - startDate.getFullYear();

  return {
    metrics: [
      { label: "Total Days", value: diffDays.toLocaleString(ctx.locale), format: "text", primary: true, tone: "success" },
      { label: "Total Weeks", value: diffWeeks.toLocaleString(ctx.locale), format: "text" },
      { label: "Total Months (approx)", value: diffMonths.toLocaleString(ctx.locale), format: "text" },
      { label: "Total Years (approx)", value: diffYears.toLocaleString(ctx.locale), format: "text" }
    ],
    interpretation: `Congratulations! You have been sober for ${diffDays.toLocaleString(ctx.locale)} days.`
  };
}
