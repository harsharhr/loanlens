import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CALCULATORS, getCalculatorPath } from "@/lib/calculators/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/finance", "/featured-units", "/health", "/about", "/contact", "/privacy", "/terms"];
  const calcRoutes = CALCULATORS.map((calc) => getCalculatorPath(calc));

  return [...staticRoutes, ...calcRoutes].map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route.includes("/finance") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.includes("/finance") ? 0.8 : 0.6,
  }));
}
