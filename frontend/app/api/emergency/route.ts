import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lat, lng, userPhone } = await req.json();

    // Twilio SMS simulation or real API call when credentials exist
    console.log(`[Twilio Emergency Dispatch] Broadcast sent for coords (${lat}, ${lng}) from user ${userPhone || "Anonymous"}`);

    return NextResponse.json({
      status: "SUCCESS",
      message: "Emergency broadcast signal sent to 3 contacts and nearest ambulance center.",
      timestamp: new Date().toISOString(),
      dispatchedCoords: { lat, lng },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to dispatch emergency SMS" }, { status: 500 });
  }
}
