import { NextResponse } from "next/server";
import { analyzeSymptomsWithGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { symptoms, language } = body;

    if (!symptoms) {
      return NextResponse.json({ error: "Symptoms text required" }, { status: 400 });
    }

    const result = await analyzeSymptomsWithGemini(symptoms, language || "en");
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to analyze symptoms" }, { status: 500 });
  }
}
