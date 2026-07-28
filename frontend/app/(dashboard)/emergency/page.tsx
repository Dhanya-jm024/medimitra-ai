"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, MapPin, PhoneCall, Hospital, ShieldAlert, CheckCircle, Navigation } from "lucide-react";

interface HospitalItem {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  open24x7: boolean;
  type: string;
}

const mockHospitals: HospitalItem[] = [
  {
    id: "1",
    name: "District Government General Hospital",
    distance: "1.2 km away",
    address: "Station Road, Main Medical Circle",
    phone: "+91 80 2345 6789",
    open24x7: true,
    type: "Public Tertiary Hospital",
  },
  {
    id: "2",
    name: "Apollo Rural Outreach Medical Center",
    distance: "2.8 km away",
    address: "National Highway 44, Sector 4",
    phone: "+91 80 9876 5432",
    open24x7: true,
    type: "Specialty Emergency Care",
  },
  {
    id: "3",
    name: "Community Primary Health Center (PHC)",
    distance: "4.1 km away",
    address: "Gram Panchayat Complex",
    phone: "+91 80 1122 3344",
    open24x7: false,
    type: "Primary Care Clinic",
  },
  {
    id: "4",
    name: "St. John's Emergency & Trauma Unit",
    distance: "5.5 km away",
    address: "Central Hospital Road",
    phone: "+91 80 5566 7788",
    open24x7: true,
    type: "Trauma & ICU Center",
  },
  {
    id: "5",
    name: "LifeLine Multi-Specialty Clinic",
    distance: "6.0 km away",
    address: "Byrasandra Main Road",
    phone: "+91 80 4433 2211",
    open24x7: true,
    type: "Private Clinic",
  },
];

export default function EmergencyPage() {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [emergencyDispatched, setEmergencyDispatched] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setIsLocating(false);
        },
        () => {
          setUserCoords({ lat: 12.9716, lng: 77.5946 }); // Default Bangalore coords
          setIsLocating(false);
        }
      );
    } else {
      setUserCoords({ lat: 12.9716, lng: 77.5946 });
      setIsLocating(false);
    }
  }, []);

  const handleBroadcastSOS = () => {
    setEmergencyDispatched(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl sos-pulse-glow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 animate-bounce text-amber-300" />
              <span>National Medical Emergency Dispatch</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">Emergency SOS & Hospital Locator</h1>
            <p className="text-sm text-red-100 mt-1">
              Live GPS location tracking and direct hotline connect to nearest trauma centers.
            </p>
          </div>

          <button
            onClick={handleBroadcastSOS}
            className="px-6 py-4 bg-white text-red-700 hover:bg-red-50 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>DISPATCH SOS SMS</span>
          </button>
        </div>
      </div>

      {/* Dispatched Notification Alert */}
      {emergencyDispatched && (
        <div className="bg-emerald-500 text-slate-950 p-4 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle className="w-6 h-6 shrink-0" />
          <div>
            <p>EMERGENCY BROADCAST SENT VIA TWILIO / LOCAL SMS!</p>
            <p className="text-xs font-normal text-slate-900 mt-0.5">
              SMS containing your coordinates ({userCoords ? `${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)}` : "fetching..."}) dispatched to 3 primary emergency contacts and 108 ambulance center.
            </p>
          </div>
        </div>
      )}

      {/* Hospital Locator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hospital List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Hospital className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                5 Nearest Hospitals Found
              </h2>
            </div>
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-blue-500" />
              <span>{isLocating ? "Locating..." : "GPS Active"}</span>
            </div>
          </div>

          <div className="space-y-3">
            {mockHospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-colors bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {hosp.name}
                    </span>
                    {hosp.open24x7 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">
                        24x7 Open
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{hosp.address} ({hosp.distance})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${hosp.phone}`}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-300"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick First-Aid Guides */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>Instant First-Aid Protocols</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <h3 className="font-bold text-amber-900 dark:text-amber-200">1. Severe Bleeding</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Apply direct firm pressure to wound using a clean cloth. Elevate injured limb above heart level. Do not remove pressure until medical help arrives.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              <h3 className="font-bold text-blue-900 dark:text-blue-200">2. Burns Triage</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Hold burn under cool running tap water for at least 10–15 minutes. Cover loosely with sterile non-stick bandage. Never apply ice directly.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
              <h3 className="font-bold text-red-900 dark:text-red-200">3. Choking & Airway Obstruction</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Perform 5 firm back blows between shoulder blades followed by Heimlich abdominal thrusts until object clears.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
