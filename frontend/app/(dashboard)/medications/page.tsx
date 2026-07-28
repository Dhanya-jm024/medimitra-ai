"use client";

import { useState } from "react";
import { Pill, Clock, Plus, CheckCircle2, AlertCircle } from "lucide-react";

export default function MedicationsPage() {
  const [meds, setMeds] = useState([
    {
      id: "1",
      name: "Paracetamol 500mg",
      dosage: "1 tablet (500mg)",
      frequency: "Twice daily after meals",
      time: "8:00 AM & 8:00 PM",
      takenToday: true,
    },
    {
      id: "2",
      name: "Multivitamin Active",
      dosage: "1 capsule",
      frequency: "Once daily",
      time: "1:00 PM",
      takenToday: false,
    },
    {
      id: "3",
      name: "Amoxicillin 250mg",
      dosage: "1 capsule",
      frequency: "Thrice daily",
      time: "9:00 AM, 2:00 PM, 9:00 PM",
      takenToday: false,
    },
  ]);

  const toggleMed = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, takenToday: !m.takenToday } : m))
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
            Smart Pill Reminder Engine
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mt-1">Medication Tracker</h1>
          <p className="text-sm text-blue-100 mt-1">
            Automated notifications, dose tracking, and drug-drug safety alerts.
          </p>
        </div>

        <button
          onClick={() => alert("Add new medication prompt.")}
          className="px-5 py-3 bg-white text-blue-900 font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md flex items-center gap-2 hover:bg-blue-50 shrink-0"
        >
          <Plus className="w-4 h-4 text-blue-600" />
          <span>Add Medication</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800 pb-3">
          Daily Medication Schedule
        </h2>

        <div className="space-y-3">
          {meds.map((med) => (
            <div
              key={med.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                med.takenToday
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${med.takenToday ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}`}>
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{med.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{med.dosage}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-500" />
                      <span>{med.time}</span>
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleMed(med.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5 ${
                  med.takenToday
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{med.takenToday ? "Dose Taken" : "Mark as Taken"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
