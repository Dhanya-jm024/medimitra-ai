"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, Sun, Moon, Volume2, Type } from "lucide-react";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check dark mode
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFontSizeChange = (size: "sm" | "md" | "lg" | "xl") => {
    setFontSize(size);
    document.documentElement.classList.remove("font-scale-sm", "font-scale-md", "font-scale-lg", "font-scale-xl");
    document.documentElement.classList.add(`font-scale-${size}`);
  };

  const toggleHighContrast = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    if (next) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  };

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors"
        aria-label="Accessibility Options"
        title="Accessibility Settings"
      >
        <Eye className="w-4 h-4 text-teal-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accessibility Tools</span>
            <Eye className="w-4 h-4 text-emerald-500" />
          </div>

          {/* Text Size */}
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
              <Type className="w-3.5 h-3.5 text-blue-500" />
              <span>Text Size (Elderly Friendly)</span>
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`py-1 text-xs rounded font-bold border transition-colors ${
                    fontSize === size
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">High Contrast (WCAG AAA)</span>
            <button
              onClick={toggleHighContrast}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                isHighContrast ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isHighContrast ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              {isDarkMode ? <Moon className="w-3.5 h-3.5 text-purple-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>Dark Theme</span>
            </span>
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                isDarkMode ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isDarkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
