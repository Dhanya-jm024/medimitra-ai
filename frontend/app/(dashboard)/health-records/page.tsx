"use client";

import { FileText, Download, Calendar, Activity, Pill, Plus } from "lucide-react";

export default function HealthRecordsPage() {
  const records = [
    {
      id: "REC-2026-001",
      title: "Voice AI Symptom Triage Assessment",
      date: "July 28, 2026",
      type: "AI Diagnostic Log",
      condition: "Seasonal Viral Influenza",
      status: "Verified",
    },
    {
      id: "REC-2026-002",
      title: "Medicine Pill Packaging Scan Log",
      date: "July 26, 2026",
      type: "Vision OCR",
      condition: "Paracetamol 500mg (Dolo 650)",
      status: "Verified",
    },
    {
      id: "REC-2026-003",
      title: "Doctor Teleconsultation Transcript",
      date: "July 20, 2026",
      type: "Doctor Prescriptions",
      condition: "Upper Respiratory Consultation",
      status: "Doctor Signed",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-200">
            Encrypted Medical Storage
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mt-1">Personal Health Records</h1>
          <p className="text-sm text-amber-100 mt-1">
            Offline PWA cached health reports, AI triage history, and official prescriptions.
          </p>
        </div>

        <button
          onClick={() => alert("Upload report functionality ready.")}
          className="px-5 py-3 bg-white text-amber-900 font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md flex items-center gap-2 hover:bg-amber-50 shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-600" />
          <span>Upload Lab Report</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800 pb-3">
          Saved Diagnostic Records ({records.length})
        </h2>

        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-colors bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {rec.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">
                    {rec.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-3">
                  <span>ID: {rec.id}</span>
                  <span>•</span>
                  <span>{rec.condition}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-500" />
                    <span>{rec.date}</span>
                  </span>
                </p>
              </div>

              <button
                onClick={() => alert(`Downloading record ${rec.id} as PDF...`)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-300 shrink-0"
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span>Export PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
