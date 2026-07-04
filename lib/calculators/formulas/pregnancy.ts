import type { ComputeContext, CalculatorOutput } from "../types";

export function computePregnancy(values: Record<string, any>, ctx: ComputeContext): CalculatorOutput {
  const lmpStr = values.lmp; // Expecting YYYY-MM-DD
  
  if (!lmpStr) {
    return {
      metrics: [
        { label: "Estimated Due Date", value: "—", format: "text", primary: true },
        { label: "Current Week", value: "—", format: "text" }
      ],
      interpretation: "Please enter the first day of your last menstrual period (LMP)."
    };
  }

  const lmpDate = new Date(lmpStr);
  if (isNaN(lmpDate.getTime())) {
    return {
      metrics: [
        { label: "Estimated Due Date", value: "Invalid Date", format: "text", primary: true, tone: "warning" }
      ],
      interpretation: "The date provided is invalid."
    };
  }

  // EDD is LMP + 280 days
  const eddDate = new Date(lmpDate);
  eddDate.setDate(eddDate.getDate() + 280);

  // Gestational age calculation
  const today = new Date();
  const diffTime = Math.max(0, today.getTime() - lmpDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;

  // Format dates
  const formatter = new Intl.DateTimeFormat(ctx.locale, { dateStyle: 'long' });
  
  let currentStatus = `${weeks} weeks, ${days} days`;
  if (diffDays > 280) {
    currentStatus = "Past due date";
  } else if (diffDays === 0) {
    currentStatus = "0 weeks (Just starting)";
  }

  return {
    metrics: [
      { label: "Estimated Due Date", value: formatter.format(eddDate), format: "text", primary: true, tone: "brand" },
      { label: "Gestational Age", value: currentStatus, format: "text" },
      { label: "Conception Date (Est)", value: formatter.format(new Date(lmpDate.getTime() + 14 * 24 * 60 * 60 * 1000)), format: "text" }
    ],
    interpretation: `Based on your LMP, your estimated due date is ${formatter.format(eddDate)}. You are currently at ${currentStatus}. This is a guide only and not a substitute for clinical advice from your healthcare provider.`
  };
}
