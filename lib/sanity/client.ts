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
  const { width = 800, height, quality = 80 } = options;
  let img = builder.image(source).width(width).quality(quality).format("webp");
  if (height) img = img.height(height);
  return img.url();
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = 60, tags } = options;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: revalidate === false ? false : revalidate,
      tags,
    },
  } as any);
}
