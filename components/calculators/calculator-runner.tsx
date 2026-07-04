"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { RotateCcw, Share2, Check } from "lucide-react";
import { getCalculator } from "@/lib/calculators/registry";
import { defaultValues, validateInputs, hasErrors } from "@/lib/calculators/validators";
import { CURRENCIES, currencyMeta, type CurrencyCode } from "@/lib/calculators/formatters";
import { InputFieldControl } from "./input-field";
import { ResultSummary } from "./result-summary";
import { DataTable } from "./data-table";

// Charts are below the fold and pull in Recharts — load them lazily, client-only.
const ChartPanel = dynamic(() => import("./chart-panel"), {
  ssr: false,
  loading: () => (
    <div className="card card-pad">
      <div className="h-[292px] rounded-lg bg-brand-tint/50 animate-pulse" />
    </div>
  ),
});

export function CalculatorRunner({ slug }: { slug: string }) {
  const calc = getCalculator(slug);
  const [values, setValues] = useState<Record<string, number>>(() =>
    calc ? defaultValues(calc.inputs) : {},
  );
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [copied, setCopied] = useState(false);

  // Hydrate from URL query params so shared links reproduce a calculation.
  useEffect(() => {
    if (!calc) return;
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, number> = {};
    let found = false;
    for (const f of calc.inputs) {
      const raw = params.get(f.name);
      if (raw !== null && !Number.isNaN(Number(raw))) {
        next[f.name] = Number(raw);
        found = true;
      }
    }
    const cur = params.get("cur");
    if (cur && CURRENCIES.some((c) => c.code === cur)) setCurrency(cur as CurrencyCode);
    if (found) setValues((v) => ({ ...v, ...next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const errors = useMemo(() => (calc ? validateInputs(calc.inputs, values) : {}), [calc, values]);
  const meta = currencyMeta(currency);

  const output = useMemo(() => {
    if (!calc || hasErrors(errors)) return null;
    try {
      return calc.compute(values, { currency: meta.symbol, locale: meta.locale });
    } catch {
      return null;
    }
  }, [calc, values, errors, meta.symbol, meta.locale]);

  const onChange = useCallback((name: string, value: number) => {
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const onReset = useCallback(() => {
    if (calc) setValues(defaultValues(calc.inputs));
  }, [calc]);

  const onShare = useCallback(async () => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(values)) params.set(k, String(v));
    params.set("cur", currency);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
    window.history.replaceState(null, "", url);
  }, [values, currency]);

  if (!calc) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_1fr] items-start">
      {/* ---------------------------------------------------------- form card */}
      <form
        className="card card-pad flex flex-col gap-4 lg:sticky lg:top-20"
        onSubmit={(e) => e.preventDefault()}
        aria-label={`${calc.title} inputs`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Enter your details</h2>
          <select
            className="text-sm font-semibold text-ink-secondary border border-line rounded px-2 py-1 bg-surface cursor-pointer focusable"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            aria-label="Currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {calc.inputs.map((field) => (
            <InputFieldControl
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              currencySymbol={meta.symbol}
              onChange={onChange}
            />
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <button type="button" className="btn btn-ghost btn-sm flex-1" onClick={onReset}>
            <RotateCcw size={15} /> Reset
          </button>
          <button type="button" className="btn btn-primary btn-sm flex-1" onClick={onShare}>
            {copied ? <Check size={15} /> : <Share2 size={15} />}
            {copied ? "Link copied" : "Share result"}
          </button>
        </div>
        <p className="text-xs text-muted">
          Results update automatically as you type. Your inputs never leave your device.
        </p>
      </form>

      {/* ------------------------------------------------------- results side */}
      <div className="flex flex-col gap-5">
        {output ? (
          <>
            <div className="card card-pad">
              <ResultSummary
                metrics={output.metrics}
                interpretation={output.interpretation}
                currencySymbol={meta.symbol}
                locale={meta.locale}
              />
            </div>
            {output.chart && (
              <ChartPanel chart={output.chart} currencySymbol={meta.symbol} locale={meta.locale} />
            )}
            {output.table && (
              <DataTable table={output.table} currencySymbol={meta.symbol} locale={meta.locale} />
            )}
          </>
        ) : (
          <div className="card card-pad text-center py-14">
            <p className="text-ink-secondary font-medium">Check your inputs to see results</p>
            <p className="text-sm text-muted mt-1">Some fields need a valid value before we can calculate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
