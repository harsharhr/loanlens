"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartSpec } from "@/lib/calculators/types";
import { formatValue } from "@/lib/calculators/formatters";

interface Props {
  chart: ChartSpec;
  currencySymbol: string;
  locale: string;
}

const PALETTE = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];

/** Compact axis labels: 12.5L, 3.2Cr, 1.4M — keeps the axis uncluttered. */
function compactTick(v: number, format: ChartSpec["valueFormat"], symbol: string) {
  if (format === "percent") return `${v}%`;
  if (format === "years" || format === "number" || format === "months") return `${v}`;
  const abs = Math.abs(v);
  if (abs >= 1e7) return `${symbol}${(v / 1e7).toFixed(1)}Cr`;
  if (abs >= 1e5) return `${symbol}${(v / 1e5).toFixed(1)}L`;
  if (abs >= 1e3) return `${symbol}${(v / 1e3).toFixed(0)}k`;
  return `${symbol}${v}`;
}

export default function ChartPanel({ chart, currencySymbol, locale }: Props) {
  const grid = "var(--chart-grid)";
  const axisStyle = { fontSize: 11, fill: "var(--text-muted)" };

  const tooltip = (
    <Tooltip
      contentStyle={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        fontSize: 12.5,
        boxShadow: "0 4px 16px rgba(15,23,42,0.1)",
      }}
      formatter={(value: number, name: string) => [
        formatValue(value, chart.valueFormat, currencySymbol, locale),
        name,
      ]}
    />
  );

  const legend = chart.series.length > 1 || chart.type === "donut"
    ? <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} iconType="circle" iconSize={9} />
    : null;

  return (
    <div className="card card-pad">
      <h3 className="text-base font-bold text-ink mb-3">{chart.title}</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          {chart.type === "area" ? (
            <AreaChart data={chart.data} margin={{ top: 6, right: 8, left: 4, bottom: 0 }}>
              <defs>
                {chart.series.map((s) => (
                  <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={`var(${s.color})`} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={`var(${s.color})`} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey={chart.xKey} tick={axisStyle} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis
                tick={axisStyle}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(v) => compactTick(v, chart.valueFormat, currencySymbol)}
              />
              {tooltip}
              {legend}
              {chart.series.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stackId={chart.series.length > 1 ? "1" : undefined}
                  stroke={`var(${s.color})`}
                  strokeWidth={2}
                  fill={`url(#grad-${s.key})`}
                />
              ))}
            </AreaChart>
          ) : chart.type === "bar" ? (
            <BarChart data={chart.data} margin={{ top: 6, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey={chart.xKey} tick={axisStyle} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis
                tick={axisStyle}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(v) => compactTick(v, chart.valueFormat, currencySymbol)}
              />
              {tooltip}
              {legend}
              {chart.series.map((s) => (
                <Bar key={s.key} dataKey={s.key} name={s.label} fill={`var(${s.color})`} radius={[4, 4, 0, 0]} maxBarSize={54} />
              ))}
            </BarChart>
          ) : chart.type === "line" ? (
            <LineChart data={chart.data} margin={{ top: 6, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey={chart.xKey} tick={axisStyle} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis
                tick={axisStyle}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(v) => compactTick(v, chart.valueFormat, currencySymbol)}
              />
              {tooltip}
              {legend}
              {chart.series.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={`var(${s.color})`}
                  strokeWidth={2.4}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={chart.data}
                dataKey={chart.series[0].key}
                nameKey={chart.xKey}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={2}
                stroke="var(--surface)"
                strokeWidth={2}
              >
                {chart.data.map((_, i) => (
                  <Cell key={i} fill={`var(${PALETTE[i % PALETTE.length]})`} />
                ))}
              </Pie>
              {tooltip}
              {legend}
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
