import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/lib/sanity/client";
import { grantsListQuery, openGrantsQuery } from "@/lib/sanity/queries";
import type { Grant } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const country = searchParams.get("country");
  const openOnly = searchParams.get("open") === "true";

  try {
    const grants = await sanityFetch<Grant[]>(
      openOnly ? openGrantsQuery : grantsListQuery,
      {},
      { revalidate: 300, tags: ["grants"] }
    );

    const filtered = grants.filter((g) => {
      if (status && g.status !== status) return false;
      if (type && g.type !== type) return false;
      if (country && !g.eligibleCountries.includes(country as any)) return false;
      return true;
    });

    return NextResponse.json(
      { data: filtered, total: filtered.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("[Grants API]", err);
    return NextResponse.json({ error: "Failed to fetch grants" }, { status: 500 });
  }
}
