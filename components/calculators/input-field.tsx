"use client";

import type { InputField as FieldDef } from "@/lib/calculators/types";

interface Props {
  field: FieldDef;
  value: any;
  error?: string;
  currencySymbol: string;
  onChange: (name: string, value: any) => void;
}

/**
 * Renders one calculator input. Chooses the control from the field definition:
 * a segmented control / dropdown for `options`, otherwise a prefixed/suffixed
 * number input with an optional range slider beneath it.
 */
export function InputFieldControl({ field, value, error, currencySymbol, onChange }: Props) {
  const prefix = field.prefix ?? (field.kind === "currency" ? currencySymbol : undefined);
  const suffix = field.suffix ?? (field.kind === "percent" ? "%" : undefined);
  const id = `field-${field.name}`;

  // Option control (frequency / period selectors)
  if (field.options) {
    const useSegmented = field.options.length <= 4;
    return (
      <div>
        <label htmlFor={id} className="field-label">
          {field.label}
        </label>
        {useSegmented ? (
          <div className="segmented w-full" role="group" aria-label={field.label}>
            {field.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={value === opt.value}
                className="flex-1"
                onClick={() => onChange(field.name, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="input-wrap">
            <select
              id={id}
              className="input-el bg-transparent cursor-pointer"
              value={value}
              onChange={(e) => onChange(field.name, Number(e.target.value))}
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {field.hint && <p className="field-hint">{field.hint}</p>}
      </div>
    );
  }

  if (field.kind === "date") {
    return (
      <div>
        <label htmlFor={id} className="field-label">
          {field.label}
        </label>
        <div className={`input-wrap ${error ? "has-error" : ""}`}>
          <input
            id={id}
            className="input-el bg-transparent"
            type="date"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={field.hint ? `${id}-hint` : undefined}
          />
        </div>
        {error ? (
          <p className="field-error">{error}</p>
        ) : (
          field.hint && (
            <p id={`${id}-hint`} className="field-hint">
              {field.hint}
            </p>
          )
        )}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {field.label}
      </label>
      <div className={`input-wrap ${error ? "has-error" : ""}`}>
        {prefix && <span className="input-affix">{prefix}</span>}
        <input
          id={id}
          className="input-el num"
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={field.min}
          max={field.max}
          step={field.step ?? "any"}
          onChange={(e) => onChange(field.name, e.target.value === "" ? NaN : Number(e.target.value))}
          aria-invalid={Boolean(error)}
          aria-describedby={field.hint ? `${id}-hint` : undefined}
        />
        {suffix && <span className="input-affix" style={{ background: "transparent" }}>{suffix}</span>}
      </div>

      {field.slider && field.min !== undefined && field.max !== undefined && (
        <input
          type="range"
          className="mt-2.5"
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          value={Number.isFinite(value) ? Math.min(Math.max(value, field.min), field.max) : field.min}
          onChange={(e) => onChange(field.name, Number(e.target.value))}
          aria-label={`${field.label} slider`}
        />
      )}

      {error ? (
        <p className="field-error">{error}</p>
      ) : (
        field.hint && (
          <p id={`${id}-hint`} className="field-hint">
            {field.hint}
          </p>
        )
      )}
    </div>
  );
}
