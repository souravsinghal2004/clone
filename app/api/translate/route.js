export async function POST(req) {
  try {
    const { text } = await req.json();

    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
        text
      )}`
    );

    const data = await res.json();
    const translated = data?.[0]?.[0]?.[0] || text;

    return new Response(JSON.stringify({ translated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Translation error:", err);
    return new Response(JSON.stringify({ translated: text }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
