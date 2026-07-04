import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalculatorRunner } from "@/components/calculators/calculator-runner";
import { FormulaBlock } from "@/components/calculators/formula-block";
import { FaqAccordion } from "@/components/calculators/faq-accordion";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import {
  CALCULATORS,
  getCalculator,
  allSlugs,
  relatedCalculators,
  categoryMeta,
  getCalculatorPath
} from "@/lib/calculators/registry";
import { JsonLd, calculatorLd, faqLd, breadcrumbLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CALCULATORS.filter(c => c.category !== "health" && c.category !== "featured-units").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};
  const title = `${calc.title} — Free & Accurate`;
  return {
    title,
    description: `${calc.tagline} ${calc.intro.slice(0, 110)}`,
    keywords: calc.keywords,
    alternates: { canonical: `/finance/${calc.slug}` },
    openGraph: {
      title: `${calc.title} — ${SITE.name}`,
      description: calc.tagline,
      url: `${SITE.url}/finance/${calc.slug}`,
      type: "website",
    },
  };
}

// Deterministic adjacency for prev/next navigation.
function adjacent(slug: string) {
  const financeCalcs = CALCULATORS.filter(c => c.category !== "health" && c.category !== "featured-units");
  const i = financeCalcs.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? financeCalcs[i - 1] : financeCalcs[financeCalcs.length - 1],
    next: i < financeCalcs.length - 1 ? financeCalcs[i + 1] : financeCalcs[0],
  };
}

const SECTIONS = [
  { id: "calculator", label: "Calculator" },
  { id: "how", label: "How it works" },
  { id: "formula", label: "Formula" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "Related" },
];

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) notFound();

  const cat = categoryMeta(calc.category);
  const related = relatedCalculators(calc.slug);
  const { prev, next } = adjacent(calc.slug);

  return (
    <>
      <JsonLd
        data={[
          calculatorLd(calc),
          faqLd(calc),
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Finance", url: "/finance" },
            { name: calc.title, url: `/finance/${calc.slug}` },
          ]),
        ]}
      />

      {/* hero */}
      <section className="border-b bg-surface">
        <div className="container-page pt-5 pb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Finance", href: "/finance" },
              { label: calc.title.replace(" Calculator", "") },
            ]}
          />
          <div className="mt-5 max-w-3xl">
            <Link href={`/finance#${cat.id}`} className="chip mb-3">
              {cat.label}
            </Link>
            <h1 className="h-hero">{calc.title}</h1>
            <p className="lede mt-3">{calc.tagline}</p>
            <p className="text-ink-secondary mt-3 max-w-2xl leading-relaxed">{calc.intro}</p>
            
            {/* Trust Layer */}
            {(calc.author || calc.lastUpdated) && (
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted border-t pt-4">
                {calc.author && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-ink-secondary">Reviewed by:</span>
                    {calc.author.url ? (
                      <a href={calc.author.url} className="text-brand hover:underline">{calc.author.name}</a>
                    ) : (
                      <span>{calc.author.name}</span>
                    )}
                    {calc.author.role && <span className="opacity-80">({calc.author.role})</span>}
                  </div>
                )}
                {calc.lastUpdated && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-ink-secondary">Last updated:</span>
                    <time dateTime={calc.lastUpdated}>{new Date(calc.lastUpdated).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container-page section grid gap-10 lg:grid-cols-[1fr_220px]">
        <div className="min-w-0 flex flex-col gap-14 order-2 lg:order-1">
          {/* the interactive calculator */}
          <section id="calculator" className="scroll-mt-24">
            <CalculatorRunner slug={calc.slug} />
          </section>

          {/* how it works */}
          <section id="how" className="scroll-mt-24 prose-fin max-w-none">
            <h2>How the {calc.title.replace(" Calculator", "").toLowerCase()} is calculated</h2>
            {calc.explanation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {calc.methodology && (
              <div className="mt-4 p-4 bg-surface rounded-lg border border-line text-sm text-ink-secondary">
                <strong className="text-ink">Methodology:</strong> {calc.methodology}
              </div>
            )}
          </section>

          {/* formula */}
          <section id="formula" className="scroll-mt-24">
            <h2 className="h-section mb-4">The formula</h2>
            <FormulaBlock formula={calc.formula} />
          </section>

          {/* examples */}
          <section id="examples" className="scroll-mt-24">
            <h2 className="h-section mb-1">Worked examples</h2>
            <p className="text-muted mb-5">See the calculator in action with realistic numbers.</p>
            <div className="grid gap-4 md:grid-cols-3">
              {calc.examples.map((ex, i) => (
                <div key={i} className="card card-pad">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand mb-2">Example {i + 1}</p>
                  <h3 className="font-bold text-ink mb-1.5">{ex.title}</h3>
                  <p className="text-sm text-muted mb-3">{ex.scenario}</p>
                  <p className="text-sm text-ink-secondary border-t pt-3">
                    <span className="font-semibold text-ink">Result: </span>
                    {ex.result}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24">
            <h2 className="h-section mb-5">Frequently asked questions</h2>
            <FaqAccordion items={calc.faq} />
          </section>

          {/* disclaimer */}
          <div className="flex gap-3 rounded-lg border border-line bg-brand-tint/40 px-4 py-4">
            <Info size={18} className="text-brand shrink-0 mt-0.5" />
            <p className="text-sm text-muted leading-relaxed">
              {calc.disclaimer ??
                "This calculator is for educational and estimation purposes only and does not constitute financial advice. Real returns, interest rates, taxes and fees vary. Consult a qualified professional before making financial decisions."}
            </p>
          </div>

          {/* related */}
          <section id="related" className="scroll-mt-24">
            <RelatedCalculators items={related} />
          </section>

          {/* prev / next */}
          <nav className="grid gap-3 sm:grid-cols-2 pt-2" aria-label="Adjacent calculators">
            <Link href={getCalculatorPath(prev)} className="card card-pad hover:border-brand transition-colors group">
              <span className="text-xs text-muted inline-flex items-center gap-1">
                <ArrowLeft size={13} /> Previous
              </span>
              <span className="block font-bold text-ink group-hover:text-brand mt-1">
                {prev.title.replace(" Calculator", "")}
              </span>
            </Link>
            <Link
              href={getCalculatorPath(next)}
              className="card card-pad hover:border-brand transition-colors group sm:text-right"
            >
              <span className="text-xs text-muted inline-flex items-center gap-1 sm:justify-end w-full">
                Next <ArrowRight size={13} />
              </span>
              <span className="block font-bold text-ink group-hover:text-brand mt-1">
                {next.title.replace(" Calculator", "")}
              </span>
            </Link>
          </nav>
        </div>

        {/* sticky in-page TOC */}
        <aside className="order-1 lg:order-2 hidden lg:block">
          <div className="sticky top-20">
            <p className="text-xs font-bold uppercase tracking-wide text-muted mb-3">On this page</p>
            <nav className="flex flex-col gap-1 text-sm" aria-label="Sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="py-1.5 text-ink-secondary hover:text-brand border-l-2 border-line hover:border-brand pl-3 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 pt-5 border-t">
              <Link href="/finance" className="link text-sm inline-flex items-center gap-1">
                <ArrowLeft size={14} /> All finance calculators
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
