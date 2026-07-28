"use client";

import { Mic, MicOff, Volume2 } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import { useEffect } from "react";

interface VoiceInputProps {
  onTranscriptChange: (text: string) => void;
  language?: string;
  placeholder?: string;
}

export function VoiceInput({ onTranscriptChange, language = "en" }: VoiceInputProps) {
  const { isListening, transcript, isSupported, startListening, stopListening } = useVoice(language);

  useEffect(() => {
    if (transcript) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  if (!isSupported) {
    return (
      <span className="text-[10px] text-slate-400 italic">
        (Voice input requires Chrome, Edge, or Safari)
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`p-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-md ${
          isListening
            ? "bg-red-500 text-white animate-pulse shadow-red-500/40"
            : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 hover:scale-105"
        }`}
        title={isListening ? "Listening... Click to stop" : "Click to speak symptoms"}
        aria-label="Toggle Voice Input"
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5" />
            <span className="text-xs uppercase tracking-wide">Listening...</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span className="text-xs font-semibold">Speak Voice Input</span>
          </>
        )}
      </button>

      {isListening && (
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-4 bg-red-500 rounded-full animate-pulse" />
          <span className="w-1.5 h-6 bg-red-500 rounded-full animate-pulse delay-100" />
          <span className="w-1.5 h-3 bg-red-500 rounded-full animate-pulse delay-200" />
        </div>
      )}
    </div>
  );
}
