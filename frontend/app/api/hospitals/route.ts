import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") || "12.9716";
  const lng = searchParams.get("lng") || "77.5946";

  const hospitals = [
    {
      id: "hosp-1",
      name: "Government General District Hospital",
      distance: "1.2 km",
      address: "Main Medical Circle, District Center",
      phone: "108",
      open24x7: true,
    },
    {
      id: "hosp-2",
      name: "Primary Health Center (PHC Outreach)",
      distance: "2.4 km",
      address: "Panchayat Bhavan Road",
      phone: "+91 80 2345 6789",
      open24x7: true,
    },
    {
      id: "hosp-3",
      name: "St. John's Emergency & Trauma Care",
      distance: "4.8 km",
      address: "National Highway Bypass",
      phone: "+91 80 9876 5432",
      open24x7: true,
    },
  ];

  return NextResponse.json({ hospitals, coords: { lat, lng } });
}
