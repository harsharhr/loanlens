import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data — short version: calculations run in your browser and your inputs are never stored.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-page section max-w-prose">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <h1 className="h-hero mt-5">Privacy Policy</h1>
      <p className="text-muted mt-2">Last updated: July 2026</p>
      <div className="prose-fin mt-6 max-w-none">
        <p>
          {SITE.name} is designed to be private by default. This policy explains, in plain language, what data is and
          isn't collected.
        </p>
        <h2>Your calculations stay on your device</h2>
        <p>
          Every calculator runs entirely in your browser. The numbers you type — amounts, rates, ages, goals — are never
          transmitted to a server and are never stored by us. When you close the tab, they're gone.
        </p>
        <h2>Shared links</h2>
        <p>
          If you use a “Share result” button, your inputs are encoded into the URL so the calculator can reproduce them.
          That link is created on your device; it is only shared if you choose to send it to someone.
        </p>
        <h2>Analytics and cookies</h2>
        <p>
          We may use privacy-respecting, aggregate analytics to understand which calculators are useful. Any such data is
          anonymous and cannot identify you. We do not sell personal data. If advertising is shown, it is clearly
          separated from the calculator content.
        </p>
        <h2>Third-party links</h2>
        <p>
          Pages may link to external resources. We are not responsible for the privacy practices of other sites; please
          review their policies.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about privacy? Reach out through the channels listed on our About page. This policy may be updated
          from time to time; material changes will be reflected in the “last updated” date above.
        </p>
      </div>
    </div>
  );
}
