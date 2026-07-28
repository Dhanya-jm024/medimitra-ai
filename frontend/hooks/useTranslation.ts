"use client";

import { useState, useEffect, useCallback } from "react";
import { translations, LanguageCode } from "@/lib/translations";

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("medimitra_lang") as LanguageCode;
      if (saved && translations[saved]) {
        setCurrentLang(saved);
      }

      const handleLangChange = (e: CustomEvent<LanguageCode>) => {
        if (e.detail && translations[e.detail]) {
          setCurrentLang(e.detail);
        }
      };

      window.addEventListener("medimitra_lang_change" as any, handleLangChange);
      return () => {
        window.removeEventListener("medimitra_lang_change" as any, handleLangChange);
      };
    }
  }, []);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("medimitra_lang", lang);
      setCurrentLang(lang);
      window.dispatchEvent(new CustomEvent("medimitra_lang_change", { detail: lang }));
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[currentLang]?.[key] || translations["en"]?.[key] || key;
    },
    [currentLang]
  );

  return {
    t,
    currentLang,
    changeLanguage,
  };
}
