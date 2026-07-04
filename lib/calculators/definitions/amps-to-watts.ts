import type { CalculatorConfig } from "../types";

export const ampsToWatts: CalculatorConfig = {
  id: "amps-to-watts",
  slug: "amps-to-watts",
  title: "Amps to Watts Calculator",
  tagline: "Easily convert electrical current (Amps) to power (Watts).",
  intro: "This tool helps you calculate the power consumption in Watts based on the electrical current in Amperes and the voltage.",
  category: "featured-units",
  keywords: ["amps to watts", "amperes to watts", "electrical power calculation", "convert amps to watts", "A to W"],
  inputs: [
    { name: "input", label: "Current in Amps (A)", kind: "unit", defaultValue: 10, min: 0, max: 10000, step: 0.1 },
    { name: "volts", label: "Voltage (V)", kind: "unit", defaultValue: 120, min: 0, max: 10000, step: 1 }
  ],
  compute: (values) => {
    const amps = values.input || 0;
    const volts = values.volts || 0;
    const watts = amps * volts;

    return {
      metrics: [
        { label: "Power", value: watts, format: "number", primary: true, note: "Watts (W)" }
      ],
      interpretation: `${amps} Amps at ${volts} Volts produces ${watts} Watts of power.`
    };
  },
  formula: {
    heading: "The Power Formula (DC or Single-Phase AC)",
    expression: "W = A × V",
    body: "To convert Amps to Watts, multiply the current in Amperes by the voltage in Volts. This formula applies to DC circuits and resistive single-phase AC circuits.",
    variables: [
      { symbol: "W", meaning: "Power in Watts" },
      { symbol: "A", meaning: "Current in Amperes" },
      { symbol: "V", meaning: "Voltage in Volts" }
    ]
  },
  explanation: [
    "Watts measure the rate of real power consumption, while Amps measure the electrical current flowing through a circuit.",
    "Because power (Watts) depends on both the flow rate of electrons (Amps) and the electrical pressure pushing them (Volts), you cannot convert Amps to Watts without knowing the Voltage.",
    "For standard household electronics in North America, the voltage is typically 120V. In many other parts of the world, it is 230V."
  ],
  examples: [
    { title: "Standard Household Appliance", scenario: "Calculate the wattage of a device drawing 5 Amps on a 120V circuit.", result: "5 A × 120 V = 600 Watts" },
    { title: "Car Battery Device", scenario: "Calculate the power of an accessory drawing 2 Amps on a 12V DC system.", result: "2 A × 12 V = 24 Watts" }
  ],
  faq: [
    { q: "Can I convert Amps to Watts without knowing the voltage?", a: "No, you must know the voltage. Amps measure current and Watts measure total power, which is the product of both current and voltage." },
    { q: "How many Watts is 15 Amps?", a: "It depends on the voltage. At 120 Volts, 15 Amps is 1800 Watts (15 × 120). At 240 Volts, it is 3600 Watts." }
  ],
  related: ["watts-to-amps", "lumens-to-watts"]
};
