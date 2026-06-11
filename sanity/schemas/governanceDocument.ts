import { defineField, defineType } from "sanity";

export const governanceDocumentSchema = defineType({
  name: "governanceDocument",
  title: "Governing Documents",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "file",
      title: "File Upload",
      type: "file",
      description: "Upload the document — the tile becomes downloadable automatically.",
    }),
    defineField({
      name: "externalUrl",
      title: "External Link (optional)",
      type: "url",
      description: "Used when the document is hosted elsewhere instead of uploaded.",
    }),
    defineField({ name: "publicationDate", title: "Publication Date", type: "date" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { value: "statute", title: "Statute" },
          { value: "rules", title: "Rules & Procedures" },
          { value: "financial", title: "Financial Regulations" },
          { value: "report", title: "Annual Report" },
          { value: "audit", title: "Audit Report" },
          { value: "other", title: "Other" },
        ],
      },
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
