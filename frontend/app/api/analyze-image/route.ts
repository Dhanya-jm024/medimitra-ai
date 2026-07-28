import { NextResponse } from "next/server";
import { analyzeMedicineImageWithGemini, analyzeSkinConditionWithGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, mode } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "Image base64 data required" }, { status: 400 });
    }

    if (mode === "skin") {
      const skinResult = await analyzeSkinConditionWithGemini(imageBase64);
      return NextResponse.json(skinResult);
    } else {
      const medicineResult = await analyzeMedicineImageWithGemini(imageBase64);
      return NextResponse.json(medicineResult);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Image analysis failed" }, { status: 500 });
  }
}
