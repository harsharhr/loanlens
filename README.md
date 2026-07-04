# Usemecalculator

A fast, trustworthy, SEO-friendly finance-calculator platform. Built as a **data-driven
library**: every calculator is a config module, and one shared engine + template powers
routing, navigation, search, charts, tables and structured data. Designed to scale to
100+ calculators across finance and, later, other verticals.

## Stack

- **Next.js 15** (App Router, mostly static generation) + **TypeScript**
- **Tailwind CSS** with a hand-built design-token system (`app/globals.css`)
- **Recharts** (lazy-loaded, client-only) for visualisations
- Zod available for richer validation; core validation is dependency-free

## Architecture

```
app/
  layout.tsx            root shell (fonts, header, footer, metadata)
  page.tsx              home
  finance/page.tsx      finance hub (directory + search + TOC)
  finance/[slug]/       ONE reusable template → all 12 calculator URLs
  about | privacy | terms
  sitemap.ts | robots.ts
lib/calculators/
  types.ts              the CalculatorConfig contract
  utils.ts              shared financial math (EMI, FV, CAGR, APY, amortization…)
  formatters.ts         currency / percent / period formatting
  validators.ts         field validation + defaults
  registry.ts           single source of truth (search, categories, related)
  definitions/*.ts      one file per calculator (config + compute + content)
components/
  layout/ search/ ui/ calculators/   reusable design-system components
```

The interactive part of each calculator (`components/calculators/calculator-runner.tsx`)
is a client island; all supporting content (formula, examples, FAQ, JSON-LD) renders on
the server for SEO and speed.

## Calculators (v1 — Finance)

Compound Interest · SIP · CAGR · Loan (EMI) · Amortization · Mortgage · APY ·
Simple Interest · Retirement · Savings Goal · Loan Payoff · Stock Average

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export of all routes
npm run typecheck
```

## Add a calculator

See [`EXTENDING.md`](./EXTENDING.md). Short version: add one file in
`lib/calculators/definitions/`, register it in `registry.ts`, done.

## Design system

Calm, editorial-finance aesthetic — warm off-white surfaces, a restrained deep-teal
accent, tabular numerals for money, and muted professional chart colours. All tokens are
CSS variables with dark-mode hooks already in place. No neon gradients, no dashboard look.

> Educational and estimation tool only — not financial advice.
