import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "wbf-studio",
  title: "WBF Content Studio",
  // The Studio bundle is built by Vite, which only inlines env vars with
  // the SANITY_STUDIO_ prefix. NEXT_PUBLIC_* is read by the Next.js app
  // locally; fall back to it so a single .env.local works for both, and
  // hardcode the WBF project ID as a last resort so the deployed Studio
  // can never end up without a projectId.
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ??
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    "x1vbhp4a",
  dataset:
    process.env.SANITY_STUDIO_DATASET ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ── Site-wide ──────────────────────────────────────────────────
            S.listItem()
              .title("Site Settings")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),

            // ── Funding programmes ─────────────────────────────────────────
            S.listItem().title("Programs").schemaType("program").child(S.documentTypeList("program")),
            S.listItem().title("Grants").schemaType("grant").child(S.documentTypeList("grant")),
            S.listItem().title("Projects").schemaType("project").child(S.documentTypeList("project")),
            S.divider(),

            // ── Editorial ──────────────────────────────────────────────────
            S.listItem().title("News Articles").schemaType("news").child(S.documentTypeList("news")),
            S.listItem().title("Events").schemaType("event").child(S.documentTypeList("event")),
            S.listItem().title("Grantee Stories").schemaType("story").child(S.documentTypeList("story")),
            S.divider(),

            // ── About WBF supporting content ───────────────────────────────
            S.listItem()
              .title("About Page")
              .child(
                S.editor()
                  .id("aboutPage")
                  .schemaType("aboutPage")
                  .documentId("aboutPage"),
              ),
            S.listItem().title("Member States").schemaType("memberState").child(S.documentTypeList("memberState")),
            S.listItem().title("Milestones").schemaType("milestone").child(S.documentTypeList("milestone")),
            S.listItem().title("Grant Programmes (About)").schemaType("grantProgramme").child(S.documentTypeList("grantProgramme")),
            S.listItem().title("Beneficiary Categories").schemaType("beneficiaryCategory").child(S.documentTypeList("beneficiaryCategory")),
            S.listItem().title("Objectives").schemaType("objective").child(S.documentTypeList("objective")),
            S.listItem().title("Strategic Pillars").schemaType("strategicPillar").child(S.documentTypeList("strategicPillar")),
            S.listItem().title("Reports & Publications").schemaType("report").child(S.documentTypeList("report")),
            S.listItem().title("Job Openings").schemaType("jobOpening").child(S.documentTypeList("jobOpening")),
            S.listItem().title("Champion Awards").schemaType("award").child(S.documentTypeList("award")),
            S.divider(),

            // ── Generic CMS pages ──────────────────────────────────────────
            S.listItem().title("Pages").schemaType("page").child(S.documentTypeList("page")),
            S.divider(),

            // ── People & partners ──────────────────────────────────────────
            S.listItem().title("Partners & Donors").schemaType("partner").child(S.documentTypeList("partner")),
            S.listItem().title("People").schemaType("person").child(S.documentTypeList("person")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
