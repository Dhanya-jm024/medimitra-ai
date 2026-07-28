import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { EmergencyButton } from "@/components/EmergencyButton";

export const metadata: Metadata = {
  title: "MediMitra AI — Multilingual Voice-First Health Companion",
  description:
    "AI-powered multilingual health companion providing voice symptom triage, medicine scanning, offline health records, and emergency SOS for underserved populations.",
  keywords: [
    "MediMitra AI",
    "Healthcare AI",
    "Multilingual Symptom Checker",
    "Gemini 2.0 Health",
    "Offline Medical PWA",
    "CodeStorm 2026",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 antialiased">
        <Navbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <EmergencyButton />

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-emerald-600">MediMitra AI</span>
              <span>• CodeStorm 2026 Flagship Submission</span>
            </div>
            <p>
              Built for rural healthcare accessibility & inclusive multilingual wellness.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
              <a href="/disclaimer" className="hover:underline">Medical Disclaimer</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
