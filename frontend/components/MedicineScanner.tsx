"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Pill, AlertOctagon, CheckCircle2, Sparkles, FileText } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { analyzeMedicineImageWithGemini } from "@/lib/gemini";

export function MedicineScanner() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    medicineName: string;
    dosage: string;
    activeIngredients: string[];
    uses: string[];
    sideEffects: string[];
    warnings: string;
    confidence: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Str = reader.result as string;
        setSelectedImage(base64Str);
        runScanner(base64Str.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const runScanner = async (base64Data: string) => {
    setIsLoading(true);
    setData(null);
    try {
      const result = await analyzeMedicineImageWithGemini(base64Data);
      setData(result);
    } catch (err) {
      console.error("Scanner failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerSampleScan = () => {
    const sampleImg = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    setSelectedImage("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60");
    runScanner(sampleImg);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Pill className="w-4 h-4 text-cyan-300" />
            <span>AI Prescription & Pill Recognition</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">{t("medicine_scanner_title")}</h1>
          <p className="text-sm sm:text-base text-blue-100 mt-2 font-medium">
            {t("medicine_scanner_subtitle")}
          </p>
        </div>
      </div>

      {/* Upload area */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-center space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />

        {selectedImage ? (
          <div className="relative max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md">
            <img src={selectedImage} alt="Medicine preview" className="w-full h-48 object-cover" />
            <button
              onClick={() => {
                setSelectedImage(null);
                setData(null);
              }}
              className="absolute top-2 right-2 bg-slate-950/70 text-white text-xs px-2 py-1 rounded-md"
            >
              Change Image
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-8 cursor-pointer transition-colors space-y-3 bg-slate-50 dark:bg-slate-950/50"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                {t("btn_scan_medicine")}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Supports pill packaging, prescription receipts, and syrup bottles.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>{t("btn_upload_image")}</span>
          </button>

          <button
            onClick={triggerSampleScan}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t("btn_sample_scan")}</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Analyzing Medicine Packaging with Gemini 2.0 Vision & openFDA Database...
          </p>
        </div>
      )}

      {/* Scan Results */}
      {data && !isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-500/40 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                Verified Pill Identification ({data.confidence}% Confidence)
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50 mt-1">
                {data.medicineName}
              </h2>
            </div>
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300">
              Dosage: {data.dosage}
            </div>
          </div>

          {/* Active Ingredients & Uses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Active Compounds</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.activeIngredients.map((ing, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-xs font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
              <h3 className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Medical Indications / Uses</span>
              </h3>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {data.uses.map((u, i) => (
                  <li key={i}>• {u}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contraindications Warning */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase text-amber-800 dark:text-amber-300">
                Warnings & Drug Safety
              </h4>
              <p className="text-xs text-amber-900 dark:text-amber-200 mt-1">
                {data.warnings}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
