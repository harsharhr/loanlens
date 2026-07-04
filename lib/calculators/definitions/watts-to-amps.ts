import type { CalculatorConfig } from "../types";

export const wattsToAmps: CalculatorConfig = {
  id: "watts-to-amps",
  slug: "watts-to-amps",
  title: "Watts to Amps Calculator",
  tagline: "Easily convert electrical power (Watts) to current (Amps).",
  intro: "This tool helps you calculate the electrical current in Amperes based on the power consumption in Watts and the voltage.",
  category: "featured-units",
  keywords: ["watts to amps", "convert watts to amps", "W to A", "power to current", "amps calculation"],
  inputs: [
    { name: "input", label: "Power in Watts (W)", kind: "unit", defaultValue: 1200, min: 0, max: 100000, step: 1 },
    { name: "volts", label: "Voltage (V)", kind: "unit", defaultValue: 120, min: 1, max: 10000, step: 1 }
  ],
  compute: (values) => {
    const watts = values.input || 0;
    const volts = values.volts || 1; // avoid division by zero
    const amps = watts / volts;

    return {
      metrics: [
        { label: "Current", value: Number(amps.toFixed(2)), format: "number", primary: true, note: "Amps (A)" }
      ],
      interpretation: `${watts} Watts at ${volts} Volts draws a current of ${amps.toFixed(2)} Amps.`
    };
  },
  formula: {
    heading: "The Current Formula",
    expression: "A = W ÷ V",
    body: "To convert Watts to Amps, divide the power in Watts by the voltage in Volts. This formula strictly applies to DC circuits and simple resistive AC circuits.",
    variables: [
      { symbol: "A", meaning: "Current in Amperes" },
      { symbol: "W", meaning: "Power in Watts" },
      { symbol: "V", meaning: "Voltage in Volts" }
    ]
  },
  explanation: [
    "Amps (Amperes) measure the flow of electrical current, whereas Watts measure the total power consumed.",
    "Since power is the product of current and voltage, you can calculate the current (Amps) by dividing the total power (Watts) by the electrical pressure (Volts)."
  ],
  examples: [
    { title: "Hair Dryer Current", scenario: "Calculate the current drawn by a 1500W hair dryer on a 120V circuit.", result: "1500 W ÷ 120 V = 12.5 Amps" },
    { title: "Server Power Supply", scenario: "Calculate the current for a 800W power supply on a 240V circuit.", result: "800 W ÷ 240 V = 3.33 Amps" }
  ],
  faq: [
    { q: "Can I find Amps if I only know Watts?", a: "No, the conversion requires you to know the circuit voltage. Different regions and devices use different voltages (e.g., 120V or 230V)." },
    { q: "How many Amps is 1000 Watts?", a: "At 120V, 1000W is about 8.33 Amps. At 240V, it is about 4.17 Amps." }
  ],
  related: ["amps-to-watts", "lumens-to-watts"]
};
