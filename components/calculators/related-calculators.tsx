import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CalculatorConfig } from "@/lib/calculators/types";
import { getCalculatorPath } from "@/lib/calculators/registry";

export function RelatedCalculators({ items }: { items: CalculatorConfig[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="h-section mb-1">
        Related calculators
      </h2>
      <p className="text-muted mb-5">Keep exploring — these pair well with what you just calculated.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <Link
            key={c.slug}
            href={getCalculatorPath(c)}
            className="group card card-pad hover:border-brand transition-all focusable"
          >
            <h3 className="text-[15px] font-bold text-ink mb-1 flex items-center gap-1">
              {c.title.replace(" Calculator", "")}
              <ArrowRight size={15} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-muted leading-snug">{c.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
