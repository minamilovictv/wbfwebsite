import { NextRequest, NextResponse } from "next/server";
import { getOGMSOpenGrants, getOGMSStats } from "@/lib/api/ogms";

/**
 * Proxy endpoint that exposes OGMS data to the frontend.
 * This avoids exposing the OGMS API key to the client and
 * allows response caching at the Next.js edge layer.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const resource = searchParams.get("resource") ?? "grants";

  try {
    switch (resource) {
      case "grants": {
        const grants = await getOGMSOpenGrants();
        return NextResponse.json(
          { data: grants },
          { headers: { "Cache-Control": "public, s-maxage=300" } }
        );
      }
      case "stats": {
        const stats = await getOGMSStats();
        return NextResponse.json(
          { data: stats },
          { headers: { "Cache-Control": "public, s-maxage=3600" } }
        );
      }
      default:
        return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
    }
  } catch (err) {
    console.error("[OGMS proxy error]", err);
    return NextResponse.json(
      { error: "OGMS integration unavailable" },
      { status: 503 }
    );
  }
}
