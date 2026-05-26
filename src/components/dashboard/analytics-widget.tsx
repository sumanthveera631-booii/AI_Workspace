"use client";
import { memo, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import WidgetCard from "./widget-card";
import { TrendingUp, RefreshCw } from "lucide-react";

interface DataPoint {
  name: string;
  users: number;
  apiCalls: number;
}

const initialData: DataPoint[] = [
  { name: "09:00", users: 120, apiCalls: 320 },
  { name: "10:00", users: 180, apiCalls: 450 },
  { name: "11:00", users: 160, apiCalls: 410 },
  { name: "12:00", users: 290, apiCalls: 680 },
  { name: "13:00", users: 240, apiCalls: 590 },
  { name: "14:00", users: 310, apiCalls: 750 },
  { name: "15:00", users: 420, apiCalls: 910 },
];

function AnalyticsWidget() {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<DataPoint[]>(initialData);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setChartData((prev) => {
        const next = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].name;
        const [hours, minutes] = lastTime.split(":").map(Number);
        
        let newMinutes = minutes + 10;
        let newHours = hours;
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours = (hours + 1) % 24;
        }
        const newTime = `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
        
        // Random drift
        const lastUsers = prev[prev.length - 1].users;
        const lastApiCalls = prev[prev.length - 1].apiCalls;
        const driftUsers = Math.max(80, Math.min(600, lastUsers + Math.floor(Math.random() * 80) - 35));
        const driftApiCalls = Math.max(200, Math.min(1500, lastApiCalls + Math.floor(Math.random() * 180) - 80));

        return [...next, { name: newTime, users: driftUsers, apiCalls: driftApiCalls }];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <WidgetCard title="Real-Time Analytics">
      <div className="flex h-full flex-col">
        {/* HEADER CONTROLS */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <TrendingUp size={14} className="animate-pulse" />
              +14.8% Active
            </span>
          </div>

          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-medium transition-all ${
              isSimulating
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                : "bg-white/5 text-white/50 border border-white/10"
            }`}
          >
            <RefreshCw size={10} className={isSimulating ? "animate-spin" : ""} />
            {isSimulating ? "Live Streaming" : "Simulate"}
          </button>
        </div>

        {/* CHART AREA */}
        <div className="h-[210px] w-full flex-1">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradientUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradientApiCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />

                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(11, 17, 32, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(12px)",
                  }}
                  itemStyle={{ fontSize: "12px", color: "#F9FAFB" }}
                  labelStyle={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}
                />

                <Area
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#00E5FF"
                  strokeWidth={2}
                  fill="url(#gradientUsers)"
                  isAnimationActive={false}
                />

                <Area
                  type="monotone"
                  dataKey="apiCalls"
                  name="API Calls"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  fill="url(#gradientApiCalls)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </WidgetCard>
  );
}
export default memo(AnalyticsWidget);