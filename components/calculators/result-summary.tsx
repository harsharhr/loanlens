"use client";

import type { ResultMetric } from "@/lib/calculators/types";
import { formatValue } from "@/lib/calculators/formatters";

interface Props {
  metrics: ResultMetric[];
  interpretation: string;
  currencySymbol: string;
  locale: string;
}

const toneColor: Record<NonNullable<ResultMetric["tone"]>, string> = {
  brand: "var(--brand)",
  neutral: "var(--text-primary)",
  success: "var(--success)",
  warning: "var(--warning)",
};

export function ResultSummary({ metrics, interpretation, currencySymbol, locale }: Props) {
  const primary = metrics.find((m) => m.primary) ?? metrics[0];
  const secondary = metrics.filter((m) => m !== primary);

  return (
    <div className="flex flex-col gap-4">
      {/* Headline result */}
      <div className="rounded-lg bg-brand-tint border border-line px-5 py-5">
        <p className="text-xs font-bold uppercase tracking-wide text-brand mb-1">{primary.label}</p>
        <p className="num text-4xl md:text-[2.75rem] font-bold leading-none text-ink" aria-live="polite">
          {formatValue(primary.value, primary.format, currencySymbol, locale)}
        </p>
        {primary.note && <p className="text-sm text-muted mt-1.5">{primary.note}</p>}
      </div>

      {/* Secondary metrics grid */}
      <div className="flex flex-wrap gap-2.5">
        {secondary.map((m) => (
          <div key={m.label} className="flex-1 min-w-[120px] rounded-lg border border-line bg-surface px-3 py-3 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted leading-tight">{m.label}</p>
            <p
              className="num text-[17px] md:text-lg font-bold mt-1 leading-tight"
              style={{ color: toneColor[m.tone ?? "neutral"] }}
            >
              {formatValue(m.value, m.format, currencySymbol, locale)}
            </p>
            {m.note && <p className="text-[10.5px] text-muted mt-0.5 leading-tight">{m.note}</p>}
          </div>
        ))}
      </div>

      {/* Plain-English interpretation */}
      <p className="text-sm text-ink-secondary leading-relaxed border-l-2 border-brand pl-3.5">{interpretation}</p>
    </div>
  );
}
