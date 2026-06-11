import { defineField, defineType } from "sanity";

export const grantProgrammeSchema = defineType({
  name: "grantProgramme",
  title: "Grant Programmes (About page)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "One or two short sentences shown on the card.",
    }),
    defineField({
      name: "url",
      title: "Link URL",
      type: "string",
      description: "Internal path (/programs/...) or full external URL.",
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "url" } },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
