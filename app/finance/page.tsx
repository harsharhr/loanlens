import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalculatorSearch } from "@/components/search/calculator-search";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { FaqAccordion } from "@/components/calculators/faq-accordion";
import { CATEGORIES, calculatorsByCategory, featuredCalculators, getCalculatorPath } from "@/lib/calculators/registry";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Finance Calculators — Loans, Investing, Savings & Retirement",
  description:
    "A complete hub of free finance calculators: compound interest, SIP, CAGR, loan EMI, amortization, mortgage, APY, retirement and more. Pick your goal and start calculating.",
  alternates: { canonical: "/finance" },
};

const HUB_FAQ = [
  { q: "Which calculator should I start with?", a: "Start from your goal. Investing money? Try compound interest or SIP. Borrowing? Use the loan or mortgage calculator. Saving toward a target? The savings goal calculator works backwards to a monthly amount." },
  { q: "What's the difference between an SIP and compound interest calculator?", a: "The compound interest calculator is general-purpose for any lump sum plus contributions. The SIP calculator is tuned for monthly mutual-fund investing and adds features like an annual step-up." },
  { q: "Do loan and EMI calculators use reducing-balance interest?", a: "Yes. Our loan, mortgage and amortization tools all use the standard reducing-balance (APR) method, where interest is charged only on the outstanding balance." },
  { q: "Are the results suitable for planning?", a: "They're accurate estimates based on the assumptions you enter. Real-world returns, rates, taxes and fees vary, so treat outputs as a well-grounded guide rather than a guarantee." },
];

export default function FinanceHubPage() {
  const featured = featuredCalculators();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Finance", url: "/finance" },
        ])}
      />

      {/* category hero */}
      <section className="border-b bg-surface">
        <div className="container-page pt-6 pb-10 md:pb-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Finance" }]} />
          <div className="mt-6 max-w-2xl">
            <span className="eyebrow">Finance hub</span>
            <h1 className="h-hero mt-2">Finance calculators for every money decision</h1>
            <p className="lede mt-3">
              From your first SIP to your final mortgage payment — a complete, carefully built set of tools, each with
              the formula and reasoning laid bare.
            </p>
          </div>
          <div className="mt-7 max-w-xl">
            <CalculatorSearch placeholder="Filter calculators — 'EMI', 'retirement', 'CAGR'…" />
          </div>
        </div>
      </section>

      <div className="container-page section grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-12 order-2 lg:order-1">
          {/* featured */}
          <section aria-labelledby="featured">
            <h2 id="featured" className="h-section mb-1">
              Featured calculators
            </h2>
            <p className="text-muted mb-5">The most-used tools, hand-picked to get you started fast.</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featured.map((c) => (
                <CalculatorCard key={c.slug} calc={c} />
              ))}
            </div>
          </section>

          {/* grouped by purpose */}
          {CATEGORIES.filter(c => c.id !== "featured-units" && c.id !== "health" && c.id !== "everyday").map((cat) => (
            <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-h`} className="scroll-mt-24">
              <h2 id={`${cat.id}-h`} className="h-section mb-1">
                {cat.label}
              </h2>
              <p className="text-muted mb-5">{cat.description}</p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {calculatorsByCategory(cat.id).map((c) => (
                  <CalculatorCard key={c.slug} calc={c} />
                ))}
              </div>
            </section>
          ))}

          {/* start-here guidance */}
          <section className="card card-pad bg-brand-tint/40">
            <h2 className="text-xl font-bold text-ink mb-2">Not sure where to start?</h2>
            <p className="text-ink-secondary mb-4">Pick the sentence that sounds like you:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "“I want to grow my savings.”", s: "compound-interest", l: "Compound Interest" },
                { t: "“I invest a fixed amount monthly.”", s: "sip", l: "SIP Calculator" },
                { t: "“I'm taking a loan and want the EMI.”", s: "loan", l: "Loan Calculator" },
                { t: "“I'm buying a home.”", s: "mortgage", l: "Mortgage Calculator" },
                { t: "“I'm planning for retirement.”", s: "retirement", l: "Retirement Calculator" },
                { t: "“I'm saving toward a specific goal.”", s: "savings-goal", l: "Savings Goal" },
              ].map((row) => (
                <Link
                  key={row.s}
                  href={getCalculatorPath(row.s)}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3 hover:border-brand transition-colors"
                >
                  <span className="text-sm text-ink-secondary">{row.t}</span>
                  <span className="text-xs font-semibold text-brand whitespace-nowrap">{row.l} →</span>
                </Link>
              ))}
            </div>
          </section>

          {/* educational */}
          <section className="prose-fin max-w-none">
            <h2>How to choose the right calculator</h2>
            <p>
              Finance questions usually fall into three buckets. <strong>Growing money</strong> is about compounding —
              use the compound interest, SIP or CAGR tools. <strong>Borrowing money</strong> is about repayment — the
              loan, mortgage, amortization and loan payoff calculators show your EMI and total interest.{" "}
              <strong>Saving toward something</strong> sits in between — the savings goal and retirement calculators work
              backwards from a target to tell you what to set aside.
            </p>
            <p>
              A good habit is to move laterally: after checking a loan EMI, open the amortization schedule to see the
              interest breakdown, then the loan payoff tool to test the effect of paying a little extra. Each page links
              to its natural neighbours so you never hit a dead end.
            </p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="hub-faq">
            <h2 id="hub-faq" className="h-section mb-5">
              Finance calculator FAQs
            </h2>
            <FaqAccordion items={HUB_FAQ} />
          </section>
        </div>

        {/* side rail TOC */}
        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-20">
            <p className="text-xs font-bold uppercase tracking-wide text-muted mb-3">On this page</p>
            <nav className="flex flex-col gap-1 text-sm" aria-label="Categories">
              <a href="#featured" className="py-1.5 text-ink-secondary hover:text-brand border-l-2 border-line hover:border-brand pl-3 transition-colors">
                Featured
              </a>
              {CATEGORIES.filter(c => c.id !== "featured-units" && c.id !== "health" && c.id !== "everyday").map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="py-1.5 text-ink-secondary hover:text-brand border-l-2 border-line hover:border-brand pl-3 transition-colors"
                >
                  {cat.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}
