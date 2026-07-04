/** Global site metadata used for SEO, headers, and structured data. */
export const SITE = {
  name: "Usemecalculator",
  shortName: "Usemecalc",
  tagline: "Free, accurate finance calculators",
  description:
    "Fast, trustworthy finance calculators for compound interest, SIP, loans, EMI, mortgage, CAGR and more. No signup, instant results, clear explanations.",
  // Current live production domain. Change to a custom domain (e.g.
  // https://usemecalculator.com) once one is connected in Vercel.
  url: "https://usemecalculator.vercel.app",
  locale: "en_IN",
  defaultCurrency: "INR" as const,
  twitter: "@usemecalc",
  /** Google AdSense publisher ID (carried over from the original site). */
  adsensePublisherId: "ca-pub-4910237367995817",
};

export const NAV = {
  primary: [
    { label: "Finance", href: "/finance" },
    { label: "About", href: "/about" },
  ],
};
