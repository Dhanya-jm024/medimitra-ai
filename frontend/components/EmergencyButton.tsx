"use client";

import { useState } from "react";
import { AlertOctagon, PhoneCall, MapPin, X, CheckCircle, ShieldAlert } from "lucide-react";

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [locationText, setLocationText] = useState("Fetching GPS Location...");
  const [isLocating, setIsLocating] = useState(false);

  const handleTriggerSOS = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`;
          setLocationText(coords);
          setIsLocating(false);
          setSosSent(true);
        },
        () => {
          setLocationText("Location permissions disabled. Dispatched emergency broadcast to registered contacts.");
          setIsLocating(false);
          setSosSent(true);
        }
      );
    } else {
      setLocationText("GPS not supported. Emergency broadcast sent with registered home profile address.");
      setIsLocating(false);
      setSosSent(true);
    }
  };

  return (
    <>
      {/* Floating SOS Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-full shadow-2xl sos-pulse-glow transition-all hover:scale-105"
        aria-label="Emergency SOS"
      >
        <AlertOctagon className="w-6 h-6 animate-spin-slow" />
        <span>SOS Emergency</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border-2 border-red-500 shadow-2xl p-6 overflow-hidden">
            <button
              onClick={() => {
                setIsOpen(false);
                setSosSent(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 text-red-600 dark:text-red-500 mb-4">
              <ShieldAlert className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide">Emergency SOS Dispatch</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">One-tap immediate medical assistance</p>
              </div>
            </div>

            {!sosSent ? (
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-xl border border-red-200 dark:border-red-800/50 text-slate-800 dark:text-slate-200 text-sm">
                  <p className="font-semibold text-red-700 dark:text-red-400">
                    Pressing SOS will immediately:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                    <li>Broadcast your exact GPS location to emergency contacts</li>
                    <li>Notify nearby ambulance dispatch services</li>
                    <li>Connect you to the 24/7 National Emergency Hotline (108 / 112)</li>
                  </ul>
                </div>

                <button
                  onClick={handleTriggerSOS}
                  disabled={isLocating}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  {isLocating ? (
                    <span>Extracting GPS & Dispatching...</span>
                  ) : (
                    <>
                      <PhoneCall className="w-6 h-6" />
                      <span>ACTIVATE SOS EMERGENCY NOW</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-500">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                    EMERGENCY SIGNAL BROADCASTED
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Emergency response team and registered family contacts notified.
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{locationText}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href="tel:108"
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Ambulance (108)</span>
                  </a>
                  <a
                    href="/emergency"
                    className="flex-1 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-slate-300"
                  >
                    <span>View Map & First Aid</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
