import type { CalculatorConfig } from "@/lib/calculators/types";

export function FormulaBlock({ formula }: { formula: CalculatorConfig["formula"] }) {
  return (
    <div className="card card-pad">
      <h3 className="text-lg font-bold text-ink mb-3">{formula.heading}</h3>
      <div className="rounded-lg bg-brand-tint border border-line px-4 py-4 mb-4">
        <code className="block text-[15px] md:text-base font-semibold text-ink num text-center break-words">
          {formula.expression}
        </code>
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed mb-4">{formula.body}</p>
      <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {formula.variables.map((v) => (
          <div key={v.symbol} className="flex gap-2 text-sm">
            <dt className="font-bold text-brand num shrink-0">{v.symbol}</dt>
            <dd className="text-muted">— {v.meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
