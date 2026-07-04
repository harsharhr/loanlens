import Link from "next/link";
import { ArrowRight, Ruler, Scale, Pipette, Zap, Weight, Focus } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { calculatorsByCategory } from "@/lib/calculators/registry";

export const metadata = {
  title: `Featured Units & Conversions — ${SITE.name}`,
  description: "Accurate, instant unit conversions for length, mass, volume, force, area, and energy.",
};

const SUBCATEGORIES = [
  { id: "height-length", label: "Height & Length", icon: Ruler },
  { id: "mass-weight", label: "Mass (Weight)", icon: Scale },
  { id: "volume", label: "Volume", icon: Pipette },
  { id: "volume-to-weight", label: "Volume to Weight", icon: Weight },
  { id: "force", label: "Force", icon: Zap },
  { id: "area", label: "Area", icon: Focus },
  { id: "area-to-volume", label: "Area to Volume", icon: Focus },
  { id: "energy", label: "Energy", icon: Zap },
];

export default function FeaturedUnitsPage() {
  const allUnits = calculatorsByCategory("featured-units");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Featured Units", url: "/featured-units" },
          ]),
        ]}
      />

      <section className="bg-surface border-b">
        <div className="container-page pt-5 pb-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Featured Units" }]} />
          <h1 className="h-hero mt-5">Unit Conversions</h1>
          <p className="lede mt-3 max-w-2xl text-balance">
            Fast, accurate conversion tools for length, mass, volume, area, force, and energy. Built with precision and clear formula explanations.
          </p>
        </div>
      </section>

      <section className="container-page section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUBCATEGORIES.map((sub) => {
            const group = allUnits.filter((c) => c.subcategory === sub.id);
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
                        href={`/featured-units/${c.slug}`}
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
