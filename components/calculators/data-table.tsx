"use client";

import { useState } from "react";
import type { TableSpec } from "@/lib/calculators/types";
import { formatValue } from "@/lib/calculators/formatters";

interface Props {
  table: TableSpec;
  currencySymbol: string;
  locale: string;
}

export function DataTable({ table, currencySymbol, locale }: Props) {
  const [showAll, setShowAll] = useState(false);
  const preview = table.previewRows ?? 10;
  const rows = showAll ? table.rows : table.rows.slice(0, preview);
  const hasMore = table.rows.length > preview;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b">
        <h3 className="text-base font-bold text-ink">{table.title}</h3>
        <span className="text-xs text-muted">{table.rows.length} rows</span>
      </div>
      <div className="table-scroll" style={{ maxHeight: showAll ? 460 : undefined, overflowY: showAll ? "auto" : "visible" }}>
        <table className="data-table">
          <thead>
            <tr>
              {table.columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {table.columns.map((c) => (
                  <td key={c.key}>{formatValue(row[c.key], c.format, currencySymbol, locale)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="px-5 py-3 border-t">
          <button className="link text-sm" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show less" : `Show all ${table.rows.length} rows`}
          </button>
        </div>
      )}
    </div>
  );
}
