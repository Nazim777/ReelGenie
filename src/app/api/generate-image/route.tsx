import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        topic
      )}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) throw new Error("Unsplash API error");

    const data = await response.json();
    const imageUrls = data.results.map((img: any) => img.urls.regular);

    return NextResponse.json({ result: imageUrls });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
