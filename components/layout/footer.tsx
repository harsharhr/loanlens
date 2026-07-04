import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { SITE } from "@/lib/site";
import { CATEGORIES, calculatorsByCategory } from "@/lib/calculators/registry";

export function Footer() {
  const year = 2026; // static build — avoid Date.now() at render for deterministic output
  return (
    <footer className="border-t bg-surface mt-8">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <LogoMark size={30} />
              <span className="text-lg font-bold tracking-tight">
                Useme<span className="text-brand">calculator</span>
              </span>
            </div>
            <p className="text-sm text-muted max-w-xs leading-relaxed">
              Fast, trustworthy finance calculators with clear explanations. Free to use, no signup, instant results —
              built for India and usable everywhere.
            </p>
          </div>

          {CATEGORIES.slice(0, 3).map((cat) => (
            <div key={cat.id}>
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink mb-3">{cat.label}</h3>
              <ul className="space-y-2">
                {calculatorsByCategory(cat.id).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/finance/${c.slug}`} className="text-sm text-muted hover:text-brand transition-colors">
                      {c.title.replace(" Calculator", "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {year} {SITE.name}. For education and estimation only — not financial advice.
          </p>
          <nav className="flex items-center gap-5 text-xs text-muted" aria-label="Legal">
            <Link href="/finance" className="hover:text-brand">
              All calculators
            </Link>
            <Link href="/about" className="hover:text-brand">
              About
            </Link>
            <Link href="/privacy" className="hover:text-brand">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
