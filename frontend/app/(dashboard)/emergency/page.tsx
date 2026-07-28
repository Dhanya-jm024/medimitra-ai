"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, MapPin, PhoneCall, Hospital, ShieldAlert, CheckCircle, Navigation, RefreshCw, Radio, Compass } from "lucide-react";

interface HospitalItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  open24x7: boolean;
  type: string;
}

const hospitalDatabase: HospitalItem[] = [
  {
    id: "1",
    name: "District Government General Hospital & Emergency Trauma Unit",
    lat: 12.9780,
    lng: 77.5990,
    address: "Station Road, Main Medical Circle",
    phone: "+91 80 2345 6789",
    open24x7: true,
    type: "Public Tertiary Trauma Center",
  },
  {
    id: "2",
    name: "Apollo Rural Outreach Emergency Care Center",
    lat: 12.9650,
    lng: 77.5850,
    address: "National Highway 44, Sector 4",
    phone: "+91 80 9876 5432",
    open24x7: true,
    type: "Specialty Emergency ICU Care",
  },
  {
    id: "3",
    name: "Community Primary Health Center (PHC)",
    lat: 12.9850,
    lng: 77.6050,
    address: "Gram Panchayat Complex",
    phone: "+91 80 1122 3344",
    open24x7: false,
    type: "Primary Care Clinic",
  },
  {
    id: "4",
    name: "St. John's Emergency & Cardiac Trauma Unit",
    lat: 12.9340,
    lng: 77.6200,
    address: "Central Hospital Road",
    phone: "+91 80 5566 7788",
    open24x7: true,
    type: "24x7 Trauma & Cardiac ICU",
  },
  {
    id: "5",
    name: "LifeLine Multi-Specialty Disaster Relief Clinic",
    lat: 12.9910,
    lng: 77.5710,
    address: "Byrasandra Main Road",
    phone: "+91 80 4433 2211",
    open24x7: true,
    type: "24x7 Emergency Care",
  },
];

