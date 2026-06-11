import type { Partner } from "@/types";

export function donorSlug(partner: Partner): string {
  return (
    partner.slug?.current ??
    partner.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

// The CMS contains near-duplicate partner entries (e.g. "European Union" and
// "European Union — IPA III"); keep one per organization, preferring the
// entry that has a logo.
export function dedupePartners(partners: Partner[]): Partner[] {
  const byKey = new Map<string, Partner>();
  for (const partner of partners) {
    const key = partner.name
      .toLowerCase()
      .split(/[—–(-]/)[0]
      .trim();
    const existing = byKey.get(key);
    if (!existing || (!existing.logo && partner.logo)) {
      byKey.set(key, partner);
    }
  }
  return [...byKey.values()];
}
