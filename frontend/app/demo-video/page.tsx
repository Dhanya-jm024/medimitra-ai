"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Download, Volume2, Mic, ShieldAlert, Sparkles, CheckCircle, Hospital, MapPin, Globe } from "lucide-react";

interface Scene {
  id: number;
  duration: number; // in seconds
  title: string;
  subtitle: string;
  narration: string;
  hindiVoiceSnippet?: string;
  badge: string;
  bgColor: string;
}

const scenes: Scene[] = [
  {
    id: 1,
    duration: 10,
    title: "1 : 10,000 Doctor-to-Patient Ratio",
    subtitle: "In rural India, 700 million people lack immediate healthcare access. When chest pain or fever strikes at midnight, help isn't minutes away... it's hours away.",
    narration: "In rural India today, 700 million people live in places where there is only one doctor for every 10,000 human beings. When fever strikes or chest pain begins at midnight, help isn't minutes away... it's hours away.",
    badge: "THE RURAL HEALTHCARE CRISIS",
    bgColor: "from-slate-950 via-red-950 to-slate-950",
  },
  {
    id: 2,
    duration: 10,
    title: "Language Illiteracy & Remote Dead Zones",
    subtitle: "70% of preventable conditions turn severe simply because patients cannot understand English medical jargon or access online hospitals.",
    narration: "Language barriers, medical illiteracy, and remote network dead zones mean preventable conditions turn fatal simply because people couldn't understand a prescription or get immediate triage.",
    badge: "THE ACCESSIBILITY GAP",
    bgColor: "from-slate-950 via-amber-950 to-slate-950",
  },
  {
    id: 3,
    duration: 15,
    title: "MediMitra AI: Your AI Health Companion",
    subtitle: "Speaks your mother tongue, understands your symptoms, scans your medicines, and works 100% offline.",
    narration: "Introducing MediMitra AI — Your AI Health Companion. It speaks your mother tongue, understands your medical symptoms, scans your medicines, and works 100 percent offline.",
    badge: "THE FLAGSHIP SOLUTION",
    bgColor: "from-slate-950 via-emerald-950 to-slate-900",
  },
  {
    id: 4,
    duration: 25,
    title: "Live Demo: Multilingual Voice Triage",
    subtitle: "User speaks in Hindi: 'मुझे 2 दिनों से तेज बुखार और सिरदर्द है'. Gemini 2.0 returns 93% triage confidence with voice readout.",
    narration: "Watch this. A user in rural Mandya doesn't need to read English. They simply tap one button and speak in their native dialect: मुझे 2 दिनों से तेज बुखार और सिरदर्द है. In under 2 seconds, Google Gemini 2.0 analyzes symptoms, calculates a 93 percent confidence, prescribes safe home care, and reads the diagnosis out loud in Hindi!",
    hindiVoiceSnippet: "मुझे 2 दिनों से तेज बुखार और सिरदर्द है।",
    badge: "VOICE STT & TTS IN 10+ INDIC LANGUAGES",
    bgColor: "from-slate-900 via-teal-950 to-slate-900",
  },
  {
    id: 5,
    duration: 20,
    title: "Pill Vision OCR & openFDA Safety Checks",
    subtitle: "Snap a photo of any medicine strip to extract active ingredients, dosages, and cross-check dangerous drug interactions.",
    narration: "Elderly patients often struggle to read small pill packages. With MediMitra Vision AI, one camera photo extracts the active compound, strength, and checks for dangerous drug interactions using openFDA data.",
    badge: "MULTIMODAL GEMINI VISION AI",
    bgColor: "from-slate-900 via-blue-950 to-slate-900",
  },
  {
    id: 6,
    duration: 20,
    title: "Global GPS Radar & Emergency SOS",
    subtitle: "Real-time satellite GPS tracking with live address resolution and 1-tap dispatch to nearest trauma centers.",
    narration: "In extreme emergencies, tapping the persistent Red SOS button instantly broadcasts GPS coordinates via SMS to family members and locates the nearest trauma centers with 1-tap phone dialing.",
    badge: "HIGH-PRECISION SATELLITE TELEMETRY",
    bgColor: "from-slate-950 via-red-950 to-slate-900",
  },
  {
    id: 7,
    duration: 10,
    title: "Inclusive Accessibility (WCAG AAA)",
    subtitle: "Dynamic font scaling (A- / A / A+) and High Contrast mode built for elderly eyes and low-literacy users.",
    narration: "And with WCAG AAA High Contrast mode and dynamic font scaling, MediMitra AI is tailored for elderly eyes.",
    badge: "UNIVERSAL ELDERLY & ACCESSIBILITY DESIGN",
    bgColor: "from-slate-900 via-indigo-950 to-slate-900",
  },
  {
    id: 8,
    duration: 10,
    title: "MediMitra AI — Universal Healthcare for All",
    subtitle: "Live Demo: dhanya-medimitra.vercel.app • CodeStorm 2026 #2 Submission",
    narration: "MediMitra AI: Universal, inclusive healthcare in the palm of every hand. Try the live demo now at dhanya-medimitra.vercel.app. Thank you!",
    badge: "CODESTORM 2026 FLAGSHIP SUBMISSION",
    bgColor: "from-slate-950 via-emerald-950 to-slate-950",
  },
];

