"use client";

import { User, Phone, MapPin, Heart, Shield, Globe } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-2xl font-black shrink-0">
          RK
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
            Registered Health Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Ramesh Kumar</h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Age: 54 • Blood Group: O+ • Location: Mandya Rural, Karnataka
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800 pb-3">
          Emergency Contacts & Primary Medical Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>Primary Emergency Contact 1</span>
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Suresh Kumar (Son)</p>
            <p className="text-slate-500">+91 98765 43210</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-red-500" />
              <span>Secondary Emergency Contact 2</span>
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Sunitha Devi (Spouse)</p>
            <p className="text-slate-500">+91 98765 43211</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Known Chronic Conditions</span>
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Mild Hypertension, Dust Allergy</p>
            <p className="text-slate-500">Regularly monitored via MediMitra Tracker</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Preferred Dialect & Language</span>
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Kannada (ಕನ್ನಡ) & Hindi (हिन्दी)</p>
            <p className="text-slate-500">Voice-first STT/TTS auto-translation enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
