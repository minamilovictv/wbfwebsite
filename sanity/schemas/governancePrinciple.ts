import { defineField, defineType } from "sanity";

export const governancePrincipleSchema = defineType({
  name: "governancePrinciple",
  title: "Governance Principles",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "icon",
      title: "Icon (optional)",
      type: "string",
      options: {
        list: [
          { value: "equal", title: "Equal Representation" },
          { value: "transparency", title: "Transparency" },
          { value: "independence", title: "Independence" },
          { value: "accountability", title: "Accountability" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
