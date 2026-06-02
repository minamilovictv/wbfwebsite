import { defineField, defineType } from "sanity";

export const reportSchema = defineType({
  name: "report",
  title: "Reports & Publications",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { value: "annual-report", title: "Annual Report" },
          { value: "financial-statement", title: "Financial Statement" },
          { value: "audit", title: "External Audit" },
          { value: "joint-action", title: "EU/WBF Joint Action Report" },
          { value: "statute", title: "Statutes" },
          { value: "other", title: "Other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "externalUrl", type: "url", description: "Alternative to file upload" }),
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "sr", "mk", "sq", "bs"] },
      initialValue: "en",
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
  orderings: [
    { title: "Published (newest first)", name: "pubDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Year (newest first)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
});
