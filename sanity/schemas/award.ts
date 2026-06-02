import { defineField, defineType } from "sanity";

export const awardSchema = defineType({
  name: "award",
  title: "WBF Champion Awards",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "edition", type: "string", description: "e.g. 2024 / 2nd Edition" }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "winner", type: "string", description: "Organisation or project name" }),
    defineField({
      name: "country",
      type: "string",
      options: {
        list: [
          { value: "AL", title: "Albania" },
          { value: "BA", title: "Bosnia and Herzegovina" },
          { value: "XK", title: "Kosovo*" },
          { value: "MK", title: "North Macedonia" },
          { value: "ME", title: "Montenegro" },
          { value: "RS", title: "Serbia" },
        ],
      },
    }),
    defineField({ name: "citation", type: "text", rows: 4 }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "relatedProgram", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "winner" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Year (newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
});
