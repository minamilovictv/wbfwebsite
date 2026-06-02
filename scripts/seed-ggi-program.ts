/**
 * Phase B migration — populate the GGI program document with the
 * structured content that used to live hardcoded inside
 * `app/programs/ggi/page.tsx`. Run once after the schema update.
 *
 * Usage:
 *   pnpm tsx scripts/seed-ggi-program.ts            # dry run (default)
 *   pnpm tsx scripts/seed-ggi-program.ts --apply    # commit patches
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local.
 *
 * Idempotent: only sets fields that are currently empty. Re-running
 * after `--apply` is a no-op. To force overwrite, pass --force.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import { randomUUID } from "node:crypto";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const APPLY = process.argv.includes("--apply");
const FORCE = process.argv.includes("--force");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const key = () => randomUUID().slice(0, 12);
const withKey = <T extends object>(obj: T) => ({ _key: key(), ...obj });

// ─── GGI structured content (extracted from former hardcoded page) ──────

const ggiContent = {
  hero: {
    statusPill: { text: "Call No. 8 · Now Under Review", dotColor: "amber" as const },
    tagline:
      "Empowering civil society to build regional cooperation from the ground up across the Western Balkans.",
    footnote:
      "Co-Funded by the European Union · IPA III Instrument for Pre-Accession Assistance · WB6 Region",
    ctas: [
      withKey({
        label: "Apply via OGMS",
        url: "https://wbfportal.org",
        variant: "primary",
        external: true,
      }),
      withKey({
        label: "Get Notified for Call 9",
        url: "#notify",
        variant: "secondary",
        external: false,
      }),
    ],
    metaFacts: [
      withKey({ key: "Status", value: "Under Review" }),
      withKey({ key: "Applications", value: "263 Received" }),
      withKey({ key: "Max Grant", value: "€15,000" }),
      withKey({ key: "Co-financing", value: "Min. 20%" }),
      withKey({ key: "Duration", value: "3–6 months" }),
      withKey({ key: "Min. Partners", value: "3 Countries" }),
    ],
  },

  keyFacts: {
    heading: "Call No. 8 — Key Facts",
    items: [
      withKey({ label: "Status", value: "Under Review" }),
      withKey({ label: "Applications received", value: "263" }),
      withKey({ label: "Maximum grant", value: "€15,000" }),
      withKey({ label: "Co-financing required", value: "Min. 20%" }),
      withKey({ label: "Project duration", value: "3–6 months" }),
      withKey({ label: "Minimum partners", value: "3 Contracting Parties" }),
      withKey({ label: "Results expected", value: "June 2026" }),
    ],
  },

  timeline: {
    heading: "Call No. 8 — Timeline",
    steps: [
      withKey({ date: "Mar 2026", description: "Call opened", status: "done" as const }),
      withKey({ date: "Mar–Apr 2026", description: "Info sessions held", status: "done" as const }),
      withKey({ date: "20 Apr 2026", description: "Deadline — 263 received", status: "done" as const }),
      withKey({ date: "Apr–Jun 2026", description: "Evaluation underway", status: "active" as const }),
      withKey({ date: "Jun 2026", description: "Results announced", status: "pending" as const }),
      withKey({ date: "Jun–Jul 2026", description: "Contract signature", status: "pending" as const }),
    ],
  },

  notifySignup: {
    enabled: true,
    overline: "Get Notified — Call No. 9",
    title: "Stay ahead of Call No. 9",
    description:
      "Round 9 is expected in early 2027. Register now and we'll contact you as soon as the call opens.",
    organizationPlaceholder: "Title of organization",
    emailPlaceholder: "Your email address",
    buttonLabel: "Notify Me",
  },

  about: {
    overline: "01 / About the Program",
    title: "Building {{regional cooperation}} from the ground up",
    paragraphs: [
      "The Western Balkans Fund supports regional cooperation, reconciliation, and EU integration by funding civil society and grassroots initiatives across the WB6 region.",
      "The GGI-WB scheme strengthens regional cooperation, people-to-people links, democratic governance, sustainable development, and reconciliation processes — recognizing that lasting cooperation must be rooted in local ownership.",
      "This program is part of a continuous annual funding cycle. Call No. 8 is now active; Call No. 9 is anticipated in 2027.",
    ],
    outcomesHeading: "Expected Outcomes",
    outcomes: [
      "Increased participation of grassroots and marginalized organizations across the region.",
      "Strengthened local ownership of regional cooperation processes.",
      "Enhanced engagement of youth, women, and minority groups in cross-border initiatives.",
    ],
    annualCycle: {
      enabled: true,
      label: "Annual Funding Cycle",
      sublabel: "Continuous program, Call 8 active",
      leftText: "📅 Call No. 8 active",
      rightText: "⏳ Call No. 9 — 2027",
    },
    showWb6Coverage: true,
  },

  interventionAreas: {
    overline: "02 / Areas of Intervention",
    title: "Three intervention areas",
    intro:
      "All projects must address at least 3 cross-cutting issues and stay within these thematic pillars.",
    areas: [
      withKey({
        icon: "globe",
        title: "Cultural Cooperation",
        description:
          "Supporting cross-border cultural exchange, heritage preservation, and inclusive access to culture across the Western Balkans.",
        color: "brand",
      }),
      withKey({
        icon: "book",
        title: "Education & Scientific Exchange",
        description:
          "Fostering academic collaboration, youth exchanges, and knowledge-sharing between educational institutions across the region.",
        color: "emerald",
      }),
      withKey({
        icon: "leaf",
        title: "Sustainable Development",
        description:
          "Advancing environmental cooperation, green agenda initiatives, and sustainable community development across borders.",
        color: "green",
      }),
    ],
    crossCuttingHeading: "Cross-Cutting Issues — at least 3 mandatory",
    crossCuttingTags: [
      "🌿 Green Agenda",
      "🌐 Regional Outreach",
      "♀ Gender Sensitivity",
      "🕊 Conflict Sensitivity",
      "📚 Knowledge Sharing",
      "🤝 Marginalised Groups",
      "✍ Freedom of Expression",
      "🇪🇺 EU Integration",
      "🕊 Reconciliation",
      "💡 Innovation & Digitalization",
    ],
    activityRulesHeading: "Key Activity Rules",
    activityRules: [
      "All activities must ensure non-discriminatory participation.",
      "Activities must take place in WB6 (exceptions need strong justification).",
      "Sub-granting to third parties is not allowed.",
      "Regional events, awareness campaigns, networking, and advocacy are encouraged.",
    ],
  },

  eligibility: {
    overline: "03 / Eligibility",
    title: "Who can apply?",
    intro:
      "A wide range of organizations from across civil society are eligible to apply and lead GGI projects.",
    organizations: [
      withKey({
        title: "Civil Society Organizations / NGOs",
        description: "Registered CSOs and non-governmental organizations working in the WB6 region.",
      }),
      withKey({
        title: "Local & Regional Public Entities",
        description: "Public bodies, municipalities, regional authorities or their associations.",
      }),
      withKey({
        title: "Business Associations",
        description: "Enterprise associations, chambers of commerce, tourism and agriculture bodies.",
      }),
      withKey({
        title: "Educational Institutions",
        description: "Universities, schools, institutes, libraries, research centres, and academies.",
      }),
      withKey({
        title: "Media Associations",
        description: "Organizations working in media, journalism, and freedom of expression.",
      }),
      withKey({
        title: "Cultural & Sports Institutions",
        description: "Museums, galleries, theatres, sport associations, and cultural centers.",
      }),
    ],
    partnershipNote:
      "Your partnership must include partners from at least 3 of these 6 contracting parties",
    partnershipSubnote:
      "Partnerships spanning all six Contracting Parties are especially encouraged and may be prioritized in evaluation.",
    partnershipCtaLabel: "Use WBF Partnership Platform",
    partnershipCtaUrl: "https://wbfpartnership.com",
  },

  featuredStories: {
    overline: "04 / Grantee Highlights",
    title: "Built on a track record of regional change",
    intro:
      "Featured stories from previous calls. Partnerships across borders, anchored in local communities.",
    stories: [
      withKey({
        emoji: "🏛️",
        area: "Cultural Cooperation",
        callTag: "GGI Grants · Call 7",
        title: "Museums Open to All",
        description:
          "Led by the Association of the Deaf and Hard of Hearing of Montenegro, nine museums across Montenegro, Serbia, and Albania have been adapted with sign language training, audio guides, and inclusive tools for visitors with sensory impairments.",
        meta: "Montenegro, Serbia, Albania · 3 Countries · 9 Museums",
        link: "https://sogincg.me/projekti/muzeji-otvoreni-za-sve/",
        gradient: "brand",
      }),
      withKey({
        emoji: "🔭",
        area: "Education & Scientific Exchange",
        callTag: "GGI Grants · Call 7",
        title: "From Earth to the Stars",
        description:
          "The Astronomy Club of Kosovo brought together youth from all six countries in Kukaj village near Prishtina — connecting 400+ applicants through STEM, stargazing, and cultural exchange.",
        meta: "All 6 Countries · 400+ applicants · Kosovo led",
        link: "https://www.instagram.com/astroclubkosova/",
        gradient: "slate-brand",
      }),
    ],
  },

  subscribeCta: {
    enabled: true,
    title: "Stay Informed",
    description:
      "Don't miss our next call for proposals. Subscribe for early access announcements, deadline reminders, and program updates. Call No. 9 is anticipated for 2027.",
    emailPlaceholder: "your.email@organization.org",
    buttonLabel: "Notify Me for Call No. 9",
  },

  documentsHeading: "Document Depository",

  countries: ["AL", "BA", "XK", "MK", "ME", "RS"],
};

async function main() {
  // Find all GGI program docs (production data has duplicates)
  const docs = await client.fetch<
    Array<Record<string, unknown> & { _id: string; title?: string; slug?: { current?: string } }>
  >(`*[_type == "program" && slug.current == "ggi"]`);

  if (docs.length === 0) {
    console.log("[seed-ggi] No GGI program documents found. Aborting.");
    process.exit(1);
  }

  console.log(
    `\n[seed-ggi] ${APPLY ? "APPLY" : "DRY-RUN"}${FORCE ? " --force" : ""} · found ${docs.length} GGI document(s)`,
  );

  for (const doc of docs) {
    const set: Record<string, unknown> = {};

    const maybeSet = (field: keyof typeof ggiContent, value: unknown) => {
      const current = (doc as Record<string, unknown>)[field as string];
      const empty =
        current == null ||
        (Array.isArray(current) && current.length === 0) ||
        (typeof current === "object" && Object.keys(current as object).length === 0);
      if (FORCE || empty) {
        set[field as string] = value;
      }
    };

    maybeSet("hero", ggiContent.hero);
    maybeSet("keyFacts", ggiContent.keyFacts);
    maybeSet("timeline", ggiContent.timeline);
    maybeSet("notifySignup", ggiContent.notifySignup);
    maybeSet("about", ggiContent.about);
    maybeSet("interventionAreas", ggiContent.interventionAreas);
    maybeSet("eligibility", ggiContent.eligibility);
    maybeSet("featuredStories", ggiContent.featuredStories);
    maybeSet("subscribeCta", ggiContent.subscribeCta);
    maybeSet("documentsHeading", ggiContent.documentsHeading);
    maybeSet("countries", ggiContent.countries);

    if (Object.keys(set).length === 0) {
      console.log(`  · ${doc._id} (${doc.title ?? "untitled"}) — already populated, skipping`);
      continue;
    }

    console.log(`  ✎ ${doc._id} (${doc.title ?? "untitled"}) — patching:`);
    for (const k of Object.keys(set)) console.log(`      - ${k}`);

    if (APPLY) {
      await client.patch(doc._id).set(set).commit({ autoGenerateArrayKeys: true });
    }
  }

  console.log(
    `\n[seed-ggi] ${APPLY ? "applied" : "dry-run complete (pass --apply to commit)"}.\n`,
  );
}

main().catch((err) => {
  console.error("[seed-ggi] failed:", err);
  process.exit(1);
});
