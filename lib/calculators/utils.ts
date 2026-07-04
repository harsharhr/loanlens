/**
 * Shared financial math. Every formula module composes these helpers so the
 * core money math lives in exactly one, well-tested place. No magic numbers:
 * compounding frequencies and the like are named constants.
 */

/** Compounding / contribution frequencies expressed as periods per year. */
export const FREQUENCY = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  weekly: 52,
  daily: 365,
} as const;

export type FrequencyKey = keyof typeof FREQUENCY;

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/** Convert an annual nominal rate in *percent* to a per-period decimal rate. */
export function periodicRate(annualRatePct: number, periodsPerYear: number): number {
  return annualRatePct / 100 / periodsPerYear;
}

/**
 * Future value of a single lump sum with periodic compounding.
 * FV = P (1 + r/n)^(n·t)
 */
export function futureValueLump(
  principal: number,
  annualRatePct: number,
  years: number,
  periodsPerYear: number,
): number {
  const r = periodicRate(annualRatePct, periodsPerYear);
  return principal * Math.pow(1 + r, periodsPerYear * years);
}

/**
 * Future value of a series of level contributions (an ordinary annuity, i.e.
 * deposits made at period end). FV = C · [((1 + r)^m − 1) / r]
 */
export function futureValueSeries(
  contribution: number,
  annualRatePct: number,
  years: number,
  periodsPerYear: number,
  contributionsPerYear = periodsPerYear,
): number {
  if (contribution === 0) return 0;
  const m = contributionsPerYear * years;
  const r = periodicRate(annualRatePct, contributionsPerYear);
  if (r === 0) return contribution * m;
  return contribution * ((Math.pow(1 + r, m) - 1) / r);
}

/**
 * Level payment for an amortising loan (EMI).
 * EMI = P · r · (1 + r)^n / ((1 + r)^n − 1)
 */
export function levelPayment(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  const r = periodicRate(annualRatePct, FREQUENCY.monthly);
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * r * pow) / (pow - 1);
}

export interface AmortRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Generate a full monthly amortisation schedule. Handles a final-period
 * rounding tail so the closing balance lands exactly on zero.
 */
export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  months: number,
  extraMonthly = 0,
): AmortRow[] {
  const r = periodicRate(annualRatePct, FREQUENCY.monthly);
  const basePayment = levelPayment(principal, annualRatePct, months);
  const rows: AmortRow[] = [];
  let balance = principal;

  for (let period = 1; period <= months * 2 && balance > 0.005; period++) {
    const interest = balance * r;
    let principalPaid = basePayment + extraMonthly - interest;
    if (principalPaid > balance) principalPaid = balance; // final tail
    const payment = interest + principalPaid;
    balance -= principalPaid;
    rows.push({
      period,
      payment,
      principal: principalPaid,
      interest,
      balance: Math.max(balance, 0),
    });
    if (balance <= 0.005) break;
  }
  return rows;
}

/**
 * Compound annual growth rate as a *percent*.
 * CAGR = (end / begin)^(1/years) − 1
 */
export function cagr(beginValue: number, endValue: number, years: number): number {
  if (beginValue <= 0 || years <= 0) return NaN;
  return (Math.pow(endValue / beginValue, 1 / years) - 1) * 100;
}

/**
 * Annual Percentage Yield (effective annual rate) from a nominal rate.
 * APY = (1 + r/n)^n − 1
 */
export function apy(nominalRatePct: number, periodsPerYear: number): number {
  const r = periodicRate(nominalRatePct, periodsPerYear);
  return (Math.pow(1 + r, periodsPerYear) - 1) * 100;
}

/** Inflation-adjust a future nominal amount back to today's purchasing power. */
export function realValue(nominal: number, inflationPct: number, years: number): number {
  return nominal / Math.pow(1 + inflationPct / 100, years);
}

/** Solve months needed to reach a target FV given a periodic contribution. */
export function periodsToTarget(
  target: number,
  contribution: number,
  annualRatePct: number,
  periodsPerYear: number,
): number {
  const r = periodicRate(annualRatePct, periodsPerYear);
  if (contribution <= 0) return Infinity;
  if (r === 0) return target / contribution;
  // Derived from FV annuity formula solved for m.
  const m = Math.log((target * r) / contribution + 1) / Math.log(1 + r);
  return m;
}

/** Sample a per-year growth curve for charts without storing every month. */
export function yearlyPoints<T>(years: number, fn: (year: number) => T): T[] {
  const pts: T[] = [];
  const maxPoints = 40;
  const stride = years > maxPoints ? Math.ceil(years / maxPoints) : 1;
  for (let y = 0; y <= years; y += stride) pts.push(fn(y));
  if ((pts.length - 1) * stride !== years) pts.push(fn(years));
  return pts;
}
