/**
 * Sanity seed script — creates Partners, People, Programs, and Grants
 * with real WBF content.
 *
 * Prerequisites:
 *   1. Add SANITY_API_WRITE_TOKEN to .env.local
 *      (Sanity Studio → API → Tokens → Add API token → Editor)
 *   2. Run: npx tsx scripts/seed-sanity.ts
 *
 * Safe to re-run: uses createIfNotExists so existing docs are never overwritten.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function create(doc: Record<string, unknown>) {
  const result = await client.createIfNotExists(doc as any);
  console.log(`  ✓ ${doc._type}: ${doc._id}`);
  return result;
}

function ref(id: string) {
  return { _type: "reference", _ref: id };
}

// ─── Partners / Donors ────────────────────────────────────────────────────────

async function seedPartners() {
  console.log("\n── Partners ──");
  const partners = [
    {
      _id: "partner-eu",
      _type: "partner",
      name: "European Union — IPA III",
      slug: { _type: "slug", current: "european-union" },
      type: "donor",
      website: "https://european-union.europa.eu",
      country: "EU",
      description:
        "The primary donor of the Western Balkans Fund, providing funding through the Instrument for Pre-Accession Assistance (IPA III) under the EU/WBF Joint Action programme.",
      featured: true,
      order: 1,
    },
    {
      _id: "partner-switzerland",
      _type: "partner",
      name: "Switzerland",
      slug: { _type: "slug", current: "switzerland" },
      type: "donor",
      website: "https://www.eda.admin.ch/sdc",
      country: "CH",
      description:
        "Supporting WBF's regional cooperation programmes through the Swiss Agency for Development and Cooperation (SDC).",
      featured: true,
      order: 2,
    },
    {
      _id: "partner-japan",
      _type: "partner",
      name: "Japan",
      slug: { _type: "slug", current: "japan" },
      type: "donor",
      website: "https://www.mofa.go.jp",
      country: "JP",
      description:
        "Funding WBF's Advocacy & Networking Events programme and the LeadBalkans platform through the Japanese Government.",
      featured: true,
      order: 3,
    },
    {
      _id: "partner-germany",
      _type: "partner",
      name: "Germany",
      slug: { _type: "slug", current: "germany" },
      type: "donor",
      website: "https://www.giz.de",
      country: "DE",
      description:
        "Supporting WBF's civil society and democratic governance programmes through GIZ and the German Federal Foreign Office.",
      featured: true,
      order: 4,
    },
    {
      _id: "partner-visegrad",
      _type: "partner",
      name: "Visegrad Fund",
      slug: { _type: "slug", current: "visegrad-fund" },
      type: "strategic-partner",
      website: "https://www.visegradfund.org",
      country: "SK",
      description:
        "Partner in the Visegrad Fellowship programme, connecting Western Balkans youth with the V4 countries of Central Europe.",
      featured: true,
      order: 5,
    },
    {
      _id: "partner-osf",
      _type: "partner",
      name: "Open Society Foundations",
      slug: { _type: "slug", current: "open-society-foundations" },
      type: "strategic-partner",
      website: "https://www.opensocietyfoundations.org",
      country: "US",
      description:
        "Supporting WBF's civil society strengthening and independent media initiatives across the Western Balkans.",
      featured: true,
      order: 6,
    },
  ];

  for (const p of partners) await create(p);
}

// ─── People ───────────────────────────────────────────────────────────────────

async function seedPeople() {
  console.log("\n── People ──");
  const people = [
    {
      _id: "person-executive-director",
      _type: "person",
      fullName: "Executive Director",
      slug: { _type: "slug", current: "executive-director" },
      role: "Executive Director",
      department: "Leadership",
      email: "director@westernbalkansfund.org",
      featured: true,
      order: 1,
    },
    {
      _id: "person-grants-officer",
      _type: "person",
      fullName: "Grants & Programmes Officer",
      slug: { _type: "slug", current: "grants-programmes-officer" },
      role: "Grants & Programmes Officer",
      department: "Grants & Programmes",
      email: "grants@westernbalkansfund.org",
      featured: false,
      order: 2,
    },
    {
      _id: "person-comms-officer",
      _type: "person",
      fullName: "Communications Officer",
      slug: { _type: "slug", current: "communications-officer" },
      role: "Communications Officer",
      department: "Communications",
      email: "communications@westernbalkansfund.org",
      featured: false,
      order: 3,
    },
  ];

  for (const p of people) await create(p);
}

// ─── Programs ─────────────────────────────────────────────────────────────────

async function seedPrograms() {
  console.log("\n── Programs ──");
  const programs = [
    {
      _id: "program-ggi",
      _type: "program",
      title: "Good Governance and Integration (GGI)",
      slug: { _type: "slug", current: "ggi" },
      pillar: "civil-society",
      shortDescription:
        "WBF's flagship grant programme co-funded by the EU under IPA III, supporting civil society organisations, municipalities, universities and media across the WB6 region.",
      description:
        "The Good Governance and Integration (GGI) programme is the Western Balkans Fund's flagship instrument for advancing civil society, democratic governance, and European integration across Albania, Bosnia and Herzegovina, Kosovo*, North Macedonia, Montenegro, and Serbia. Co-funded by the European Union under the Instrument for Pre-Accession Assistance (IPA III), GGI provides competitive grants to NGOs, universities, municipalities, research institutes, and cultural institutions for regional cooperation projects.",
      status: "active",
      totalBudget: 8000000,
      currency: "EUR",
      countries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      startDate: "2022-01-01",
      endDate: "2026-12-31",
      impactStats: [
        { _key: "stat1", label: "Projects Funded", value: "263", unit: "" },
        { _key: "stat2", label: "Total Grants Awarded", value: "€8M+", unit: "" },
        { _key: "stat3", label: "Partner Countries", value: "6", unit: "" },
        { _key: "stat4", label: "Beneficiaries", value: "2,000+", unit: "" },
      ],
      donors: [ref("partner-eu"), ref("partner-switzerland")],
      featured: true,
      order: 1,
    },
    {
      _id: "program-matching",
      _type: "program",
      title: "Matching Grants",
      slug: { _type: "slug", current: "matching-grants" },
      pillar: "regional-cooperation",
      shortDescription:
        "Rolling programme connecting WBF grantees with international partners for co-funded projects. Applications accepted year-round.",
      description:
        "The Matching Grants programme enables Western Balkans civil society organisations and institutions that have previously received WBF funding to form new partnerships with international organisations, securing additional co-financing for regional cooperation activities.",
      status: "active",
      countries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      featured: true,
      order: 2,
    },
    {
      _id: "program-visegrad",
      _type: "program",
      title: "Visegrad Fellowship",
      slug: { _type: "slug", current: "visegrad-fellowship" },
      pillar: "youth-mobility",
      shortDescription:
        "Fellowship programme connecting young professionals from the Western Balkans with V4 countries (Czech Republic, Hungary, Poland, Slovakia).",
      description:
        "The Visegrad Fellowship connects emerging leaders and young professionals from the WB6 region with counterparts in the Visegrad Four countries. Fellows participate in a 3–6 month exchange programme, building professional networks and deepening understanding of European integration processes.",
      status: "active",
      countries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      donors: [ref("partner-visegrad")],
      featured: true,
      order: 3,
    },
    {
      _id: "program-erc",
      _type: "program",
      title: "ERC / Move Programme",
      slug: { _type: "slug", current: "erc-move" },
      pillar: "science-research",
      shortDescription:
        "Research mobility grants enabling scientists and academics from the Western Balkans to collaborate with European research institutions.",
      description:
        "The ERC/Move Programme supports research mobility for scientists, academics, and PhD candidates from the Western Balkans, enabling short-term research stays at leading European universities and research centres.",
      status: "upcoming",
      countries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      featured: false,
      order: 4,
    },
    {
      _id: "program-ane",
      _type: "program",
      title: "Advocacy & Networking Events (ANE)",
      slug: { _type: "slug", current: "advocacy-networking-events" },
      pillar: "regional-cooperation",
      shortDescription:
        "Grants supporting regional advocacy events, conferences, and networking activities that promote EU integration and Western Balkans cooperation.",
      description:
        "The Advocacy & Networking Events programme funds regional conferences, roundtables, advocacy campaigns, and networking initiatives that advance the Western Balkans' EU integration agenda and strengthen civil society connections across the region.",
      status: "active",
      countries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      donors: [ref("partner-japan")],
      featured: false,
      order: 5,
    },
  ];

  for (const p of programs) await create(p);
}

// ─── Grants / Open Calls ──────────────────────────────────────────────────────

async function seedGrants() {
  console.log("\n── Grants ──");
  const grants = [
    {
      _id: "grant-ggi-call8",
      _type: "grant",
      title: "GGI Call 8 — Civil Society & Democratic Governance",
      slug: { _type: "slug", current: "ggi-call-8" },
      type: "civil-society",
      status: "evaluation",
      program: ref("program-ggi"),
      shortDescription:
        "The 8th call under the GGI programme, funding civil society projects that advance democratic governance, reconciliation, and European integration across the WB6 region.",
      description:
        "GGI Call 8 invites applications from civil society organisations, universities, municipalities, and research institutes in the Western Balkans for projects that strengthen democratic governance, civic participation, reconciliation, and EU integration. Projects must involve partners from at least two WB6 countries.",
      objectives: [
        "Strengthen civil society capacity for democratic oversight and advocacy",
        "Advance reconciliation and inter-community dialogue across the region",
        "Support the EU integration agenda of Western Balkans partner countries",
        "Promote youth participation in civic and political life",
        "Foster regional cooperation between CSOs, universities, and local governments",
      ],
      totalBudget: 2000000,
      minGrantAmount: 20000,
      maxGrantAmount: 150000,
      currency: "EUR",
      coFinancingRequired: true,
      coFinancingRate: 10,
      eligibleCountries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      eligibleApplicants: ["ngo", "university", "municipality", "research-institute", "cultural-institution"],
      deadline: "2025-03-31T17:00:00Z",
      resultsDate: "2025-06-30",
      projectStartDate: "2025-09-01",
      projectEndDate: "2026-08-31",
      applicationUrl: "https://wbfportal.org",
      faqs: [
        {
          _key: "faq1",
          question: "Who can apply to GGI Call 8?",
          answer:
            "Civil society organisations, universities, municipalities, research institutes, and cultural institutions legally registered in one of the WB6 countries (Albania, Bosnia and Herzegovina, Kosovo*, North Macedonia, Montenegro, Serbia). Applicants must have at least one partner from a different WB6 country.",
        },
        {
          _key: "faq2",
          question: "What is the minimum and maximum grant size?",
          answer:
            "Grants range from €20,000 to €150,000 per project. A minimum 10% co-financing contribution from the applicant or partners is required.",
        },
        {
          _key: "faq3",
          question: "Can individual citizens apply?",
          answer:
            "No. Only legally registered organisations can apply. Individual applications are not accepted under this call.",
        },
        {
          _key: "faq4",
          question: "What is the project duration?",
          answer:
            "Projects funded under GGI Call 8 must be implemented within 12 months, from September 2025 to August 2026.",
        },
        {
          _key: "faq5",
          question: "In which language must the application be submitted?",
          answer:
            "Applications must be submitted in English. Supporting documents may be in local languages with certified translations.",
        },
      ],
      contacts: [ref("person-grants-officer")],
      tags: ["civil-society", "governance", "eu-integration", "reconciliation"],
      featured: true,
    },
    {
      _id: "grant-matching-open",
      _type: "grant",
      title: "Matching Grants — Rolling Call",
      slug: { _type: "slug", current: "matching-grants-rolling" },
      type: "project",
      status: "open",
      program: ref("program-matching"),
      shortDescription:
        "Year-round matching grants for WBF alumni organisations seeking international co-funding partnerships. No deadline — applications reviewed quarterly.",
      description:
        "The Matching Grants rolling call is open year-round to organisations that have previously received WBF funding. It supports new partnerships with international organisations by co-financing joint regional projects.",
      totalBudget: 500000,
      minGrantAmount: 10000,
      maxGrantAmount: 50000,
      currency: "EUR",
      coFinancingRequired: true,
      coFinancingRate: 50,
      eligibleCountries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      eligibleApplicants: ["ngo", "university", "municipality"],
      applicationUrl: "https://wbfportal.org",
      tags: ["matching", "partnerships", "rolling-call"],
      featured: true,
    },
    {
      _id: "grant-visegrad-2025",
      _type: "grant",
      title: "Visegrad Fellowship 2025–2026",
      slug: { _type: "slug", current: "visegrad-fellowship-2025" },
      type: "mobility",
      status: "open",
      program: ref("program-visegrad"),
      shortDescription:
        "3–6 month fellowships for young professionals from the WB6 to work and study in V4 countries. Up to €8,000 per fellow.",
      description:
        "The 2025–2026 Visegrad Fellowship programme offers 3–6 month placements for young professionals, researchers, and civil society practitioners from Albania, Bosnia and Herzegovina, Kosovo*, North Macedonia, Montenegro, and Serbia at host organisations in the Czech Republic, Hungary, Poland, and Slovakia.",
      totalBudget: 300000,
      minGrantAmount: 4000,
      maxGrantAmount: 8000,
      currency: "EUR",
      coFinancingRequired: false,
      eligibleCountries: ["AL", "BA", "XK", "MK", "ME", "RS"],
      eligibleApplicants: ["individual", "ngo"],
      deadline: "2025-05-15T23:59:00Z",
      resultsDate: "2025-07-01",
      projectStartDate: "2025-09-01",
      applicationUrl: "https://wbfportal.org",
      tags: ["fellowship", "mobility", "youth", "visegrad"],
      featured: false,
    },
  ];

  for (const g of grants) await create(g);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(`
ERROR: SANITY_API_WRITE_TOKEN is not set.

To fix:
  1. Go to https://www.sanity.io/manage → your project → API → Tokens
  2. Create a new token with "Editor" permissions
  3. Add to .env.local:
     SANITY_API_WRITE_TOKEN=your_token_here
  4. Re-run: npx tsx scripts/seed-sanity.ts
`);
    process.exit(1);
  }

  console.log(
    `Seeding Sanity project "${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}" (${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"})...`
  );

  await seedPartners();
  await seedPeople();
  await seedPrograms();
  await seedGrants();

  console.log("\n✅ Seed complete.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
