"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Stethoscope, 
  Pill, 
  Activity, 
  AlertTriangle, 
  Video, 
  FileText, 
  Heart, 
  Menu, 
  X,
  Volume2,
  LayoutDashboard
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { useTranslation } from "@/hooks/useTranslation";
import { useOffline } from "@/hooks/useOffline";

export function Navbar() {
  const { t } = useTranslation();
  const { isOffline } = useOffline();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-sm">
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1 text-center flex items-center justify-center gap-2 shadow-inner">
          <Volume2 className="w-4 h-4 animate-bounce" />
          <span>Offline Mode Active — Local AI Triage & Saved Health Records ready</span>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col justify-center leading-tight">
              <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                MediMitra AI
              </span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 dark:text-slate-500">
                AI Health Companion
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Clean, No-Wrap, Well-Oriented) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap overflow-x-auto py-1">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/symptom-checker" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{t("nav_symptom_checker")}</span>
            </Link>
            <Link 
              href="/medicine-scanner" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Pill className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{t("nav_medicine_scanner")}</span>
            </Link>
            <Link 
              href="/skin-analysis" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Heart className="w-4 h-4 text-teal-500 shrink-0" />
              <span>{t("nav_skin_analysis")}</span>
            </Link>
            <Link 
              href="/emergency" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-bold"
            >
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse shrink-0" />
              <span>{t("nav_emergency")}</span>
            </Link>
            <Link 
              href="/teleconsult" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Video className="w-4 h-4 text-purple-500 shrink-0" />
              <span>{t("nav_teleconsult")}</span>
            </Link>
            <Link 
              href="/health-records" 
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{t("nav_health_records")}</span>
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <AccessibilityMenu />
            <LanguageSwitcher />
            
            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm"
          >
            <LayoutDashboard className="w-5 h-5 text-teal-500" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/symptom-checker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm"
          >
            <Activity className="w-5 h-5 text-emerald-500" />
            <span>{t("nav_symptom_checker")}</span>
          </Link>
          <Link
            href="/medicine-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm"
          >
            <Pill className="w-5 h-5 text-blue-500" />
            <span>{t("nav_medicine_scanner")}</span>
          </Link>
          <Link
            href="/skin-analysis"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm"
          >
            <Heart className="w-5 h-5 text-teal-500" />
            <span>{t("nav_skin_analysis")}</span>
          </Link>
          <Link
            href="/emergency"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-sm"
          >
            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
            <span>{t("nav_emergency")}</span>
          </Link>
          <Link
            href="/teleconsult"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm"
          >
            <Video className="w-5 h-5 text-purple-500" />
            <span>{t("nav_teleconsult")}</span>
          </Link>
          <Link
            href="/health-records"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm"
          >
            <FileText className="w-5 h-5 text-amber-500" />
            <span>{t("nav_health_records")}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
