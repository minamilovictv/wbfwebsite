import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Bypass Sanity CDN so changes in Studio appear immediately. The CDN
  // can serve stale responses for several minutes after a publish.
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | undefined | null,
  options: { width?: number; height?: number; quality?: number } = {}
): string | null {
  if (!source) return null;
  try {
    const { width = 800, height, quality = 80 } = options;
    let img = builder.image(source).width(width).quality(quality).format("webp");
    if (height) img = img.height(height);
    return img.url();
  } catch {
    // Malformed or incomplete image reference from the CMS — render
    // without an image rather than crashing the page.
    return null;
  }
}

// Logos must never be cropped: constrain by width only and use fit("max"),
// which scales the image down while preserving its original aspect ratio.
export function getLogoUrl(
  source: SanityImageSource | undefined | null,
  width = 400
): string | null {
  if (!source) return null;
  try {
    return builder.image(source).width(width).fit("max").quality(90).format("webp").url();
  } catch {
    return null;
  }
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  // Default to 0 → every request hits Sanity. Pages can still opt into
  // longer caching by passing an explicit value.
  const { revalidate = 0, tags } = options;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: revalidate === false ? false : revalidate,
      tags,
    },
  } as any);
}
