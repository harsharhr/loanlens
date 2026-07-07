import type { CalculatorConfig } from "../types";

/** Exact calendar difference between two dates as years/months/days. */
function calendarDiff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    // days in the month before `to`
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export const ageCalculator: CalculatorConfig = {
  id: "age-calculator",
  slug: "age-calculator",
  title: "Age Calculator",
  tagline: "Find your exact age in years, months and days from your date of birth.",
  intro:
    "Enter your date of birth to get your precise age — in years, months and days, plus your total days lived and the countdown to your next birthday. Useful for exam eligibility, official forms, and settling birthday maths once and for all.",
  category: "everyday",
  subcategory: "dates",
  featured: false,
  keywords: ["age calculator", "calculate age from date of birth", "dob calculator", "how old am i", "age in days", "exam age eligibility"],
  lastUpdated: "2026-07-07",
  inputs: [
    { name: "dob", label: "Date of birth", kind: "date", defaultValue: "1995-06-15" },
    { name: "asOf", label: "Age as on date", kind: "date", defaultValue: "", optional: true, hint: "Leave blank for today. Set an exam cut-off date to check eligibility." },
  ],
  compute: (v, ctx) => {
    const dob = new Date(v.dob);
    const asOf = v.asOf ? new Date(v.asOf) : new Date();
    if (Number.isNaN(dob.getTime())) {
      return {
        metrics: [{ label: "Age", value: "—", format: "text", primary: true }],
        interpretation: "Enter a valid date of birth to calculate your age.",
      };
    }
    if (asOf.getTime() < dob.getTime()) {
      return {
        metrics: [{ label: "Age", value: "—", format: "text", primary: true, tone: "warning" }],
        interpretation: "The 'as on' date is before the date of birth — swap the dates and try again.",
      };
    }

    const { years, months, days } = calendarDiff(dob, asOf);
    const totalDays = Math.floor((asOf.getTime() - dob.getTime()) / 86400000);

    // Next birthday countdown (relative to asOf)
    let nextBirthday = new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday.getTime() <= asOf.getTime()) {
      nextBirthday = new Date(asOf.getFullYear() + 1, dob.getMonth(), dob.getDate());
    }
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - asOf.getTime()) / 86400000);

    const fmt = new Intl.DateTimeFormat(ctx.locale, { dateStyle: "long" });

    return {
      metrics: [
        { label: "Exact age", value: `${years} years, ${months} months, ${days} days`, format: "text", primary: true, tone: "brand" },
        { label: "Total days lived", value: totalDays.toLocaleString(ctx.locale), format: "text", tone: "neutral" },
        { label: "Total months", value: (years * 12 + months).toLocaleString(ctx.locale), format: "text", tone: "neutral" },
        { label: "Next birthday in", value: `${daysToBirthday} days`, format: "text", tone: "success" },
      ],
      interpretation: `As on ${fmt.format(asOf)}, you are exactly ${years} years, ${months} months and ${days} days old — ${totalDays.toLocaleString(ctx.locale)} days of life so far. Your next birthday is ${fmt.format(nextBirthday)}.`,
    };
  },
  formula: {
    heading: "How exact age is calculated",
    expression: "Age = (As-on date) − (Date of birth), carried across calendar months",
    body: "Subtracting dates naively in days doesn't respect calendar months of different lengths. This calculator subtracts year, month and day columns separately, borrowing from the next column when a value goes negative — the same way schools and government forms compute completed age.",
    variables: [
      { symbol: "Years", meaning: "completed calendar years" },
      { symbol: "Months", meaning: "completed months since the last birthday" },
      { symbol: "Days", meaning: "days since the last month-anniversary" },
    ],
  },
  explanation: [
    "Your 'completed age' — the figure asked for on official forms and exam applications — counts only fully elapsed years. You are 24 until the very day of your 25th birthday, even at 24 years and 364 days.",
    "For exam and job eligibility in India (UPSC, SSC, banking, state PSCs), age is always evaluated as on a specific cut-off date printed in the notification — not the application date. Set that cut-off in the 'age as on' field to check eligibility exactly the way the recruiting body will.",
    "Leap years are handled automatically by calendar arithmetic. If you were born on 29 February, your legal birthday in non-leap years is treated as 1 March in most jurisdictions.",
  ],
  examples: [
    { title: "Everyday use", scenario: "Born 15 June 1995, age today (7 July 2026).", result: "31 years, 0 months, 22 days — about 11,345 days lived." },
    { title: "Exam eligibility", scenario: "UPSC cut-off 1 August 2026, upper limit 32 years, born 15 June 1995.", result: "31 years, 1 month, 17 days on the cut-off — eligible." },
    { title: "Milestone check", scenario: "When do I turn 10,000 days old if born 1 Jan 2000?", result: "Around 19 May 2027 — total-days maths makes milestones like this easy." },
  ],
  faq: [
    { q: "How do I check exam age eligibility?", a: "Enter your date of birth, then set the 'age as on' field to the cut-off date given in the exam notification. The completed years shown is exactly what the recruiting body computes." },
    { q: "Why does my age in months look different from months × 12?", a: "The 'total months' figure counts completed calendar months, which vary in length — it's not simply total days divided by 30." },
    { q: "What about time of birth?", a: "Legal and administrative age uses calendar dates only. Time of birth never affects your official age." },
    { q: "How are leap-year birthdays handled?", a: "The maths uses real calendar dates, so 29 February birthdays resolve correctly. In non-leap years, most rules treat 1 March as the effective birthday." },
    { q: "Is my data stored?", a: "No. Like every calculator on this site, the computation runs entirely in your browser — your date of birth is never sent anywhere." },
  ],
  related: ["date-difference", "percentage-calculator", "retirement", "epf"],
};
