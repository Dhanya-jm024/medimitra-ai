"use client";

import { Activity, Heart, Droplets, Thermometer, TrendingUp } from "lucide-react";

interface HealthCardProps {
  title: string;
  value: string;
  unit: string;
  status: "NORMAL" | "ELEVATED" | "ATTENTION";
  iconName: "heart" | "droplet" | "activity" | "thermometer";
  trend: string;
}

export function HealthCard({ title, value, unit, status, iconName, trend }: HealthCardProps) {
  const getIcon = () => {
    switch (iconName) {
      case "heart":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "droplet":
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case "thermometer":
        return <Thermometer className="w-5 h-5 text-amber-500" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "NORMAL":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
      case "ELEVATED":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
      case "ATTENTION":
        return "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">{getIcon()}</div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge()}`}>
          {status}
        </span>
      </div>

      <div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{title}</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-black text-slate-900 dark:text-slate-50">{value}</span>
          <span className="text-xs font-semibold text-slate-500">{unit}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        <span>{trend}</span>
      </div>
    </div>
  );
}
