"use client";

import Link from "next/link";
import { 
  Stethoscope, 
  Activity, 
  Pill, 
  Heart, 
  AlertTriangle, 
  Volume2, 
  Globe, 
  WifiOff, 
  ArrowRight,
  Sparkles,
  Users
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white p-8 sm:p-14 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t("hero_badge")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              {t("hero_title_1")} <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">{t("hero_title_2")}</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t("hero_desc")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/symptom-checker"
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Activity className="w-5 h-5" />
                <span>{t("hero_cta_symptom")}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>

              <Link
                href="/emergency"
                className="px-6 py-4 rounded-2xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-base border border-red-500/50 shadow-xl transition-all flex items-center gap-2"
              >
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                <span>{t("hero_cta_sos")}</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">1:10,000</div>
                <div className="text-slate-400 font-medium">{t("metric_doctor")}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-teal-400">10+</div>
                <div className="text-slate-400 font-medium">{t("metric_languages")}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-blue-400">100%</div>
                <div className="text-slate-400 font-medium">{t("metric_offline")}</div>
              </div>
            </div>
          </div>

          {/* Interactive Feature Demo Card preview */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400">GEMINI-2.0-FLASH • REALTIME</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-bold text-slate-300">Spoken Voice Symptom Input:</span>
                    <p className="text-xs text-slate-400 italic mt-0.5">
                      "मुझे पिछले दो दिनों से तेज सिरदर्द और बुखार है..." (Hindi)
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span>AI Suspected Triage: Acute Influenza</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">94% Confidence</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Recommended rest, warm fluids, temperature log, and standard dosage paracetamol if needed.
                  </p>
                </div>
              </div>

              <Link
                href="/symptom-checker"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t("btn_try_now")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-50">
            {t("problem_title")}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {t("problem_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t("prob_1_title")}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("prob_1_desc")}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t("prob_2_title")}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("prob_2_desc")}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t("prob_3_title")}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("prob_3_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Complete Feature Showcase */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {t("suite_badge")}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 mt-1">
            {t("suite_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/symptom-checker"
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-emerald-500 transition-all hover:shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-50 group-hover:text-emerald-500 transition-colors">
              {t("nav_symptom_checker")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("suite_symptom_desc")}
            </p>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-2">
              <span>{t("nav_symptom_checker")}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/medicine-scanner"
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-blue-500 transition-all hover:shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-50 group-hover:text-blue-500 transition-colors">
              {t("nav_medicine_scanner")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("suite_medicine_desc")}
            </p>
            <div className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-2">
              <span>{t("btn_scan_medicine")}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/skin-analysis"
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-teal-500 transition-all hover:shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-50 group-hover:text-teal-500 transition-colors">
              {t("nav_skin_analysis")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("suite_skin_desc")}
            </p>
            <div className="text-xs font-bold text-teal-600 flex items-center gap-1 pt-2">
              <span>{t("nav_skin_analysis")}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/emergency"
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-red-500 transition-all hover:shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-50 group-hover:text-red-500 transition-colors">
              {t("nav_emergency")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("suite_emergency_desc")}
            </p>
            <div className="text-xs font-bold text-red-600 flex items-center gap-1 pt-2">
              <span>{t("nav_emergency")}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
