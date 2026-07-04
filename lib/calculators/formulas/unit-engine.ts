import type { CalculatorOutput, ComputeContext } from "../types";

/**
 * Creates a standard unit conversion compute function.
 * @param fromUnit Label for the input unit (e.g. "Centimeters")
 * @param toUnit Label for the output unit (e.g. "Feet")
 * @param factor Multiplication factor to get from input to output
 * @param interpretationTemplate String template, use {in} and {out}
 */
export function createStandardConversion(
  fromUnit: string,
  toUnit: string,
  factor: number,
  interpretationTemplate: string
) {
  return (v: Record<string, number>, ctx: ComputeContext): CalculatorOutput => {
    const input = v.input || 0;
    const result = input * factor;
    
    return {
      metrics: [
        { label: toUnit, value: result, format: "unit", primary: true, tone: "brand" }
      ],
      interpretation: interpretationTemplate
        .replace("{in}", `${input.toLocaleString(ctx.locale)} ${fromUnit.toLowerCase()}`)
        .replace("{out}", `${result.toLocaleString(ctx.locale, { maximumFractionDigits: 4 })} ${toUnit.toLowerCase()}`)
    };
  };
}

/**
 * Creates a density-based conversion (e.g., Gallons to Pounds).
 */
export function createDensityConversion(
  fromUnit: string,
  toUnit: string,
  defaultDensityFactor: number,
  interpretationTemplate: string
) {
  return (v: Record<string, number>, ctx: ComputeContext): CalculatorOutput => {
    const input = v.input || 0;
    const density = v.density || defaultDensityFactor;
    const result = input * density;

    return {
      metrics: [
        { label: toUnit, value: result, format: "unit", primary: true, tone: "brand" }
      ],
      interpretation: interpretationTemplate
        .replace("{in}", `${input.toLocaleString(ctx.locale)} ${fromUnit.toLowerCase()}`)
        .replace("{out}", `${result.toLocaleString(ctx.locale, { maximumFractionDigits: 4 })} ${toUnit.toLowerCase()}`)
    };
  };
}

/**
 * Creates an area-to-volume conversion (requires depth).
 */
export function createAreaToVolumeConversion(
  fromAreaUnit: string,
  depthUnit: string,
  toVolumeUnit: string,
  calcFn: (area: number, depth: number) => number,
  interpretationTemplate: string
) {
  return (v: Record<string, number>, ctx: ComputeContext): CalculatorOutput => {
    const area = v.area || 0;
    const depth = v.depth || 0;
    const result = calcFn(area, depth);

    return {
      metrics: [
        { label: toVolumeUnit, value: result, format: "unit", primary: true, tone: "brand" }
      ],
      interpretation: interpretationTemplate
        .replace("{area}", `${area.toLocaleString(ctx.locale)} ${fromAreaUnit.toLowerCase()}`)
        .replace("{depth}", `${depth.toLocaleString(ctx.locale)} ${depthUnit.toLowerCase()}`)
        .replace("{out}", `${result.toLocaleString(ctx.locale, { maximumFractionDigits: 4 })} ${toVolumeUnit.toLowerCase()}`)
    };
  };
}

/**
 * Creates a compound split output conversion (e.g. kg to stone & lb).
 */
export function createCompoundConversion(
  fromUnit: string,
  primaryOut: string,
  secondaryOut: string,
  calcFn: (input: number) => { primary: number; secondary: number; decimal: number; decimalUnit: string },
  interpretationTemplate: string
) {
  return (v: Record<string, number>, ctx: ComputeContext): CalculatorOutput => {
    const input = v.input || 0;
    const { primary, secondary, decimal, decimalUnit } = calcFn(input);

    return {
      metrics: [
        { label: primaryOut, value: primary, format: "unit", primary: true, tone: "brand" },
        { label: secondaryOut, value: secondary, format: "unit", primary: true, tone: "brand" },
        { label: `Total in ${decimalUnit}`, value: decimal, format: "unit", tone: "neutral" }
      ],
      interpretation: interpretationTemplate
        .replace("{in}", `${input.toLocaleString(ctx.locale)} ${fromUnit.toLowerCase()}`)
        .replace("{primary}", `${primary.toLocaleString(ctx.locale)}`)
        .replace("{secondary}", `${secondary.toLocaleString(ctx.locale, { maximumFractionDigits: 2 })}`)
        .replace("{decimal}", `${decimal.toLocaleString(ctx.locale, { maximumFractionDigits: 2 })}`)
    };
  };
}
