import { NextRequest, NextResponse } from "next/server";
import {
  getOpenPartnershipCalls,
  getPartnershipStats,
  getVerifiedOrganizations,
  registerOrganization,
} from "@/lib/api/partnership-platform";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const resource = searchParams.get("resource") ?? "calls";

  try {
    switch (resource) {
      case "calls": {
        const calls = await getOpenPartnershipCalls();
        return NextResponse.json(
          { data: calls },
          { headers: { "Cache-Control": "public, s-maxage=300" } }
        );
      }
      case "stats": {
        const stats = await getPartnershipStats();
        return NextResponse.json(
          { data: stats },
          { headers: { "Cache-Control": "public, s-maxage=3600" } }
        );
      }
      case "organizations": {
        const page = parseInt(searchParams.get("page") ?? "1", 10);
        const country = searchParams.get("country") ?? undefined;
        const type = searchParams.get("type") ?? undefined;
        const orgs = await getVerifiedOrganizations({ page, country, type });
        return NextResponse.json({ data: orgs });
      }
      default:
        return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
    }
  } catch (err) {
    console.error("[Partnership Platform proxy error]", err);
    return NextResponse.json(
      { error: "Partnership Platform unavailable" },
      { status: 503 }
    );
  }
}

const registerSchema = z.object({
  name: z.string().min(2),
  type: z.string(),
  country: z.string(),
  sector: z.string(),
  registrationNumber: z.string().optional(),
  contactEmail: z.string().email(),
  website: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);
    const result = await registerOrganization(data);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.flatten() }, { status: 422 });
    }
    console.error("[Partnership Platform register error]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
