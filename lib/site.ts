/** Global site metadata used for SEO, headers, and structured data. */
export const SITE = {
  name: "Usemecalculator",
  shortName: "Usemecalc",
  tagline: "Free, accurate finance calculators",
  description:
    "Fast, trustworthy finance calculators for compound interest, SIP, loans, EMI, mortgage, CAGR and more. No signup, instant results, clear explanations.",
  // Update to the production domain when deployed.
  url: "https://usemecalculator.com",
  locale: "en_IN",
  defaultCurrency: "INR" as const,
  twitter: "@usemecalc",
};

export const NAV = {
  primary: [
    { label: "Finance", href: "/finance" },
    { label: "About", href: "/about" },
  ],
};
