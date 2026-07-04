/**
 * Core type system for the Usemecalculator engine.
 *
 * A calculator is a *data module*: it declares its inputs, a pure `compute()`
 * function, and its supporting content (formula, examples, FAQ, related links).
 * The UI, routing, search, and SEO are all driven off these objects — adding a
 * calculator means adding one config, not new page code. See EXTENDING.md.
 */

export type CalculatorCategory =
  | "investing"
  | "loans"
  | "savings"
  | "retirement"
  | "personal-finance"
  | "tax"
  | "featured-units"
  | "health";

/** How a raw numeric result should be rendered. */
export type ValueFormat = "currency" | "percent" | "number" | "years" | "months" | "unit" | "text" | "duration";

/** Kinds of form inputs the shared renderer knows how to draw. */
export type InputKind = "currency" | "percent" | "number" | "unit" | "date" | "select";

export interface SelectOption {
  label: string;
  value: number | string;
}

export interface InputField {
  /** key used in the values record and URL query string */
  name: string;
  label: string;
  kind: InputKind;
  /** realistic starting value */
  defaultValue: number | string;
  min?: number;
  max?: number;
  step?: number;
  /** short helper text under the field */
  hint?: string;
  /** render an accompanying range slider */
  slider?: boolean;
  /** render as a segmented control / dropdown of fixed options instead of a free input */
  options?: SelectOption[];
  /** display prefix (e.g. "₹") — falls back to the active currency symbol for currency kind */
  prefix?: string;
  suffix?: string;
}

export interface ResultMetric {
  label: string;
  value: number | string;
  format: ValueFormat;
  /** optional sub-caption under the value */
  note?: string;
  /** highlight as the single headline result */
  primary?: boolean;
  /** tone for subtle colour coding */
  tone?: "brand" | "neutral" | "success" | "warning";
}

export interface ChartSeries {
  key: string;
  label: string;
  /** css var name from the chart palette, e.g. "--chart-1" */
  color: string;
}

export interface ChartSpec {
  type: "area" | "bar" | "line" | "donut";
  title: string;
  /** row-oriented data; each row has an `x` label plus one field per series key */
  data: Array<Record<string, number | string>>;
  xKey: string;
  series: ChartSeries[];
  /** format used for axis + tooltip values */
  valueFormat: ValueFormat;
}

export interface TableColumn {
  key: string;
  label: string;
  format: ValueFormat;
}

export interface TableSpec {
  title: string;
  columns: TableColumn[];
  rows: Array<Record<string, number>>;
  /** collapse to N rows with a "show all" toggle when long */
  previewRows?: number;
}

/** The result object every compute() returns. */
export interface CalculatorOutput {
  metrics: ResultMetric[];
  /** one-paragraph plain-English reading of the result */
  interpretation: string;
  chart?: ChartSpec;
  table?: TableSpec;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  result: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CalculatorConfig {
  id: string;
  slug: string;
  title: string;
  /** one-line purpose, shown  /** e.g. "Calculate your loan EMI" */
  tagline: string;
  /** e.g. "Use this tool to plan your loan..." */
  intro: string;
  /** Medical or financial disclaimer for this calculator */
  disclaimer?: string;
  /** High-level grouping, e.g. "loans" */
  category: CalculatorCategory;
  subcategory?: string;
  /** extra search keywords beyond the title */
  keywords: string[];
  /** show in "featured"/"popular" rails */
  featured?: boolean;

  inputs: InputField[];
  /** pure function: values -> results. No side effects, no I/O. */
  compute: (values: Record<string, any>, ctx: ComputeContext) => CalculatorOutput;

  /** plain-English formula explanation (supports \n paragraphs) */
  formula: {
    heading: string;
    expression: string;
    body: string;
    variables: Array<{ symbol: string; meaning: string }>;
  };
  /** "how this is calculated" long-form (array of paragraphs) */
  explanation: string[];
  examples: WorkedExample[];
  faq: FaqItem[];
  /** slugs of related calculators */
  related: string[];
  /** short disclaimer specific to this tool (falls back to a global one) */

  /** Trust Layer: Author or reviewer of the calculator logic/content */
  author?: {
    name: string;
    role: string;
    url?: string;
  };
  /** Trust Layer: Last verification date (ISO string e.g. YYYY-MM-DD) */
  lastUpdated?: string;
  /** Trust Layer: How we verify or compute this (for YMYL SEO) */
  methodology?: string;
}

export interface ComputeContext {
  /** active currency symbol for formatting, e.g. "₹" or "$" */
  currency: string;
  locale: string;
}

export interface CategoryMeta {
  id: CalculatorCategory;
  label: string;
  description: string;
}
