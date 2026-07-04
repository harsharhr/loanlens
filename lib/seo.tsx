/** JSON-LD structured-data builders. Rendered as <script type="application/ld+json">. */
import { SITE } from "./site";
import type { CalculatorConfig } from "./calculators/types";
import { getCalculatorPath } from "./calculators/registry";

export function webApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

export function calculatorLd(calc: CalculatorConfig) {
  const category = calc.category === "health" ? "HealthApplication" : calc.category === "featured-units" ? "UtilityApplication" : "FinanceApplication";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.title,
    url: `${SITE.url}${getCalculatorPath(calc)}`,
    description: calc.tagline,
    applicationCategory: category,
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

export function faqLd(calc: CalculatorConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calc.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}

/** Render one or more JSON-LD objects. */
export function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
