import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of ${SITE.name}'s free finance calculators.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-page section max-w-prose">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="h-hero mt-5">Terms of Use</h1>
      <p className="text-muted mt-2">Last updated: July 2026</p>
      <div className="prose-fin mt-6 max-w-none">
        <h2>Acceptance</h2>
        <p>
          By using {SITE.name}, you agree to these terms. If you do not agree, please do not use the site.
        </p>
        <h2>Not financial advice</h2>
        <p>
          The calculators and content are provided for general educational and estimation purposes only. They do not
          constitute financial, investment, tax or legal advice, and must not be relied upon as such. Always consult a
          qualified professional before making financial decisions.
        </p>
        <h2>Accuracy and “as is” basis</h2>
        <p>
          We take care to implement each formula correctly and transparently. However, the tools are provided “as is”
          without warranties of any kind. Results depend entirely on the assumptions you enter and on factors — returns,
          rates, taxes, fees, inflation — that vary in the real world. We do not guarantee outcomes.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.name} and its contributors are not liable for any loss or damage
          arising from your use of, or reliance on, the calculators or content.
        </p>
        <h2>Acceptable use</h2>
        <p>
          You may use the calculators freely for personal and professional decision-making. You may not attempt to
          disrupt the service, misrepresent it as your own, or use it unlawfully.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms as the platform evolves. Continued use after changes constitutes acceptance of the
          revised terms.
        </p>
      </div>
    </div>
  );
}
