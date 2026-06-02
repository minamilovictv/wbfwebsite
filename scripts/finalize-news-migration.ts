/**
 * Phase C finalization — drop the deprecated `program` (singular)
 * reference from every news document, now that `programs[]` is the
 * canonical field.
 *
 * Pre-conditions:
 *   - scripts/migrate-news.ts has already been run with --apply, so
 *     every doc with a legacy `program` has the same reference inside
 *     `programs[]`.
 *
 * The script aborts if it finds a news doc whose `program` is set but
 * whose `programs[]` does not contain that same reference — in that
 * case run `migrate-news.ts --apply` first.
 *
 * Usage:
 *   pnpm tsx scripts/finalize-news-migration.ts            # dry run
 *   pnpm tsx scripts/finalize-news-migration.ts --apply    # commit
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

type Ref = { _type: "reference"; _ref: string };
interface NewsDoc {
  _id: string;
  title?: string;
  program?: Ref;
  programs?: Array<{ _ref: string }>;
}

async function main() {
  const docs = await client.fetch<NewsDoc[]>(
    `*[_type == "news"]{ _id, title, program, programs }`,
  );

  const summary = {
    scanned: docs.length,
    toUnset: 0,
    alreadyClean: 0,
    integrityFailures: 0,
  };

  console.log(
    `\n[finalize-news] ${APPLY ? "APPLY" : "DRY-RUN"} · scanning ${docs.length} news documents…\n`,
  );

  const failures: string[] = [];
  const patchable: NewsDoc[] = [];

  for (const doc of docs) {
    if (!doc.program?._ref) {
      summary.alreadyClean++;
      continue;
    }
    const present = (doc.programs ?? []).some((p) => p._ref === doc.program!._ref);
    if (!present) {
      summary.integrityFailures++;
      failures.push(
        `  ✗ ${doc._id} (${doc.title ?? "untitled"}) — legacy program ${doc.program._ref} missing from programs[]. Run migrate-news.ts --apply first.`,
      );
      continue;
    }
    summary.toUnset++;
    patchable.push(doc);
    console.log(`  ✎ ${doc._id} (${doc.title ?? "untitled"}) — will unset legacy program field`);
  }

  if (failures.length > 0) {
    console.log("\n[finalize-news] integrity failures:");
    for (const f of failures) console.log(f);
    console.log(
      "\n[finalize-news] aborting without changes. Run scripts/migrate-news.ts --apply, then retry.",
    );
    process.exit(1);
  }

  if (APPLY && patchable.length > 0) {
    let tx = client.transaction();
    for (const doc of patchable) {
      tx = tx.patch(doc._id, (p) => p.unset(["program"]));
    }
    await tx.commit();
  }

  console.log("\n[finalize-news] summary");
  console.log(`  scanned:           ${summary.scanned}`);
  console.log(`  already clean:     ${summary.alreadyClean}`);
  console.log(`  unset queued:      ${summary.toUnset}`);
  console.log(`  integrity errors:  ${summary.integrityFailures}`);
  console.log(`  mode:              ${APPLY ? "APPLIED" : "dry-run (pass --apply to commit)"}`);
}

main().catch((err) => {
  console.error("[finalize-news] failed:", err);
  process.exit(1);
});
