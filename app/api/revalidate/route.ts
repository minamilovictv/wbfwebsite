import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Map Sanity document types to cache tags and paths that should be purged
const TYPE_TAG_MAP: Record<string, { tags: string[]; paths: string[] }> = {
  post: {
    tags: ["news"],
    paths: ["/news", "/"],
  },
  event: {
    tags: ["events"],
    paths: ["/events", "/"],
  },
  grant: {
    tags: ["grants"],
    paths: ["/grants", "/grants/open-calls", "/grants/database", "/"],
  },
  program: {
    tags: ["programs"],
    paths: ["/programs", "/"],
  },
  project: {
    tags: ["projects"],
    paths: ["/projects", "/grantees", "/"],
  },
  partner: {
    tags: ["partners"],
    paths: ["/partners", "/"],
  },
  person: {
    tags: ["team"],
    paths: ["/about/team", "/"],
  },
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  // Verify the shared secret sent by Sanity
  const authHeader = req.headers.get("authorization");
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { _type, slug } = body;

  if (!_type) {
    return NextResponse.json({ message: "Missing _type" }, { status: 400 });
  }

  const mapping = TYPE_TAG_MAP[_type];

  if (!mapping) {
    // Unknown type — revalidate everything to be safe
    revalidatePath("/", "layout");
    return NextResponse.json({
      revalidated: true,
      message: `Unknown type "${_type}", revalidated entire layout`,
    });
  }

  // Revalidate list-level cache tags
  for (const tag of mapping.tags) {
    revalidateTag(tag);
  }

  // Revalidate the slug-specific tag and path if a slug was provided
  if (slug?.current) {
    revalidateTag(`${_type}:${slug.current}`);
    revalidatePath(`/${_type === "post" ? "news" : _type}/${slug.current}`);
  }

  // Revalidate all affected static paths
  for (const path of mapping.paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    type: _type,
    slug: slug?.current ?? null,
    tags: mapping.tags,
    paths: mapping.paths,
  });
}
