import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ActivityChart({ data = [], height = 180, color = "#22d3ee" }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            width={24}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(7,11,18,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 11,
              color: "#fff",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill="url(#actGrad)"
            animationDuration={900}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}