import Link from "next/link";
import { ArrowRight, Activity, Flame, Footprints, Baby, Heart, Apple } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { calculatorsByCategory } from "@/lib/calculators/registry";

export const metadata = {
  title: `Health & Fitness Calculators — ${SITE.name}`,
  description: "Free, accurate health calculators for BMI, BMR, pregnancy due dates, step conversions, and more.",
  alternates: { canonical: "/health" },
};

const SUBCATEGORIES = [
  { id: "body-composition", label: "Body Composition", icon: Activity },
  { id: "metabolism", label: "Metabolism", icon: Flame },
  { id: "walking-fitness", label: "Walking & Fitness", icon: Footprints },
  { id: "pregnancy", label: "Pregnancy", icon: Baby },
  { id: "recovery", label: "Recovery", icon: Heart },
  { id: "nutrition", label: "Nutrition", icon: Apple },
];

export default function HealthPage() {
  const allHealth = calculatorsByCategory("health");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Health", url: "/health" },
          ]),
        ]}
      />

      <section className="bg-surface border-b">
        <div className="container-page pt-5 pb-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Health & Fitness" }]} />
          <h1 className="h-hero mt-5">Health & Fitness Calculators</h1>
          <p className="lede mt-3 max-w-2xl text-balance">
            Evidence-based calculators to estimate BMI, BMR, daily calories, step conversions, and pregnancy milestones. 
            <strong> Please note that these tools are provided as guides only and do not replace professional medical advice.</strong>
          </p>
        </div>
      </section>

      <section className="container-page section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUBCATEGORIES.map((sub) => {
            const group = allHealth.filter((c) => c.subcategory === sub.id);
            if (group.length === 0) return null;
            return (
              <div key={sub.id} className="card card-pad" id={sub.id}>
                <div className="flex items-center gap-2 mb-3 text-ink">
                  <sub.icon size={18} className="text-brand" />
                  <h2 className="text-lg font-bold">{sub.label}</h2>
                </div>
                <ul className="space-y-1.5">
                  {group.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/health/${c.slug}`}
                        className="group flex items-center justify-between text-[15px] text-ink-secondary hover:text-brand py-1"
                      >
                        {c.title.replace(" Calculator", "")}
                        <ArrowRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 text-brand transition-opacity"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
