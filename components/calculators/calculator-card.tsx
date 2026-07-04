import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CalculatorConfig } from "@/lib/calculators/types";
import { categoryMeta, getCalculatorPath } from "@/lib/calculators/registry";

interface Props {
  calc: Pick<CalculatorConfig, "slug" | "title" | "tagline" | "category">;
  /** compact variant for dense grids */
  compact?: boolean;
}

export function CalculatorCard({ calc, compact = false }: Props) {
  const cat = categoryMeta(calc.category);
  return (
    <Link
      href={getCalculatorPath(calc)}
      className="group card card-pad flex flex-col gap-2 hover:border-brand hover:shadow-elevated transition-all focusable"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="chip">{cat.label}</span>
        <ArrowUpRight
          size={18}
          className="text-muted group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        />
      </div>
      <h3 className="text-base font-bold text-ink leading-snug">{calc.title.replace(" Calculator", "")}</h3>
      {!compact && <p className="text-sm text-muted leading-snug">{calc.tagline}</p>}
    </Link>
  );
}