export default function DemoVideoPage() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const activeScene = scenes[currentSceneIdx];

  // AI Speech Synthesis Narration
  const speakNarration = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (next >= activeScene.duration) {
            if (currentSceneIdx < scenes.length - 1) {
              const nextIdx = currentSceneIdx + 1;
              setCurrentSceneIdx(nextIdx);
              speakNarration(scenes[nextIdx].narration);
              return 0;
            } else {
              setIsPlaying(false);
              return activeScene.duration;
            }
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSceneIdx, activeScene]);

  const handlePlay = () => {
    setIsPlaying(true);
    speakNarration(activeScene.narration);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentSceneIdx(0);
    setElapsed(0);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between p-4 sm:p-8">
      {/* Top Controls Bar */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide flex items-center gap-2">
              <span>MediMitra AI Pitch Video Presenter</span>
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                Live 2-Min Presentation
              </span>
            </h1>
            <p className="text-xs text-slate-400">Automated AI Speech Voiceover & Timed Scene Walkthrough</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Presentation</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause AI Presentation</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
            title="Reset Scene 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Video Presentation Stage */}
      <div className="max-w-6xl mx-auto w-full my-6 flex-1 flex flex-col justify-center">
        <div
          className={`w-full min-h-[420px] sm:min-h-[500px] rounded-3xl p-8 sm:p-12 bg-gradient-to-br ${activeScene.bgColor} border-2 border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-700`}
        >
          {/* Top Badge & Timer */}
          <div className="flex items-center justify-between gap-4 z-10">
            <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-black uppercase tracking-widest text-emerald-400 shadow-lg">
              {activeScene.badge}
            </span>

            <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
              <span>Scene {activeScene.id} / {scenes.length}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-emerald-400 font-bold">{elapsed}s / {activeScene.duration}s</span>
            </div>
          </div>

          {/* Central Title & Subtitle Visual */}
          <div className="my-auto space-y-4 z-10 max-w-4xl animate-fadeIn">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {activeScene.title}
            </h2>
            <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed">
              {activeScene.subtitle}
            </p>

            {/* Feature Demo Mockup Display inside Scene 4 & 5 */}
            {activeScene.id === 4 && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-xs font-mono text-emerald-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Voice Audio Input Received: "मुझे 2 दिनों से तेज बुखार और सिरदर्द है"</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                  <p className="font-bold text-amber-400">Gemini 2.0 Triage: 93% Confidence</p>
                  <p className="mt-1">Primary Condition: मौसमी वायरल बुखार / फ्लू (Seasonal Influenza)</p>
                  <p className="text-emerald-400 mt-1">✓ Audio Readout Active in Hindi</p>
                </div>
              </div>
            )}

            {activeScene.id === 6 && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-red-500/40 text-xs font-mono text-red-300 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400 animate-bounce" />
                  <span>Satellite GPS Telemetry: Lat 12.9716° N, Lon 77.5946° E (Accuracy ±8m)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 flex items-center justify-between">
                  <span>Nearest Hospital: District Trauma Center (1.1 km away)</span>
                  <span className="px-2 py-0.5 bg-red-600 text-white rounded font-bold text-[10px]">SOS DISPATCHED</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Narration Teleprompter Bar */}
          <div className="z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3 shadow-lg">
            <Volume2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="font-black text-emerald-400 uppercase tracking-wider block text-[10px]">AI Voice Narration Script:</span>
              <p className="italic font-serif leading-relaxed mt-0.5">"{activeScene.narration}"</p>
            </div>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>

      {/* Bottom Scene Timeline Thumbnails */}
      <div className="max-w-6xl mx-auto w-full bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {scenes.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setCurrentSceneIdx(idx);
                setElapsed(0);
                speakNarration(sc.narration);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                idx === currentSceneIdx
                  ? "border-emerald-500 bg-emerald-500/20 text-white shadow-md scale-105"
                  : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
              }`}
            >
              <span className="block text-[10px] font-black text-emerald-400">SCENE 0{sc.id}</span>
              <span className="block text-[11px] font-bold truncate mt-0.5">{sc.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
