import Link from "next/link";

/** The brand mark — a teal tile pairing a rising trend line with equals bars. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="var(--brand)" />
      <path
        d="M15 39 L27 30 L36 35 L49 21"
        stroke="#f4d9a6"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="21" r="3.4" fill="#f4d9a6" />
      <rect x="15" y="46" width="34" height="3.4" rx="1.7" fill="#ffffff" fillOpacity="0.92" />
      <rect x="15" y="53" width="22" height="3.4" rx="1.7" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 focusable" aria-label="Usemecalculator home">
      <LogoMark size={compact ? 28 : 34} />
      {!compact && (
        <span className="text-[19px] font-bold tracking-tight text-ink flex items-center gap-1.5">
          Usemecalculator
          <span className="text-[10px] uppercase tracking-widest text-brand font-bold bg-brand-soft px-1.5 py-0.5 rounded">India</span>
        </span>
      )}
    </Link>
  );
}
