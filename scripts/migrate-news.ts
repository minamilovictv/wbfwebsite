/**
 * Phase A migration — news documents.
 *
 * 1. Copies the deprecated single `program` reference into the new
 *    `programs[]` array (only if `programs` is empty / missing).
 * 2. Rewrites `category === "open-call"` to `"call-for-applications"`.
 * 3. Normalizes free-text country names to ISO codes
 *    (AL, BA, XK, MK, ME, RS).
 *
 * Usage:
 *   pnpm tsx scripts/migrate-news.ts            # dry run (default)
 *   pnpm tsx scripts/migrate-news.ts --apply    # commit patches
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local.
 *
 * The migration is idempotent — re-running after a successful apply is a no-op.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import { randomUUID } from "node:crypto";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const COUNTRY_MAP: Record<string, string> = {
  albania: "AL",
  bih: "BA",
  "bosnia-and-herzegovina": "BA",
  "bosnia-herzegovina": "BA",
  kosovo: "XK",
  "north-macedonia": "MK",
  macedonia: "MK",
  montenegro: "ME",
  serbia: "RS",
};

const ISO_CODES = new Set(["AL", "BA", "XK", "MK", "ME", "RS"]);

type Ref = { _type: "reference"; _ref: string };

interface NewsDoc {
  _id: string;
  _type: "news";
  title?: string;
  category?: string;
  countries?: string[];
  program?: Ref;
  programs?: Array<Ref & { _key: string }>;
}

function normalizeCountries(input: string[] | undefined): {
  next: string[] | undefined;
  changed: boolean;
} {
  if (!Array.isArray(input)) return { next: input, changed: false };
  let changed = false;
  const next = input.map((c) => {
    if (ISO_CODES.has(c)) return c;
    const mapped = COUNTRY_MAP[c.toLowerCase()];
    if (mapped) {
      changed = true;
      return mapped;
    }
    return c;
  });
  return { next, changed };
}

async function main() {
  const docs = await client.fetch<NewsDoc[]>(
    `*[_type == "news"]{ _id, _type, title, category, countries, program, programs }`,
  );

  const summary = {
    scanned: docs.length,
    programsPopulated: 0,
    categoryRewritten: 0,
    countriesNormalized: 0,
    skipped: 0,
    patched: 0,
  };

  console.log(
    `\n[migrate-news] ${APPLY ? "APPLY" : "DRY-RUN"} · scanning ${docs.length} news documents…\n`,
  );

  for (const doc of docs) {
    const set: Record<string, unknown> = {};
    const reasons: string[] = [];

    // 1. program → programs[]
    if (
      doc.program?._ref &&
      (!Array.isArray(doc.programs) || doc.programs.length === 0)
    ) {
      set.programs = [
        { _key: randomUUID().slice(0, 12), _type: "reference", _ref: doc.program._ref },
      ];
      reasons.push("programs ← program");
      summary.programsPopulated++;
    }

    // 2. category normalization
    if (doc.category === "open-call") {
      set.category = "call-for-applications";
      reasons.push('category "open-call" → "call-for-applications"');
      summary.categoryRewritten++;
    }

    // 3. countries normalization
    const { next, changed } = normalizeCountries(doc.countries);
    if (changed) {
      set.countries = next;
      reasons.push(`countries ${JSON.stringify(doc.countries)} → ${JSON.stringify(next)}`);
      summary.countriesNormalized++;
    }

    if (Object.keys(set).length === 0) {
      summary.skipped++;
      console.log(`  · ${doc._id} (${doc.title ?? "untitled"}) — no changes`);
      continue;
    }

    summary.patched++;
    console.log(`  ✎ ${doc._id} (${doc.title ?? "untitled"})`);
    for (const r of reasons) console.log(`      - ${r}`);

    if (APPLY) {
      await client.patch(doc._id).set(set).commit({ autoGenerateArrayKeys: true });
    }
  }

  console.log("\n[migrate-news] summary");
  console.log(`  scanned:               ${summary.scanned}`);
  console.log(`  programs populated:    ${summary.programsPopulated}`);
  console.log(`  category rewritten:    ${summary.categoryRewritten}`);
  console.log(`  countries normalized:  ${summary.countriesNormalized}`);
  console.log(`  patched docs:          ${summary.patched}`);
  console.log(`  unchanged:             ${summary.skipped}`);
  console.log(`  mode:                  ${APPLY ? "APPLIED" : "dry-run (pass --apply to commit)"}`);
}

main().catch((err) => {
  console.error("[migrate-news] failed:", err);
  process.exit(1);
});
