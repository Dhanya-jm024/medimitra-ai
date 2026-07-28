"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Heart, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import { analyzeSkinConditionWithGemini } from "@/lib/gemini";

export default function SkinAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    suspectedCondition: string;
    severity: "MILD" | "MODERATE" | "SEVERE";
    description: string;
    firstAidSteps: string[];
    seekUrgentCare: boolean;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Str = reader.result as string;
        setSelectedImage(base64Str);
        runAnalysis(base64Str.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async (base64Data: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeSkinConditionWithGemini(base64Data);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleScan = () => {
    const sampleImg = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    setSelectedImage("https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=60");
    runAnalysis(sampleImg);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-4 h-4 text-emerald-300" />
            <span>Gemini 2.0 Vision Dermatological Triage</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">AI Skin & Wound Assessment</h1>
          <p className="text-sm sm:text-base text-teal-100 mt-2 font-medium">
            Upload or capture a clear photo of skin rashes, allergic irritation, or superficial cuts for AI assessment.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-center space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />

        {selectedImage ? (
          <div className="relative max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-teal-500 shadow-md">
            <img src={selectedImage} alt="Skin condition sample" className="w-full h-48 object-cover" />
            <button
              onClick={() => {
                setSelectedImage(null);
                setResult(null);
              }}
              className="absolute top-2 right-2 bg-slate-950/70 text-white text-xs px-2 py-1 rounded-md"
            >
              Retake Image
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 rounded-2xl p-8 cursor-pointer transition-colors space-y-3 bg-slate-50 dark:bg-slate-950/50"
          >
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                Capture Rash or Wound Photo
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ensure good lighting and clear focus for accurate AI vision classification.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={sampleScan}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Try Sample Demo Scan</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Running Dermatological Classification with Gemini 2.0 Vision...
          </p>
        </div>
      )}

      {/* Result Card */}
      {result && !isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-teal-500/40 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">
                Suspected Skin Condition
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50 mt-1">
                {result.suspectedCondition}
              </h2>
            </div>
            <div className={`px-4 py-2 rounded-xl text-xs font-bold ${
              result.severity === "MILD" 
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
            }`}>
              Severity Level: {result.severity}
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {result.description}
          </p>

          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 space-y-2">
            <h3 className="text-xs font-bold uppercase text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>Recommended First Aid Care</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {result.firstAidSteps.map((step, i) => (
                <li key={i}>• {step}</li>
              ))}
            </ul>
          </div>

          <div className="text-[11px] text-slate-400 italic border-t border-slate-100 dark:border-slate-800 pt-3">
            Disclaimer: Visual AI triage is for preliminary awareness only and does not replace in-person doctor consultation.
          </div>
        </div>
      )}
    </div>
  );
}
