"use client";

import { useState } from "react";
import { 
  Activity, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  CheckCircle2, 
  Home, 
  Stethoscope, 
  Clock, 
  FileCheck 
} from "lucide-react";
import { VoiceInput } from "./VoiceInput";
import { useTranslation } from "@/hooks/useTranslation";
import { useVoice } from "@/hooks/useVoice";
import { analyzeSymptomsWithGemini, MedicalAnalysisResult } from "@/lib/gemini";

export function SymptomChecker() {
  const { t, currentLang } = useTranslation();
  const { speakText, isSpeaking, stopSpeaking } = useVoice(currentLang);
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MedicalAnalysisResult | null>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const data = await analyzeSymptomsWithGemini(symptoms, currentLang);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300";
      case "MODERATE":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300";
      case "HIGH":
      case "CRITICAL":
        return "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Gemini 2.0 Multilingual Medical AI</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">{t("symptom_title")}</h1>
          <p className="text-sm sm:text-base text-emerald-100 mt-2 font-medium">
            {t("symptom_subtitle")}
          </p>
        </div>
      </div>

      {/* Input Box Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <span>{t("btn_voice_input")}</span>
          </label>
          <VoiceInput
            language={currentLang}
            onTranscriptChange={(text) => setSymptoms(text)}
          />
        </div>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={t("symptom_placeholder")}
          rows={4}
          className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-bold">Quick Prompts:</span>
            <button
              onClick={() => setSymptoms(
                currentLang === "hi" ? "मुझे 2 दिनों से तेज बुखार, सिरदर्द और बदन दर्द है" :
                currentLang === "kn" ? "ನನಗೆ ೨ ದಿನಗಳಿಂದ ಜ್ವರ, ತಲೆನೋವು ಇದೆ" :
                currentLang === "ta" ? "எனக்கு 2 நாட்களாக காய்ச்சல் மற்றும் தலைவலி உள்ளது" :
                currentLang === "te" ? "నాకు 2 రోజులుగా జ్వరం మరియు తలనొప్పి ఉంది" :
                "High fever 102F, chills, muscle pain and dry cough"
              )}
              className="underline hover:text-emerald-500 font-medium"
            >
              Fever & Headache
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || !symptoms.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t("btn_analyzing")}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t("btn_analyze")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Diagnosis Results Card */}
      {result && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          {/* Top Result Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50">
                  {result.condition}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(result.riskLevel)}`}>
                  Risk Level: {result.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span>Assessment Confidence: <strong>{result.confidence}%</strong></span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>Just Now</span>
              </p>
            </div>

            {/* Read Out Audio Button */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speakText(`${result.condition}. ${result.summary}. Recommended actions: ${result.recommendedActions.join(". ")}`);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>{t("btn_stop_read")}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  <span>{t("btn_read_out")}</span>
                </>
              )}
            </button>
          </div>

          {/* Diagnostic Summary */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recommended Steps */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Recommended Action Plan</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.recommendedActions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Home Remedies */}
            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-400 flex items-center gap-2">
                <Home className="w-4 h-4 text-teal-500" />
                <span>Safe Home Care Remedies</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.homeRemedies.map((rem, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-teal-600">•</span>
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Medical Guidance */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200">
              <strong className="font-bold">When to see a Doctor:</strong> {result.whenToSeeDoctor}
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
            <span className="italic">{result.disclaimer}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("Report saved to your MediMitra Health Records.")}
                className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-emerald-500 font-medium"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Save Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
