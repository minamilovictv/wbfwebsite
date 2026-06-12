import { defineField, defineType } from "sanity";

/**
 * Knowledge Hub — downloadable files (templates, forms, branded assets…).
 */
export const downloadSchema = defineType({
  name: "download",
  title: "KH — Downloads",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { value: "application", title: "Application Forms" },
          { value: "reporting", title: "Reporting Templates" },
          { value: "visibility", title: "Visibility & Branding" },
          { value: "guidelines", title: "Guidelines" },
          { value: "other", title: "Other" },
        ],
      },
      initialValue: "other",
    }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "externalUrl", type: "url", description: "Alternative to file upload" }),
    defineField({
      name: "fileType",
      type: "string",
      description: "Display label, e.g. PDF, DOCX, XLSX, ZIP",
    }),
    defineField({ name: "fileSize", type: "string", description: "Display label, e.g. 1.2 MB" }),
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "sr", "mk", "sq", "bs"] },
      initialValue: "en",
    }),
    defineField({ name: "order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "title", subtitle: "fileType" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
