import type { CalculatorConfig } from "../types";

export const hertzToSeconds: CalculatorConfig = {
  id: "hertz-to-seconds",
  slug: "hertz-to-seconds",
  title: "Hertz to Seconds Calculator",
  tagline: "Easily convert frequency (Hertz) to period (Seconds).",
  intro: "This tool helps you calculate the time period of a single cycle in seconds based on a given frequency in Hertz (Hz).",
  category: "featured-units",
  keywords: ["hertz to seconds", "Hz to s", "frequency to period", "period calculator", "convert hertz to seconds"],
  inputs: [
    { name: "input", label: "Frequency in Hertz (Hz)", kind: "unit", defaultValue: 60, min: 0.000001, max: 1000000000, step: 1 }
  ],
  compute: (values) => {
    const hertz = values.input || 1; // avoid division by zero
    const seconds = 1 / hertz;
    
    // Format appropriately if it's very small
    const formattedSeconds = seconds < 0.0001 ? seconds.toExponential(4) : Number(seconds.toFixed(6));

    return {
      metrics: [
        { label: "Time Period", value: Number(formattedSeconds), format: "number", primary: true, note: "Seconds (s)" }
      ],
      interpretation: `A frequency of ${hertz} Hz corresponds to a period of ${formattedSeconds} seconds per cycle.`
    };
  },
  formula: {
    heading: "The Frequency-Period Formula",
    expression: "T = 1 ÷ f",
    body: "To convert a frequency in Hertz to a time period in seconds, take the reciprocal of the frequency. This means dividing 1 by the frequency in Hz.",
    variables: [
      { symbol: "T", meaning: "Time period in Seconds" },
      { symbol: "f", meaning: "Frequency in Hertz (Hz)" }
    ]
  },
  explanation: [
    "Hertz (Hz) is the unit of frequency, representing the number of cycles that occur per second.",
    "The period (measured in seconds) is the time it takes to complete exactly one full cycle.",
    "Frequency and period are inversely proportional. As frequency increases, the time period of each cycle decreases."
  ],
  examples: [
    { title: "Standard AC Power", scenario: "Calculate the period of a 60 Hz AC electrical signal.", result: "1 ÷ 60 = 0.016667 seconds" },
    { title: "Human Hearing Limit", scenario: "Calculate the period for a 20,000 Hz sound wave.", result: "1 ÷ 20,000 = 0.00005 seconds" }
  ],
  faq: [
    { q: "What does 1 Hertz mean?", a: "1 Hertz means one complete event or cycle happens exactly once per second. Therefore, its period is 1 second." },
    { q: "How do I convert milliseconds to Hertz?", a: "First, convert milliseconds to seconds by dividing by 1000. Then divide 1 by that number to get the frequency in Hertz." }
  ],
  related: []
};
