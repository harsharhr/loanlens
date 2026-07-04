# Adding a new calculator

The platform is **data-driven**: a calculator is a config object, not a page. The
registry powers routing, navigation, search, related links, the sitemap, and SEO.
Adding one is mostly writing a single file.

## Checklist

1. **Create the definition** — `lib/calculators/definitions/<slug>.ts`, exporting a
   `CalculatorConfig`. Use an existing file (e.g. `compound-interest.ts`) as a template.
   Fill in:
   - `id`, `slug` (URL segment), `title`, `tagline`, `intro`
   - `category` (one of the ids in `registry.ts` `CATEGORIES`)
   - `keywords` (drives local search)
   - `inputs` — each an `InputField`; set `slider`, `options`, `prefix`/`suffix`, `hint`
   - `compute(values, ctx)` — a **pure** function returning `metrics`, `interpretation`,
     and optionally a `chart` and/or `table`. Compose the helpers in
     `lib/calculators/utils.ts` (never re-implement money math inline).
   - `formula`, `explanation`, `examples`, `faq`, `related`

2. **Register it** — import the config in `lib/calculators/registry.ts` and add it to
   the `CALCULATORS` array. That's the only wiring step.

3. **Verify** — run `npm run build`. The new URL `/finance/<slug>` is statically
   generated, appears in the sitemap, the nav mega-menu, search, and any calculator
   that lists it in `related`.

## Design rules

- **No new page code.** If you find yourself writing JSX for a calculator, stop — the
  shared template in `app/finance/[slug]/page.tsx` renders everything from the config.
- **Formatting is centralised.** Return raw numbers with a `ValueFormat`; the UI formats
  them (currency symbol, tabular numerals, locale) via `formatters.ts`.
- **New categories** go in `CATEGORIES` in `registry.ts` plus the `CalculatorCategory`
  union in `types.ts`.
- **New chart types or input kinds** are the only changes that touch components
  (`chart-panel.tsx`, `input-field.tsx`). Everything else stays config.

## Adding a whole new vertical (e.g. tax, health)

The same engine generalises. Introduce a top-level route group (e.g. `app/health/`),
reuse the registry pattern with a category set for that vertical, and the calculator
template, search, cards and SEO all work unchanged.
