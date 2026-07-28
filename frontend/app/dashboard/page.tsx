"use client";

import { HealthCard } from "@/components/HealthCard";
import HealthChart from "@/components/HealthChart";
import Link from "next/link";
import { 
  Activity, 
  Pill, 
  Heart, 
  Calendar, 
  Clock, 
  Plus, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
            Welcome back to MediMitra AI
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Personal Health Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            All your health vitals, AI triage logs, and medication schedules in one place.
          </p>
        </div>

        <Link
          href="/symptom-checker"
          className="px-5 py-3 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-transform active:scale-95 shadow-md flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>New Symptom Check</span>
        </Link>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthCard
          title="Heart Rate"
          value="72"
          unit="bpm"
          status="NORMAL"
          iconName="heart"
          trend="Resting heart rate stable"
        />
        <HealthCard
          title="Blood Pressure"
          value="120/80"
          unit="mmHg"
          status="NORMAL"
          iconName="activity"
          trend="Optimal blood pressure"
        />
        <HealthCard
          title="Body Temperature"
          value="98.6"
          unit="°F"
          status="NORMAL"
          iconName="thermometer"
          trend="Normal body temp"
        />
        <HealthCard
          title="Blood Oxygen (SpO2)"
          value="99%"
          unit="SpO2"
          status="NORMAL"
          iconName="droplet"
          trend="Oxygen saturation normal"
        />
      </div>

      {/* Analytics Graph & Medication Reminder Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Vitals Trend Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                Weekly Heart Rate Trend
              </h2>
              <p className="text-xs text-slate-500">7-day continuous monitoring data</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
              Stable
            </span>
          </div>

          <HealthChart />
        </div>

        {/* Medication Schedule Checklist */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-500" />
              <h2 className="text-base font-black text-slate-900 dark:text-slate-50">
                Today's Medications
              </h2>
            </div>
            <Link href="/medications" className="text-xs text-blue-500 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Paracetamol 500mg
                </span>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-blue-500" />
                  <span>8:00 AM • After Breakfast</span>
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Multivitamin Complex
                </span>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>1:00 PM • After Lunch</span>
                </p>
              </div>
              <span className="px-2 py-1 bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 text-[10px] font-bold rounded-md">
                Pending
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Omega-3 Fish Oil
                </span>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>8:00 PM • After Dinner</span>
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
