// app/api/nlp/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    // 🧠 Simple auto-detection fallback (if sourceLang is missing)
    // For now, assume Hindi to English if Hindi characters are detected,
    // otherwise English to Hindi.
    let from = sourceLang;
    let to = targetLang;

    if (!from) {
      const hasHindi = /[\u0900-\u097F]/.test(text);
      from = hasHindi ? "hi" : "en";
      to = hasHindi ? "en" : "hi";
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${from}|${to}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data?.responseData) throw new Error("Translation failed");

    const translatedText = data.responseData.translatedText;

    return NextResponse.json({ text: translatedText });
  } catch (err) {
    console.error("❌ Translation error:", err);
    return NextResponse.json(
      { error: "Translation failed. Try again later." },
      { status: 500 }
    );
  }
}