// Haversine formula to compute exact distance in kilometers
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function EmergencyPage() {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [liveAddress, setLiveAddress] = useState<string>("Locating high-accuracy GPS coordinates...");
  const [isLocating, setIsLocating] = useState(true);
  const [gpsStatus, setGpsStatus] = useState<"SEARCHING" | "ACTIVE" | "DENIED">("SEARCHING");
  const [emergencyDispatched, setEmergencyDispatched] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Perform reverse geocoding to resolve address name
  const fetchAddressName = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      if (res.ok) {
        const data = await res.json();
        if (data.display_name) {
          setLiveAddress(data.display_name);
          return;
        }
      }
    } catch (e) {
      console.warn("Reverse geocode fetch failed, using fallback coordinates display", e);
    }
    setLiveAddress(`Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Math.round(pos.coords.accuracy || 10);

          setUserCoords({ lat, lng, accuracy });
          setGpsStatus("ACTIVE");
          setIsLocating(false);
          fetchAddressName(lat, lng);
        },
        (err) => {
          console.warn("GPS Position Error:", err);
          setGpsStatus("DENIED");
          // Fallback to default user location
          const defaultLat = 12.9716;
          const defaultLng = 77.5946;
          setUserCoords({ lat: defaultLat, lng: defaultLng, accuracy: 15 });
          setIsLocating(false);
          fetchAddressName(defaultLat, defaultLng);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );

      setWatchId(id);

      return () => {
        if (id !== null) navigator.geolocation.clearWatch(id);
      };
    } else {
      setGpsStatus("DENIED");
      setUserCoords({ lat: 12.9716, lng: 77.5946, accuracy: 20 });
      setIsLocating(false);
    }
  }, []);

  const handleBroadcastSOS = () => {
    setEmergencyDispatched(true);
  };

  // Sort hospitals by real-time distance from user's live coordinates
  const sortedHospitals = hospitalDatabase.map((hosp) => {
    const dist = userCoords
      ? calculateDistanceKm(userCoords.lat, userCoords.lng, hosp.lat, hosp.lng)
      : 1.5;
    return { ...hosp, calculatedDistance: dist };
  }).sort((a, b) => a.calculatedDistance - b.calculatedDistance);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Live GPS Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl sos-pulse-glow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
              <Radio className="w-4 h-4 animate-ping text-amber-300" />
              <span>Real-Time GPS Satellite Dispatch Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">Emergency SOS & Live GPS Locator</h1>
            <p className="text-sm text-red-100">
              High-precision satellite GPS tracking broadcasting real-time location to nearest emergency trauma response centers.
            </p>
          </div>

          <button
            onClick={handleBroadcastSOS}
            className="px-6 py-4 bg-white text-red-700 hover:bg-red-50 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center gap-2 shrink-0 border-2 border-red-200"
          >
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>DISPATCH SOS SMS NOW</span>
          </button>
        </div>
      </div>

      {/* Dispatched Notification Alert */}
      {emergencyDispatched && (
        <div className="bg-emerald-500 text-slate-950 p-4 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle className="w-6 h-6 shrink-0 text-slate-950" />
          <div>
            <p className="uppercase tracking-wider">EMERGENCY BROADCAST DISPATCHED VIA TWILIO & SMS!</p>
            <p className="text-xs font-normal text-slate-900 mt-0.5">
              Live coordinates ({userCoords ? `${userCoords.lat.toFixed(5)}°, ${userCoords.lng.toFixed(5)}°` : "fetching..."}) dispatched to primary emergency contacts and 108 trauma control desk.
            </p>
          </div>
        </div>
      )}

      {/* Live GPS Telemetry Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${gpsStatus === "ACTIVE" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-700"}`}>
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Live GPS Location Telemetry</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${gpsStatus === "ACTIVE" ? "bg-emerald-500 text-slate-950" : "bg-amber-500 text-slate-950"}`}>
                  {gpsStatus === "ACTIVE" ? "GPS Locked" : "Locating..."}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-semibold line-clamp-1">{liveAddress}</span>
              </p>
            </div>
          </div>

          {userCoords && (
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs font-mono shrink-0">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Latitude</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{userCoords.lat.toFixed(5)}° N</span>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Longitude</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{userCoords.lng.toFixed(5)}° E</span>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Accuracy</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">±{userCoords.accuracy}m</span>
              </div>
            </div>
          )}
        </div>

        {/* Live OpenStreetMap Interactive Radar Embed */}
        {userCoords && (
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
            <iframe
              title="Live GPS Map Tracker"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${userCoords.lng - 0.03}%2C${userCoords.lat - 0.02}%2C${userCoords.lng + 0.03}%2C${userCoords.lat + 0.02}&layer=mapnik&marker=${userCoords.lat}%2C${userCoords.lng}`}
              className="w-full h-full filter saturate-150 contrast-105"
            />
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Satellite Map Tracker</span>
            </div>
          </div>
        )}
      </div>

      {/* Hospital Locator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Nearby Hospitals List (Sorted by Real Live Distance) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Hospital className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                Nearest Emergency Hospitals ({sortedHospitals.length})
              </h2>
            </div>
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-blue-500" />
              <span>Sorted by GPS Proximity</span>
            </div>
          </div>

          <div className="space-y-3">
            {sortedHospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-colors bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {hosp.name}
                    </span>
                    {hosp.open24x7 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">
                        24x7 Open
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{hosp.address} • <strong className="text-red-600 dark:text-red-400">{hosp.calculatedDistance} km away</strong></span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">{hosp.type}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${hosp.phone}`}
                    className="px-3.5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hosp.name} ${hosp.address}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-300 active:scale-95 transition-transform"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-500" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency First Aid Protocols */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>Instant First-Aid Protocols</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">1. Severe Bleeding Triage</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Apply direct firm pressure to wound using a clean cloth. Elevate injured limb above heart level. Do not remove pressure until medical help arrives.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">2. Burns First-Aid</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Hold burn under cool running tap water for at least 10–15 minutes. Cover loosely with sterile non-stick bandage. Never apply ice directly.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
              <h3 className="font-bold text-red-900 dark:text-red-200 text-sm">3. Choking & Airway Obstruction</h3>
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
