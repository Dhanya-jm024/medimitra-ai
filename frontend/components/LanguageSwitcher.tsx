"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { languageNames, LanguageCode } from "@/lib/translations";

export function LanguageSwitcher() {
  const { currentLang, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-emerald-500 transition-colors"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-emerald-500" />
        <span>{languageNames[currentLang]?.nativeName || "English"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 py-1 overflow-hidden">
          {(Object.keys(languageNames) as LanguageCode[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                changeLanguage(lang);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-200"
            >
              <div>
                <span className="font-semibold">{languageNames[lang].nativeName}</span>
                <span className="ml-2 text-[10px] text-slate-400">({languageNames[lang].name})</span>
              </div>
              {currentLang === lang && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
