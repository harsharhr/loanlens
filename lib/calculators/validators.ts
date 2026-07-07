/**
 * Lightweight input validation driven off each field's own min/max declaration.
 * Kept dependency-free (Zod is available for richer schemas later) so the client
 * bundle stays tiny. Returns a map of fieldName -> message; empty means valid.
 */
import type { InputField } from "./types";

export type FieldErrors = Record<string, string>;

export function validateInputs(
  fields: InputField[],
  values: Record<string, any>,
): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of fields) {
    const v = values[field.name];
    if (v === undefined || v === null || Number.isNaN(v)) {
      if (!field.optional) errors[field.name] = "Enter a value";
      continue;
    }
    // Date and select fields carry string values — numeric range checks don't
    // apply. (Running Number.isFinite on them flagged every date calculator
    // as invalid, blanking their results.)
    if (field.kind === "date" || field.kind === "select") {
      if (v === "") {
        if (!field.optional) errors[field.name] = "Enter a value";
      } else if (field.kind === "date" && Number.isNaN(new Date(v).getTime())) {
        errors[field.name] = "Enter a valid date";
      }
      continue;
    }
    if (!Number.isFinite(v)) {
      errors[field.name] = "Enter a valid number";
      continue;
    }
    if (field.min !== undefined && v < field.min) {
      errors[field.name] = `Must be at least ${field.min}${field.kind === "percent" ? "%" : ""}`;
      continue;
    }
    if (field.max !== undefined && v > field.max) {
      errors[field.name] = `Must be ${field.max}${field.kind === "percent" ? "%" : ""} or less`;
      continue;
    }
  }
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Build the default values record from a field list. */
export function defaultValues(fields: InputField[]): Record<string, any> {
  return Object.fromEntries(fields.map((f) => [f.name, f.defaultValue]));
}
