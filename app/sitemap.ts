import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allSlugs } from "@/lib/calculators/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/finance", "/about", "/privacy", "/terms"];
  const calcRoutes = allSlugs().map((slug) => `/finance/${slug}`);

  return [...staticRoutes, ...calcRoutes].map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route.startsWith("/finance/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/finance/") ? 0.8 : 0.6,
  }));
}
