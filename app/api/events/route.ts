import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";
    const active = searchParams.get("active") || "true";
    const closed = searchParams.get("closed") || "false";
    const order = searchParams.get("order") || "volume24hr";
    const ascending = searchParams.get("ascending") || "false";

    const res = await fetch(
      `https://gamma-api.polymarket.com/events?limit=${limit}&active=${active}&closed=${closed}&order=${order}&ascending=${ascending}`,
      {
        headers: { "Accept": "application/json" },
        next: { revalidate: 5 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Gamma API error" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "s-maxage=5, stale-while-revalidate=10",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
