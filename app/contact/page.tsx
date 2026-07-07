import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Bug, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${SITE.name} team — report an issue, suggest a calculator, or ask a question about how our formulas work.`,
  alternates: { canonical: "/contact" },
};

const CONTACT_EMAIL = "harsharhr.crc@gmail.com";

export default function ContactPage() {
  return (
    <div className="container-page section max-w-prose">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="h-hero mt-5">Contact us</h1>
      <p className="lede mt-3">
        Questions, corrections, or ideas — we read everything. A real person maintains this site and its formulas.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Bug,
            t: "Report a problem",
            d: "Found a wrong number, a broken page, or a formula you disagree with? Tell us the calculator and the inputs you used.",
          },
          {
            icon: Lightbulb,
            t: "Suggest a calculator",
            d: "Missing a tool you need — NPS, SSY, TDS, anything? Suggestions directly shape what we build next.",
          },
          {
            icon: MessageSquare,
            t: "Ask about a formula",
            d: "Every page documents its formula, but if something is unclear, ask — we'll improve the explanation for everyone.",
          },
          {
            icon: Mail,
            t: "Everything else",
            d: "Partnerships, feedback on the site, or press — the same inbox reaches us for all of it.",
          },
        ].map((c) => (
          <div key={c.t} className="card card-pad">
            <span className="inline-grid place-items-center w-9 h-9 rounded-lg bg-brand-soft text-brand mb-2.5">
              <c.icon size={18} />
            </span>
            <h2 className="font-bold text-ink text-[15px] mb-1">{c.t}</h2>
            <p className="text-sm text-muted leading-snug">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card card-pad bg-brand-tint/40 text-center">
        <p className="text-sm text-muted mb-1.5">Write to us at</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="link text-lg font-bold">
          {CONTACT_EMAIL}
        </a>
        <p className="text-xs text-muted mt-2">We usually reply within 2–3 working days.</p>
      </div>

      <div className="prose-fin mt-10 max-w-none">
        <h2>A note on financial questions</h2>
        <p>
          We're happy to explain how any calculator works, but we cannot give personal financial advice — telling you
          what to invest in, which loan to take, or how to file your taxes. For decisions like those, please consult a
          SEBI-registered adviser or a chartered accountant. Our{" "}
          <Link href="/about" className="link">
            About page
          </Link>{" "}
          explains how we verify formulas and what the calculators can and cannot do.
        </p>
      </div>
    </div>
  );
}
