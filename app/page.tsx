import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, BookOpen, IndianRupee } from "lucide-react";
import { CalculatorSearch } from "@/components/search/calculator-search";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { FaqAccordion } from "@/components/calculators/faq-accordion";
import { CATEGORIES, calculatorsByCategory, featuredCalculators } from "@/lib/calculators/registry";
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
            Free, accurate calculators for Home Loan EMI, SIP returns, Income Tax (Old vs New), PPF, and GST. Get instant answers with clear explanations tailored for the Indian financial system.
          </p>

          <div className="mt-8 max-w-xl mx-auto">
            <CalculatorSearch autoFocus={false} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5"><Zap size={15} className="text-brand" /> Instant results</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-brand" /> No signup, fully private</span>
            <span className="inline-flex items-center gap-1.5"><BookOpen size={15} className="text-brand" /> Formulas explained</span>
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
          {featured.map((c) => (
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
                          href={`/finance/${c.slug}`}
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
            <h2 className="h-section mt-2">Small numbers, life-changing decisions</h2>
            <p className="text-ink-secondary mt-3 leading-relaxed">
              A 1% difference in a home loan rate, or starting your mutual fund SIP five years earlier, can be worth lakhs or crores over
              time. Our calculators don't just spit out an answer — they show the growth curve, the amortization schedule, and the
              tax implications, so you understand the <em>why</em>, not just the <em>what</em>.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { icon: Zap, t: "See the trade-offs instantly", d: "Slide any input and watch results and charts update live without reloading." },
                { icon: BookOpen, t: "Learn as you calculate", d: "Plain-English formulas, tax saving tips and FAQs on every single page." },
                { icon: IndianRupee, t: "Built for India", d: "Lakh/Crore formatting, RBI repo rate context, and Indian tax regime rules." },
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
          <div className="card card-pad bg-brand-tint/40">
            <p className="text-sm font-semibold text-brand uppercase tracking-wide mb-3">Try one now</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {featured.slice(0, 4).map((c) => (
                <CalculatorCard key={c.slug} calc={c} compact />
              ))}
            </div>
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
