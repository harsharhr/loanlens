import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { FaqAccordion } from "@/components/calculators/faq-accordion";
import { calculatorsByCategory } from "@/lib/calculators/registry";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Everyday Tools — Age, Percentage & Date Calculators — ${SITE.name}`,
  description:
    "Free everyday calculators: exact age from date of birth, percentage maths (X% of Y, marks %, % change), and days between two dates. Instant, private, accurate.",
  alternates: { canonical: "/tools" },
};

const HUB_FAQ = [
  { q: "How is exact age calculated for exam eligibility?", a: "Recruiting bodies compute completed age as on a cut-off date given in the notification. The Age Calculator lets you set that exact date so you see precisely what the examiner will." },
  { q: "How do I work out a percentage quickly?", a: "The Percentage Calculator covers the three everyday cases — X% of Y (discounts, tips), X as a % of Y (marks, shares) and % change (hikes, price moves) — with the working shown." },
  { q: "Are days between dates counted inclusively?", a: "The Date Difference Calculator counts complete days between dates (end date excluded), and tells you when to add 1 for inclusive counts like hotel nights or notice periods." },
  { q: "Is anything I enter stored?", a: "No. Every tool runs entirely in your browser — dates of birth and numbers are never sent to a server." },
];

export default function ToolsPage() {
  const tools = calculatorsByCategory("everyday");

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Everyday Tools", url: "/tools" },
        ])}
      />

      <section className="border-b bg-surface">
        <div className="container-page pt-6 pb-10 md:pb-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Everyday Tools" }]} />
          <div className="mt-6 max-w-2xl">
            <span className="eyebrow">Everyday tools</span>
            <h1 className="h-hero mt-2">Small calculations you need all the time</h1>
            <p className="lede mt-3">
              Exact age for exam forms, percentage maths without second-guessing, and the precise gap between two
              dates — the little tools that save you from mental arithmetic and spreadsheet detours.
            </p>
          </div>
        </div>
      </section>

      <div className="container-page section">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {tools.map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
        </div>

        <section className="prose-fin max-w-none mb-14">
          <h2>Why exact beats approximate</h2>
          <p>
            Most everyday number questions get answered with a guess — “about 31”, “roughly 15 percent”, “around three
            months”. That's fine until it isn't: exam eligibility is decided on completed age as on a printed cut-off
            date, a notice period is counted in exact days, and a discount misjudged by a few percent is real money.
            Each tool here shows its working, so you can verify the answer rather than trust a black box.
          </p>
          <p>
            These tools pair naturally with the rest of the site: check your age against a job notification, then
            estimate the <Link href="/finance/in-hand-salary" className="link">in-hand salary</Link> the role pays;
            work out a percentage change, then see what it compounds to with the{" "}
            <Link href="/finance/cagr" className="link">CAGR calculator</Link>.
          </p>
        </section>

        <section aria-labelledby="tools-faq">
          <h2 id="tools-faq" className="h-section mb-5">
            Everyday tools FAQs
          </h2>
          <FaqAccordion items={HUB_FAQ} />
        </section>
      </div>
    </>
  );
}
