import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
  stega: false,
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
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
  const { width = 800, height, quality = 80 } = options;
  let img = builder.image(source).width(width).quality(quality).format("webp").auto("format");
  if (height) img = img.height(height);
  return img.url();
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = 3600, tags } = options;
  return sanityClient.fetch<T>(query, params, {
    next: {
      ...(revalidate !== false ? { revalidate } : { revalidate: false }),
      tags,
    },
  } as Parameters<typeof sanityClient.fetch>[2]);
}
