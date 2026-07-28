"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const healthTrendsData = [
  { day: "Mon", heartRate: 72, temp: 98.4, bp: 120 },
  { day: "Tue", heartRate: 75, temp: 98.6, bp: 122 },
  { day: "Wed", heartRate: 71, temp: 98.2, bp: 118 },
  { day: "Thu", heartRate: 78, temp: 99.1, bp: 125 },
  { day: "Fri", heartRate: 73, temp: 98.5, bp: 120 },
  { day: "Sat", heartRate: 74, temp: 98.6, bp: 121 },
  { day: "Sun", heartRate: 72, temp: 98.4, bp: 119 },
];

export default function HealthChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 w-full flex items-center justify-center text-xs text-slate-400">
        Loading chart analytics...
      </div>
    );
  }

  return (
    <div className="h-64 w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={healthTrendsData}>
          <defs>
            <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} domain={[60, 90]} />
          <Tooltip />
          <Area type="monotone" dataKey="heartRate" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorHeart)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
