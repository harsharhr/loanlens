import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, BookOpen, IndianRupee, CheckCircle2 } from "lucide-react";
import { CalculatorSearch } from "@/components/search/calculator-search";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { FaqAccordion } from "@/components/calculators/faq-accordion";
import { CATEGORIES, calculatorsByCategory, featuredCalculators, getCalculatorPath } from "@/lib/calculators/registry";
import { JsonLd, webApplicationLd } from "@/lib/seo";

const HOME_FAQ = [
  { q: "Are these calculators free to use?", a: "Yes, every calculator on Usemecalculator is completely free. There's no signup, no paywall, and no limit on how many times you can use them." },
  { q: "How accurate are the results?", a: "Each calculator uses the standard, transparent financial formula for its purpose — the same maths banks and advisers use. Every page shows the exact formula and assumptions so you can verify the result." },
  { q: "Is my data private?", a: "All calculations run in your browser. Your numbers are never sent to a server or stored, so your financial details stay entirely on your device." },
  { q: "Do the calculators work for currencies other than the rupee?", a: "Yes. While defaults are India-friendly, you can switch the currency on any calculator, and the underlying maths is universal." },
  { q: "Can I share a calculation with someone?", a: "Yes. Use the 'Share result' button on any calculator to copy a link that reopens the calculator with your exact inputs." },
];

export default function HomePage() {
  const featured = featuredCalculators();

  return (
    <>
      <JsonLd data={webApplicationLd()} />

      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(120% 80% at 50% -10%, var(--brand-tint) 0%, transparent 60%)" }}
        />
        <div className="container-page pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <span className="eyebrow">India's Smartest Finance Calculators</span>
          <h1 className="h-hero mt-3 max-w-3xl mx-auto text-balance">
            Make confident money decisions in seconds
          </h1>
          <p className="lede mt-4 max-w-2xl mx-auto">
            Built with India-specific rules, lakh/crore formatting, and current tax regime logic. Plan your SIPs, calculate home loan EMIs, and compare tax regimes with complete confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/finance/income-tax" className="button button-primary">Compare tax regimes</Link>
            <Link href="/finance/home-loan" className="button button-secondary">Calculate home EMI</Link>
            <Link href="/finance/sip" className="button button-secondary">Start SIP planning</Link>
            <Link href="/finance/retirement" className="button button-secondary">Plan retirement</Link>
          </div>

          <div className="mt-6 max-w-xl mx-auto">
            <CalculatorSearch autoFocus={false} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted border border-line bg-surface/50 py-3 px-6 rounded-full w-fit mx-auto shadow-sm">
            <span className="inline-flex items-center gap-1.5 font-medium"><CheckCircle2 size={16} className="text-brand" /> Standard formulas</span>
            <span className="inline-flex items-center gap-1.5 font-medium"><CheckCircle2 size={16} className="text-brand" /> India-specific rules</span>
            <span className="inline-flex items-center gap-1.5 font-medium"><CheckCircle2 size={16} className="text-brand" /> Browser-only privacy</span>
            <span className="inline-flex items-center gap-1.5 font-medium"><CheckCircle2 size={16} className="text-brand" /> Updated FY 24-25</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- featured */}
      <section className="container-page section-tight">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="h-section">Popular calculators</h2>
            <p className="text-muted mt-1">The tools people reach for most.</p>
          </div>
          <Link href="/finance" className="link hidden sm:inline-flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- categories */}
      <section className="bg-surface border-y">
        <div className="container-page section">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="h-section">Browse by what you're planning</h2>
            <p className="text-muted mt-2">
              Every calculator sits in a category so you can move naturally from one decision to the next.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const calcs = calculatorsByCategory(cat.id);
              return (
                <div key={cat.id} className="card card-pad" id={cat.id}>
                  <h3 className="text-lg font-bold text-ink">{cat.label}</h3>
                  <p className="text-sm text-muted mt-1 mb-3">{cat.description}</p>
                  <ul className="space-y-1.5">
                    {calcs.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={getCalculatorPath(c)}
                          className="group flex items-center justify-between text-[15px] text-ink-secondary hover:text-brand py-1"
                        >
                          {c.title.replace(" Calculator", "")}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 text-brand transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- educational */}
      <section className="container-page section">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">Why it matters</span>
            <h2 className="h-section mt-2">Indian household decisions run on numbers</h2>
            <p className="text-ink-secondary mt-3 leading-relaxed">
              A 0.5% drop in your home loan rate, or stepping up your SIP by just ₹2,000 a year, can shift your retirement date by a decade. Our calculators are designed to show you exactly how these numbers play out in the real world.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { icon: Zap, t: "See the trade-offs instantly", d: "Slide any input and watch results and charts update live without reloading." },
                { icon: BookOpen, t: "Learn as you calculate", d: "Plain-English formulas, tax saving tips and FAQs on every single page." },
                { icon: ShieldCheck, t: "100% Private & Shareable", d: "Everything runs securely in your browser. Share results via a simple URL link." },
              ].map((f) => (
                <li key={f.t} className="flex gap-3">
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-brand-soft text-brand">
                    <f.icon size={18} />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{f.t}</span>
                    <span className="block text-sm text-muted">{f.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card card-pad bg-brand-tint/20 border-brand/20">
            <p className="text-xs font-bold text-brand uppercase tracking-wide mb-3">Concrete Example</p>
            <h3 className="font-bold text-ink text-lg mb-2">Home Loan: ₹50 Lakh at 8.5%</h3>
            <p className="text-sm text-ink-secondary mb-3 leading-relaxed">
              If you take a ₹50 lakh home loan for 20 years at 8.5%, your EMI will be <strong>₹43,391</strong>. By the end, you will have paid <strong>₹54.1 lakh</strong> just in interest!
            </p>
            <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
              <strong>The magic of prepayment:</strong> If you increase your EMI by just ₹5,000 per month, you will save over <strong>₹12 lakh</strong> in interest and finish the loan 4 years early.
            </p>
            <Link href="/finance/home-loan" className="link font-semibold inline-flex items-center gap-1 text-sm">
              Try it yourself <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <section className="bg-surface border-y">
        <div className="container-page section max-w-3xl">
          <h2 className="h-section text-center mb-8">Frequently asked questions</h2>
          <FaqAccordion items={HOME_FAQ} />
        </div>
      </section>
    </>
  );
}
