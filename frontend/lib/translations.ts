import en from "../locales/en.json";
import hi from "../locales/hi.json";
import kn from "../locales/kn.json";
import ta from "../locales/ta.json";
import te from "../locales/te.json";

export type LanguageCode = "en" | "hi" | "kn" | "ta" | "te";

export const translations: Record<LanguageCode, Record<string, string>> = {
  en,
  hi,
  kn,
  ta,
  te,
};

export const languageNames: Record<LanguageCode, { name: string; nativeName: string }> = {
  en: { name: "English", nativeName: "English" },
  hi: { name: "Hindi", nativeName: "हिन्दी" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ" },
  ta: { name: "Tamil", nativeName: "தமிழ்" },
  te: { name: "Telugu", nativeName: "తెలుగు" },
};
