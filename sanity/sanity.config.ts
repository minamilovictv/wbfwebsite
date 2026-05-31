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
            S.listItem().title("Programs").schemaType("program").child(S.documentTypeList("program")),
            S.listItem().title("Grants").schemaType("grant").child(S.documentTypeList("grant")),
            S.listItem().title("Projects").schemaType("project").child(S.documentTypeList("project")),
            S.divider(),
            S.listItem().title("News Articles").schemaType("news").child(S.documentTypeList("news")),
            S.listItem().title("Events").schemaType("event").child(S.documentTypeList("event")),
            S.divider(),
            S.listItem().title("Partners & Donors").schemaType("partner").child(S.documentTypeList("partner")),
            S.listItem().title("People").schemaType("person").child(S.documentTypeList("person")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
