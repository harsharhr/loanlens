import type { CalculatorConfig } from "../types";

export const stockAverage: CalculatorConfig = {
  id: "stock-average",
  slug: "stock-average",
  title: "Stock Average Calculator",
  tagline: "Find your average buy price after adding to a position.",
  intro:
    "Bought a stock twice at different prices? This calculator blends both purchases into a single average cost per share, so you know your true break-even and can decide whether averaging down (or up) makes sense.",
  category: "personal-finance",
  featured: false,
  keywords: ["stock average calculator", "average price", "cost basis", "averaging down", "share average"],
  inputs: [
    { name: "qty1", label: "First buy — quantity", kind: "number", defaultValue: 100, min: 0, max: 10000000, step: 1, slider: true },
    { name: "price1", label: "First buy — price / share", kind: "currency", defaultValue: 500, min: 0.01, max: 1000000, step: 1, slider: true },
    { name: "qty2", label: "Second buy — quantity", kind: "number", defaultValue: 150, min: 0, max: 10000000, step: 1, slider: true },
    { name: "price2", label: "Second buy — price / share", kind: "currency", defaultValue: 400, min: 0.01, max: 1000000, step: 1, slider: true },
  ],
  compute: (v) => {
    const { qty1, price1, qty2, price2 } = v;
    const totalQty = qty1 + qty2;
    const totalCost = qty1 * price1 + qty2 * price2;
    const avg = totalQty > 0 ? totalCost / totalQty : 0;
    const firstAvg = price1;
    const change = firstAvg > 0 ? ((avg - firstAvg) / firstAvg) * 100 : 0;

    return {
      metrics: [
        { label: "Average price / share", value: avg, format: "currency", primary: true, tone: "brand" },
        { label: "Total shares", value: totalQty, format: "number", tone: "neutral" },
        { label: "Total invested", value: totalCost, format: "currency", tone: "neutral" },
        { label: "Change vs. first buy", value: change, format: "percent", tone: change <= 0 ? "success" : "warning" },
      ],
      interpretation: totalQty <= 0
        ? `Enter at least one purchase to compute an average.`
        : `Your blended cost is ${avg.toFixed(2)} per share across ${totalQty.toLocaleString("en-IN")} shares. ${change < 0 ? `Averaging down pulled your cost basis ${Math.abs(change).toFixed(1)}% below your first buy, lowering your break-even.` : change > 0 ? `Averaging up raised your cost basis ${change.toFixed(1)}% above your first buy.` : `Both purchases were at the same price.`}`,
      chart: {
        type: "bar",
        title: "Amount invested per purchase",
        data: [
          { x: "First buy", value: Math.round(qty1 * price1) },
          { x: "Second buy", value: Math.round(qty2 * price2) },
        ],
        xKey: "x",
        valueFormat: "currency",
        series: [{ key: "value", label: "Invested", color: "--chart-1" }],
      },
    };
  },
  formula: {
    heading: "The weighted average formula",
    expression: "Average = (Q₁·P₁ + Q₂·P₂) / (Q₁ + Q₂)",
    body: "Your average cost is total money spent divided by total shares held. It's weighted by quantity, so a larger purchase pulls the average toward its price.",
    variables: [
      { symbol: "Q₁, Q₂", meaning: "shares bought in each purchase" },
      { symbol: "P₁, P₂", meaning: "price per share in each purchase" },
    ],
  },
  explanation: [
    "Your average price — also called cost basis — is the break-even the stock must reclear before you're in profit. Adding shares at a different price moves that break-even toward the new purchase, weighted by how many shares you buy.",
    "Averaging down (buying more after a fall) lowers your break-even and can turn a smaller recovery into a profit — but only makes sense if your original thesis still holds. Throwing good money after bad is the classic trap.",
    "Averaging up (buying more after a rise) raises your cost basis but lets you add to a winner. Either way, knowing your true average is the starting point for any sell or hold decision.",
  ],
  examples: [
    { title: "Averaging down", scenario: "100 shares at ₹500, then 150 at ₹400.", result: "Average ₹440 — below your first buy, so the stock needs to recover less to break even." },
    { title: "Equal weight", scenario: "100 at ₹500 and 100 at ₹400.", result: "Average is exactly ₹450, the midpoint, because quantities are equal." },
    { title: "Averaging up", scenario: "200 at ₹300, then 50 at ₹600.", result: "Average ₹360 — the smaller high-priced lot nudges the basis up only modestly." },
  ],
  faq: [
    { q: "What is a stock's average price?", a: "It's the quantity-weighted average of everything you paid — your total cost divided by total shares. It marks your break-even." },
    { q: "Is averaging down a good idea?", a: "Only if your reasons for owning the stock still hold. It lowers your break-even, but adding to a declining position you no longer believe in increases risk." },
    { q: "Does this include brokerage or taxes?", a: "No. For a precise cost basis, add any brokerage, fees and taxes to each purchase amount." },
    { q: "Can I average more than two buys?", a: "The same formula extends to any number of purchases — sum all cost, divide by all shares. This tool covers the common two-lot case." },
    { q: "How does the average affect my taxes?", a: "Your cost basis determines your capital gain or loss when you sell. Tax rules on averaging vs. specific-lot accounting vary by jurisdiction." },
  ],
  related: ["cagr", "compound-interest", "sip", "simple-interest"],
};
