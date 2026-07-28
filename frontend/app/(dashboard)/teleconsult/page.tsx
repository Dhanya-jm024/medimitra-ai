"use client";

import { useState } from "react";
import { Video, Mic, MicOff, VideoOff, MessageSquare, PhoneOff, UserCheck, Sparkles, FileText } from "lucide-react";

export default function TeleconsultPage() {
  const [inCall, setInCall] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Video className="w-4 h-4 text-purple-300" />
              <span>Realtime Tele-Health Consultations</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">Doctor Teleconsultation Room</h1>
            <p className="text-sm text-purple-100 mt-1">
              Connect to certified physicians with real-time AI live language translation & consultation transcript.
            </p>
          </div>

          {!inCall ? (
            <button
              onClick={() => setInCall(true)}
              className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center gap-2 shrink-0"
            >
              <Video className="w-5 h-5" />
              <span>Join Consultation Room</span>
            </button>
          ) : (
            <button
              onClick={() => setInCall(false)}
              className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center gap-2 shrink-0"
            >
              <PhoneOff className="w-5 h-5" />
              <span>End Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Video Call Screen or Booking Queue */}
      {!inCall ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Dr. Rajesh Sharma, MD</h3>
            <p className="text-xs text-slate-500">General Physician • 15+ Yrs Experience</p>
            <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg text-center">
              Available Now for Video Consultation
            </div>
            <button
              onClick={() => setInCall(true)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Connect Call Now
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Dr. Ananya Reddy, MBBS</h3>
            <p className="text-xs text-slate-500">Pediatrician & Family Health Specialist</p>
            <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg text-center">
              Next Available: 10 mins
            </div>
            <button
              onClick={() => setInCall(true)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Book Slot
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Dr. S. K. Murthy, MD</h3>
            <p className="text-xs text-slate-500">Dermatologist & Skin Care Specialist</p>
            <div className="text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/40 p-2 rounded-lg text-center">
              Scheduled Appointment
            </div>
            <button
              onClick={() => setInCall(true)}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Enter Waiting Room
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
            {/* Doctor Video Screen */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80"
                alt="Doctor Teleconsult"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 px-3 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Dr. Rajesh Sharma (Live HD)</span>
              </div>
            </div>

            {/* AI Assistant Live Transcript Screen */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Realtime AI Translator & Notes Companion</span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-200">
                    <strong className="text-emerald-400">Doctor:</strong> "Hello, I can see your symptom log for fever and headache over the last 2 days."
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-200">
                    <strong className="text-blue-400">You (Translated from Kannada):</strong> "Yes Doctor, body temperature was around 100.4°F this morning."
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                    <strong className="text-amber-300">AI Summary:</strong> Prescription note generated: Paracetamol 500mg, stay hydrated, follow up in 48h.
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Consultation transcript saved to Health Records.")}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Save Live Call Transcript</span>
              </button>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4 border-t border-slate-800 pt-4">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-4 rounded-full font-bold transition-all ${
                micMuted ? "bg-red-600 text-white" : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {micMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setVideoOff(!videoOff)}
              className={`p-4 rounded-full font-bold transition-all ${
                videoOff ? "bg-red-600 text-white" : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {videoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setInCall(false)}
              className="p-4 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-600/30"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
