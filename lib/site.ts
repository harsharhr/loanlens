/** Global site metadata used for SEO, headers, and structured data. */
export const SITE = {
  name: "Usemecalculator India",
  shortName: "Usemecalc",
  tagline: "India's Most Accurate Finance & Tax Calculators",
  description:
    "Fast, trustworthy financial calculators designed specifically for Indian users. Calculate Home Loan EMI, SIP returns, Income Tax (Old vs New Regime), PPF, EPF, and GST with instant, accurate results and clear explanations.",
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
