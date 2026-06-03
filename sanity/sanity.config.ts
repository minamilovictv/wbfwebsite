import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "wbf-studio",
  title: "WBF Content Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
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
            S.listItem().title("Member States").schemaType("memberState").child(S.documentTypeList("memberState")),
            S.listItem().title("Milestones").schemaType("milestone").child(S.documentTypeList("milestone")),
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
