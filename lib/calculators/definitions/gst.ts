import type { CalculatorConfig } from "../types";

export const gst: CalculatorConfig = {
  id: "gst",
  slug: "gst",
  title: "GST Calculator",
  tagline: "Calculate GST amounts and find the total or base price of goods and services.",
  intro:
    "Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. This calculator helps you easily add GST to a base price, or remove GST from a total price to find the original amount.",
  category: "tax",
  featured: true,
  keywords: ["gst calculator", "add gst", "remove gst", "cgst sgst igst", "india gst"],
  inputs: [
    { name: "amount", label: "Amount (₹)", kind: "currency", defaultValue: 10000, min: 1, max: 100000000, step: 100 },
    { 
      name: "rate", 
      label: "GST Rate (%)", 
      kind: "percent", 
      defaultValue: 18,
      options: [
        { label: "0%", value: 0 },
        { label: "5%", value: 5 },
        { label: "12%", value: 12 },
        { label: "18%", value: 18 },
        { label: "28%", value: 28 },
      ]
    },
    {
      name: "operation",
      label: "Action",
      kind: "number",
      defaultValue: 1,
      options: [
        { label: "Add GST", value: 1 },
        { label: "Remove GST", value: -1 },
      ]
    }
  ],
  author: {
    name: "RupeeSense Editorial",
    role: "Tax Experts",
  },
  lastUpdated: new Date().toISOString().split('T')[0],
  methodology: "Standard percentage addition/subtraction. The calculator splits the GST amount equally into CGST (Central) and SGST (State) for intra-state transactions.",
  compute: (v) => {
    const { amount, rate, operation } = v;

    let baseAmount = 0;
    let gstAmount = 0;
    let finalAmount = 0;

    if (operation === 1) { // Add GST
      baseAmount = amount;
      gstAmount = amount * (rate / 100);
      finalAmount = amount + gstAmount;
    } else { // Remove GST
      finalAmount = amount;
      baseAmount = amount / (1 + (rate / 100));
      gstAmount = amount - baseAmount;
    }

    const halfGst = gstAmount / 2;

    return {
      metrics: [
        { label: "Base Amount", value: baseAmount, format: "currency", tone: "neutral" },
        { label: "Total GST Amount", value: gstAmount, format: "currency", tone: "warning" },
        { label: "Net Final Price", value: finalAmount, format: "currency", primary: true, tone: "brand" },
      ],
      interpretation: `At a GST rate of ${rate}%, the total GST is ${Math.round(gstAmount).toLocaleString("en-IN")}. If this is an intra-state transaction (within the same state), this will be billed as CGST: ${Math.round(halfGst).toLocaleString("en-IN")} and SGST: ${Math.round(halfGst).toLocaleString("en-IN")}. If it's an inter-state transaction, it will be billed as IGST: ${Math.round(gstAmount).toLocaleString("en-IN")}.`,
    };
  },
  formula: {
    heading: "GST Calculation Formulas",
    expression: "To Add GST: GST Amount = (Base x Rate) / 100\nTo Remove GST: Base = Total / (1 + (Rate / 100))",
    body: "When adding GST, the tax is simply a percentage of the base price. When removing GST from a final price, you cannot simply subtract the percentage; you must divide by 1 plus the rate to find the original base.",
    variables: [
      { symbol: "Base", meaning: "The original price of the good/service before tax" },
      { symbol: "Rate", meaning: "The applicable GST slab (e.g., 5, 12, 18, 28)" },
      { symbol: "Total", meaning: "The final price inclusive of tax" },
    ],
  },
  explanation: [
    "Goods and Services Tax (GST) is a comprehensive, multi-stage, destination-based tax that is levied on every value addition in India.",
    "The GST system is divided into three parts: CGST (Central GST), SGST (State GST), and IGST (Integrated GST). For a transaction within the same state (intra-state), CGST and SGST are levied equally. For a transaction across state borders (inter-state), IGST is levied.",
    "The standard GST rates in India are 5%, 12%, 18%, and 28%. Some essential goods are exempt (0%)."
  ],
  examples: [
    { title: "Adding 18% GST", scenario: "You are billing a client ₹50,000 for consulting services.", result: "GST is 18% of 50,000 = ₹9,000. Total Invoice Amount = ₹59,000." },
    { title: "Removing 18% GST", scenario: "You bought a laptop for ₹80,000 (MRP, inclusive of taxes).", result: "The Base Price is 80,000 / 1.18 = ₹67,796. The GST component is ₹12,204." },
  ],
  faq: [
    { q: "What is the difference between CGST and SGST?", a: "CGST goes to the Central Government, while SGST goes to the State Government. When you buy goods locally, the total GST is split equally between the two." },
    { q: "When should I charge IGST?", a: "IGST (Integrated GST) is charged when there is movement of goods or services from one state to another. The entire amount goes to the Central Government initially." },
  ],
  related: ["income-tax", "salary"],
};
