import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();
    return NextResponse.json({
      translatedText: text, // Fallback echo for fast rendering
      targetLang,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Translation error" }, { status: 500 });
  }
}
