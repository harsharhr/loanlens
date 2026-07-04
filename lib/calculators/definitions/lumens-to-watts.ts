import type { CalculatorConfig } from "../types";

export const lumensToWatts: CalculatorConfig = {
  id: "lumens-to-watts",
  slug: "lumens-to-watts",
  title: "Lumens to Watts Calculator",
  tagline: "Convert brightness (Lumens) to electrical power (Watts) based on bulb type.",
  intro: "This calculator helps you determine the power consumption (in Watts) needed to produce a specific amount of light (in Lumens), depending on the energy efficiency of the bulb.",
  category: "featured-units",
  subcategory: "energy",
  keywords: ["lumens to watts", "convert lumens to watts", "brightness to power", "light bulb wattage calculator", "lm to W"],
  inputs: [
    { name: "input", label: "Brightness (Lumens)", kind: "unit", defaultValue: 800, min: 0, max: 100000, step: 10 },
    { 
      name: "efficacy", 
      label: "Bulb Type (Luminous Efficacy)", 
      kind: "number", 
      defaultValue: 90, 
      options: [
        { label: "LED (~90 lm/W)", value: 90 },
        { label: "CFL (~60 lm/W)", value: 60 },
        { label: "Halogen (~20 lm/W)", value: 20 },
        { label: "Incandescent (~15 lm/W)", value: 15 }
      ]
    }
  ],
  compute: (values) => {
    const lumens = values.input || 0;
    const efficacy = values.efficacy || 90;
    const watts = lumens / efficacy;

    return {
      metrics: [
        { label: "Estimated Power", value: Number(watts.toFixed(2)), format: "number", primary: true, note: "Watts (W)" }
      ],
      interpretation: `A bulb producing ${lumens} Lumens with an efficacy of ${efficacy} lm/W requires approximately ${watts.toFixed(2)} Watts of power.`
    };
  },
  formula: {
    heading: "The Conversion Formula",
    expression: "W = lm ÷ (lm/W)",
    body: "To convert Lumens to Watts, divide the total Lumens by the luminous efficacy (Lumens per Watt) of the light source.",
    variables: [
      { symbol: "W", meaning: "Power in Watts" },
      { symbol: "lm", meaning: "Luminous flux in Lumens (brightness)" },
      { symbol: "lm/W", meaning: "Luminous efficacy (efficiency of the bulb)" }
    ]
  },
  explanation: [
    "Lumens measure the total amount of visible light emitted by a source. Watts measure the electrical power consumed.",
    "Because different types of bulbs have different efficiencies (known as luminous efficacy), there is no direct one-to-one conversion between Lumens and Watts without knowing the bulb type.",
    "For example, an LED bulb is much more efficient than an incandescent bulb, meaning it needs far fewer Watts to produce the same amount of Lumens."
  ],
  examples: [
    { title: "Standard LED Bulb", scenario: "Calculate the wattage for an 800-lumen LED bulb (90 lm/W).", result: "800 ÷ 90 ≈ 8.9 Watts" },
    { title: "Standard Incandescent Bulb", scenario: "Calculate the wattage for an 800-lumen incandescent bulb (15 lm/W).", result: "800 ÷ 15 ≈ 53.3 Watts" }
  ],
  faq: [
    { q: "Is 800 Lumens very bright?", a: "800 lumens is roughly equivalent to the light emitted by a traditional 60-watt incandescent bulb, making it suitable for general room lighting." },
    { q: "Why do LEDs use fewer Watts?", a: "LEDs have a higher luminous efficacy, converting a much larger percentage of electricity into visible light rather than wasting it as heat." }
  ],
  related: ["watts-to-amps", "amps-to-watts"]
};
