"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { searchCalculators, CALCULATORS, getCalculatorPath } from "@/lib/calculators/registry";

interface Props {
  placeholder?: string;
  /** show a few suggestion chips under an empty box */
  suggestions?: boolean;
  autoFocus?: boolean;
}

export function CalculatorSearch({
  placeholder = "Search calculators — try 'EMI', 'SIP', 'compound'…",
  suggestions = true,
  autoFocus = false,
}: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchCalculators(q).slice(0, 8), [q]);
  const popular = useMemo(() => CALCULATORS.filter((c) => c.featured).slice(0, 5), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="input-wrap" style={{ borderColor: open ? "var(--brand)" : undefined }}>
        <span className="pl-3.5 text-muted flex items-center" aria-hidden>
          <Search size={18} />
        </span>
        <input
          className="input-el"
          type="search"
          value={q}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search calculators"
          aria-expanded={open}
          role="combobox"
          aria-controls="calc-search-results"
        />
        {q && (
          <button className="px-3 text-muted hover:text-ink" onClick={() => setQ("")} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      {open && (q || suggestions) && (
        <div
          id="calc-search-results"
          className="absolute z-30 mt-2 w-full card shadow-elevated overflow-hidden"
          role="listbox"
        >
          {q && results.length === 0 && (
            <div className="p-4 text-sm text-muted">
              No calculator matches “{q}”. Try a broader term like <span className="text-ink font-semibold">loan</span> or{" "}
              <span className="text-ink font-semibold">interest</span>.
            </div>
          )}

          {(q ? results : []).map((r) => (
            <Link
              key={r.slug}
              href={getCalculatorPath(r.slug)}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-brand-soft transition-colors border-b border-line last:border-0"
              role="option"
              aria-selected="false"
              onClick={() => setOpen(false)}
            >
              <span>
                <span className="block text-sm font-semibold text-ink">{r.title}</span>
                <span className="block text-xs text-muted">{r.tagline}</span>
              </span>
              <ArrowRight size={16} className="text-brand shrink-0" />
            </Link>
          ))}

          {!q && suggestions && (
            <div className="p-3">
              <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">Popular</p>
              <div className="flex flex-wrap gap-2">
                {popular.map((c) => (
                  <Link
                    key={c.slug}
                    href={getCalculatorPath(c)}
                    className="chip hover:text-brand"
                    onClick={() => setOpen(false)}
                  >
                    {c.title.replace(" Calculator", "")}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
