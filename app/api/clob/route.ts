import { NextRequest, NextResponse } from "next/server";

const CLOB = "https://clob.polymarket.com";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint"); // midpoint | spread | book
  const token_id = searchParams.get("token_id");

  if (!endpoint || !token_id) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const allowed = ["midpoint", "spread", "book", "price"];
  if (!allowed.includes(endpoint)) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  }

  try {
    const res = await fetch(`${CLOB}/${endpoint}?token_id=${token_id}`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `CLOB ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
