import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE.name} — free, private, accurate finance calculators with the formulas explained in plain English.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-page section max-w-prose">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="h-hero mt-5">About {SITE.name}</h1>
      <div className="prose-fin mt-6 max-w-none">
        <p>
          {SITE.name} is a growing library of finance calculators built on one belief: a good calculator should not just
          give you a number, it should help you understand it. Every tool here shows its formula, its assumptions, and
          the reasoning behind the result.
        </p>
        <h2>What makes it different</h2>
        <ul>
          <li><strong>Accurate by design.</strong> Each calculator uses the standard, transparent financial formula for its job — the same maths used by banks and advisers.</li>
          <li><strong>Private.</strong> Every calculation runs in your browser. Your numbers are never sent anywhere or stored.</li>
          <li><strong>Fast and free.</strong> No signup, no paywall, no clutter. Results update the instant you change an input.</li>
          <li><strong>Explained.</strong> Plain-English formulas, worked examples and FAQs sit on every page, so you learn as you calculate.</li>
        </ul>
        <h2>Built to grow</h2>
        <p>
          The platform is engineered so that new calculators are added as small, self-contained modules rather than
          hand-built pages. That keeps every tool consistent, fast and trustworthy as the library expands beyond
          finance into tax, health and everyday utilities.
        </p>
        <h2>A note on advice</h2>
        <p>
          These calculators are educational tools for estimation. They are not financial advice. Real returns, interest
          rates, taxes and fees vary, so please consult a qualified professional before making important financial
          decisions.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/finance" className="btn btn-primary">
          Explore the calculators
        </Link>
      </div>
    </div>
  );
}
