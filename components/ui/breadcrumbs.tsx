import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-muted">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.href ? (
              <Link href={c.href} className="hover:text-brand transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-ink-secondary font-medium" aria-current="page">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight size={14} className="text-muted/70" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
