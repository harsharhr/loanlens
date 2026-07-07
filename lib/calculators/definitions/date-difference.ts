import type { CalculatorConfig } from "../types";

export const dateDifference: CalculatorConfig = {
  id: "date-difference",
  slug: "date-difference",
  title: "Date Difference Calculator",
  tagline: "Count the exact days, weeks, months and years between two dates.",
  intro:
    "How many days until the wedding, between two contract dates, or since you joined your job? Enter any two dates to get the exact gap — as total days, weeks, working weeks, and a calendar-correct years-months-days breakdown.",
  category: "everyday",
  subcategory: "dates",
  featured: false,
  keywords: ["date difference calculator", "days between dates", "date duration", "how many days until", "days calculator", "date to date"],
  lastUpdated: "2026-07-07",
  inputs: [
    { name: "start", label: "Start date", kind: "date", defaultValue: "2026-01-01" },
    { name: "end", label: "End date", kind: "date", defaultValue: "2026-12-31" },
  ],
  compute: (v, ctx) => {
    let start = new Date(v.start);
    let end = new Date(v.end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return {
        metrics: [{ label: "Difference", value: "—", format: "text", primary: true }],
        interpretation: "Enter two valid dates to see the gap between them.",
      };
    }
    // Order-agnostic: swap if reversed so the answer is always positive.
    const swapped = end.getTime() < start.getTime();
    if (swapped) [start, end] = [end, start];

    const totalDays = Math.round((end.getTime() - start.getTime()) / 86400000);
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;

    // calendar breakdown
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const fmt = new Intl.DateTimeFormat(ctx.locale, { dateStyle: "long" });
    const breakdown = [
      years > 0 ? `${years} year${years === 1 ? "" : "s"}` : "",
      months > 0 ? `${months} month${months === 1 ? "" : "s"}` : "",
      `${days} day${days === 1 ? "" : "s"}`,
    ].filter(Boolean).join(", ");

    return {
      metrics: [
        { label: "Total days", value: totalDays.toLocaleString(ctx.locale), format: "text", primary: true, tone: "brand" },
        { label: "Calendar gap", value: breakdown, format: "text", tone: "neutral" },
        { label: "In weeks", value: `${weeks.toLocaleString(ctx.locale)} wk ${remDays} d`, format: "text", tone: "neutral" },
        { label: "In hours", value: (totalDays * 24).toLocaleString(ctx.locale), format: "text", tone: "neutral" },
      ],
      interpretation: `From ${fmt.format(start)} to ${fmt.format(end)} is ${totalDays.toLocaleString(ctx.locale)} days — that's ${breakdown}${swapped ? " (dates were reversed, so we swapped them)" : ""}. The end date itself is not counted; add 1 if you need an inclusive count.`,
    };
  },
  formula: {
    heading: "How the gap is measured",
    expression: "Days = (End − Start) / 86,400,000 ms",
    body: "Total days is the exact number of midnights between the two dates. The years-months-days breakdown subtracts calendar columns with borrowing, so uneven month lengths and leap years are handled correctly.",
    variables: [
      { symbol: "Total days", meaning: "exact day count, end date excluded" },
      { symbol: "Calendar gap", meaning: "completed years, months and days between the dates" },
    ],
  },
  explanation: [
    "There are two honest ways to state a date gap: an exact day count (precise, great for deadlines and interest calculations) and a calendar breakdown (natural for ages and anniversaries). This tool gives both, and they can legitimately look different because months vary from 28 to 31 days.",
    "By convention the end date is excluded — Monday to Friday is 4 days, not 5. Legal notice periods, visa windows and interest-day counts each have their own inclusive/exclusive rule, so check which one your document uses and add 1 if needed.",
    "Leap years are counted automatically: any window containing 29 February simply contains one more day. Over long spans this matters — a decade holds 2 or 3 leap days.",
  ],
  examples: [
    { title: "Full year", scenario: "1 January 2026 to 31 December 2026.", result: "364 days (the end date is excluded; inclusive count is 365)." },
    { title: "Notice period", scenario: "Resignation on 15 March, 90-day notice.", result: "Set start = 15 March and check when total days hits 90 — 13 June." },
    { title: "Tenure at a job", scenario: "Joined 1 August 2022, as of 7 July 2026.", result: "3 years, 11 months, 6 days — 1,436 total days." },
  ],
  faq: [
    { q: "Is the end date included in the count?", a: "No — the tool counts complete days between the dates, like counting midnights. If your use case is inclusive (e.g. hotel nights vs billing days), add 1." },
    { q: "Why does the months figure look 'off' by a day or two?", a: "Months have different lengths, so a calendar breakdown depends on which months the span crosses. The total-days figure is always exact." },
    { q: "Does it handle leap years?", a: "Yes. The count uses real calendar dates, so 29 February is included whenever the span crosses it." },
    { q: "Can I count working days?", a: "This tool shows total days and whole weeks (each week = 5 working days). Exact business-day counts also need your holiday calendar, which varies by state and employer." },
    { q: "What if I enter the dates in the wrong order?", a: "The calculator swaps them automatically and tells you, so the answer is always a positive gap." },
  ],
  related: ["age-calculator", "percentage-calculator", "fd", "loan"],
};
